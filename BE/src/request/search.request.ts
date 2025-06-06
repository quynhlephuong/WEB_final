import { ApiProperty } from '@nestjs/swagger';
import { ControlType } from 'src/enumdef/control.type.enum';
import { Operator } from 'src/enumdef/operator.enum';

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
    example: '',
  })
  paramFrom: string;

  @ApiProperty({
    description: 'To value for between operator',
    example: '',
    required: false,
  })
  paramTo?: string;

  @ApiProperty({
    description: 'Values in multi-select control',
    required: false,
  })
  multipleSelect: any;
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
}
