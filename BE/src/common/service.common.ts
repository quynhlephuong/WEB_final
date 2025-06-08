/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../config/prisma.service';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { SearchRequestDTO } from 'src/request/search.request';
import { ControlType } from 'src/enumdef/control.type.enum';
import { Operator } from 'src/enumdef/operator.enum';
import {
  parseCellReference,
  getColumnLetter,
} from 'src/utils/excel.export.util';
import { Prisma } from '@prisma/client';

export abstract class CommonService<
  T,
  DTO,
  M extends {
    findMany?: (args: any) => Promise<T[]>;
    count?: (args: any) => Promise<number>;
  },
> {
  constructor(protected readonly prisma: PrismaService) {}

  protected getModel(): M {
    throw new Error('getModel() must be overridden in child service');
  }

  protected processResult(data: T[]): any {
    return data;
  }

  protected getEnumMappingExcelExport(): any {
    return null;
  }

  protected getDtoMappingExcelExport(): any {
    return null;
  }

  protected getFileNameExcelExportInput(): string {
    return '';
  }

  protected getCellStart(): string {
    return 'A1';
  }

  protected getInclude(): Prisma.SelectSubset<any, any> | null {
    return null;
  }

  async exportExcel<T>(data: T[]): Promise<Buffer> {
    try {
      const workbook = new ExcelJS.Workbook();

      const enumMapping = this.getEnumMappingExcelExport();
      const dtoMapping = this.getDtoMappingExcelExport();

      if (!enumMapping || !dtoMapping) {
        throw new Error('Enum mapping or DTO mapping is not defined');
      }

      const inputFile = this.getFileNameExcelExportInput();

      if (!inputFile) {
        throw new Error('Input template file is not defined');
      }

      if (!fs.existsSync(inputFile)) {
        throw new Error(`Template file not found at: ${inputFile}`);
      }

      const templateWorkbook = await workbook.xlsx.readFile(inputFile);
      const templateWorksheet = templateWorkbook.getWorksheet(1);
      if (!templateWorksheet) {
        throw new Error('Template worksheet not found');
      }

      const startCell = this.getCellStart();
      const startRow = parseCellReference(startCell)[1];

      console.log(`Processing ${data.length} rows of data...`);

      const chunkSize = 1000;
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);

        chunk.forEach((item, index) => {
          const rowIndex = i + index;
          Object.entries(enumMapping).forEach(([key, columnIndex]) => {
            const value = item[key as keyof T];
            const cell = templateWorksheet.getCell(
              getColumnLetter(Number(columnIndex)) + (startRow + rowIndex),
            );
            cell.value = value as ExcelJS.CellValue;
          });
        });
      }

      const buffer = await workbook.xlsx.writeBuffer();
      console.log('Excel export completed successfully');
      return Buffer.from(buffer);
    } catch (error) {
      console.error('Error in exportExcel:', error);
      throw error;
    }
  }

  async findAll(
    body: SearchRequestDTO,
  ): Promise<{ total: number; data: any[] }> {
    let { page, pageSize } = body;
    const { search } = body;
    page = page || 1;
    pageSize = pageSize || 10;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: Record<string, any> = {};
    const staticInclude = (this.getInclude() as any) ?? {};
    const dynamicInclude: any = {};

    const oneToManyRelations = ['details', 'scheduleDetails', 'billingDetails'];
    const buildNestedWhereCondition = (path: string[], condition: any): any => {
      if (path.length === 0) return condition;
      const [head, ...tail] = path;
      const nested = buildNestedWhereCondition(tail, condition);
      if (oneToManyRelations.includes(head)) {
        return { [head]: { some: nested } };
      }
      return { [head]: nested };
    };

    if (Array.isArray(search)) {
      search.forEach((field) => {
        const {
          fieldName,
          operator,
          controlType,
          paramFrom,
          paramTo,
          multipleSelect,
        } = field;
        const value =
          operator === Operator.BETWEEN ? [paramFrom, paramTo] : paramFrom;

        const buildCondition = () => {
          if (multipleSelect && Array.isArray(multipleSelect)) {
            return {
              in: multipleSelect,
            };
          }
          switch (controlType) {
            case ControlType.DATE: {
              const fromDate = paramFrom
                ? new Date(Number(paramFrom))
                : new Date(0);
              const toDate = paramTo
                ? new Date(Number(paramTo))
                : new Date(9999999999999);
              switch (operator) {
                case Operator.GREATER_THAN:
                  return { gte: fromDate };
                case Operator.LESS_THAN:
                  return { lte: fromDate };
                case Operator.EQUAL:
                  return { equals: fromDate };
                case Operator.BETWEEN:
                  return { gte: fromDate, lte: toDate };
                default:
                  return {};
              }
            }

            case ControlType.NUMBER: {
              const from = Number(paramFrom) ?? 0;
              const to = Number(paramTo) ?? 9999999999999;
              switch (operator) {
                case Operator.GREATER_THAN:
                  return { gte: from };
                case Operator.LESS_THAN:
                  return { lte: from };
                case Operator.EQUAL:
                  return { equals: from };
                case Operator.BETWEEN:
                  return { gte: from, lte: to };
                default:
                  return {};
              }
            }

            case ControlType.BOOLEAN:
              return paramFrom === 'true';

            default:
              return { contains: value as string };
          }
        };

        const condition = buildCondition();

        if (fieldName.includes('.')) {
          const path = fieldName.split('.');
          const nestedWhere = buildNestedWhereCondition(path, condition);
          Object.assign(where, nestedWhere);

          const setInclude = (inc: any, parts: string[]) => {
            const [head, ...tail] = parts;
            if (!inc[head]) {
              inc[head] = tail.length ? { include: {} } : true;
            }
            if (tail.length) {
              setInclude(inc[head].include, tail);
            }
          };
          setInclude(dynamicInclude, path.slice(0, -1));
        } else {
          where[fieldName] = condition;
        }
      });
    }

    const mergeInclude = (base: any, extra: any): any => {
      const out: any = { ...base };
      for (const key of Object.keys(extra)) {
        if (base[key] && base[key].include && extra[key].include) {
          out[key] = {
            ...base[key],
            include: mergeInclude(base[key].include, extra[key].include),
          };
        } else {
          out[key] = extra[key];
        }
      }
      return out;
    };

    const include = mergeInclude(staticInclude, dynamicInclude);

    const model = this.getModel();

    try {
      const [result, total] = await Promise.all([
        model?.findMany?.({
          where,
          skip,
          take,
          include,
        }),
        model?.count?.({ where }),
      ]);

      return { total: total ?? 0, data: this.processResult(result ?? []) };
    } catch (error) {
      throw new Error(error);
    }
  }

  abstract upsert(dto: DTO): Promise<any>;
  abstract findOne(id: string): Promise<any>;
  abstract remove(id: string): Promise<{ message: string }>;
}
