import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class PageInfo {
  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 1 })
  totalPages: number;

  @ApiProperty({ example: 10 })
  itemsPerPage: number;
}

export class PaginationResponseBaseEntity {
  @Expose()
  @Type(() => PageInfo)
  @ApiProperty({
    description: 'Pagination information',
    type: PageInfo,
  })
  pageInfo: PageInfo;
}
