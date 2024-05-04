import { ApiProperty } from '@nestjs/swagger';
import { SortProps } from 'libs/common/enums';
import { paginationSchema } from 'libs/common/schemas';
import { createZodDto } from 'nestjs-zod';

const validFields = [
  'id',
  'updatedAt',
  'createdAt',
  'description',
  'resource',
  'type',
];

export class PaginationCredentialsDto extends createZodDto(
  paginationSchema(validFields),
) {
  @ApiProperty({ type: Number, default: 1 })
  page?: number;

  @ApiProperty({ type: Number, default: 10 })
  itemsPerPage?: number;

  @ApiProperty({ type: Array<string>, required: false })
  fields?: Array<string>;

  @ApiProperty({
    type: String,
    example: [['fieldName', `${SortProps.ASCENDING}`]],
    required: false,
  })
  sort?: [[string, SortProps]];
}
