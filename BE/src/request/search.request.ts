/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { ControlType } from 'src/enumdef/control.type.enum';
import { Operator } from 'src/enumdef/operator.enum';
import { SortDirection } from 'src/enumdef/sort.direction.enum';

export interface FieldDTO {
  fieldName: string;
  controlType: ControlType;
  operator: Operator;
  paramFrom: string;
  paramTo?: string;
}

export interface FilterDTO {
  fields: FieldDTO[];
}

export interface SortDTO {
  fieldName: string;
  direction: SortDirection;
}

export class SearchField {
  @ApiProperty({ description: 'Field name to search on', example: 'id' })
  fieldName: string;

  @ApiProperty({
    description: 'Operator for search',
    example: Operator.CONTAINS,
    enum: Operator,
  })
  operator: Operator;

  @ApiProperty({
    description: 'Control type',
    example: ControlType.TEXT,
    enum: ControlType,
  })
  controlType: ControlType;

  @ApiProperty({
    description: 'Parameter value or from value for between operator',
    example: 'john',
  })
  paramFrom: string;

  @ApiProperty({
    description: 'To value for between operator',
    required: false,
  })
  paramTo?: string;

  @ApiProperty({
    description: 'Values in multi-select control',
    required: false,
  })
  multipleSelect: any;
}

export class SortField {
  @ApiProperty({ description: 'Field name to sort by', example: 'id' })
  fieldName: string;

  @ApiProperty({
    description: 'Sort direction',
    example: SortDirection.DESC,
    enum: SortDirection,
  })
  direction: SortDirection;
}

export class SearchRequestDTO {
  @ApiProperty({ description: 'Page number', example: 1, default: 1 })
  page?: number;

  @ApiProperty({ description: 'Page size', example: 10, default: 10 })
  pageSize?: number;

  @ApiProperty({
    description: 'Search criteria',
    type: [SearchField],
    required: false,
  })
  search?: SearchField[];

  @ApiProperty({
    description: 'Sort criteria',
    type: [SortField],
    required: false,
  })
  sort?: SortField[];
}
