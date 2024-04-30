import { ApiProperty } from '@nestjs/swagger';
import { IBaseItem } from 'libs/common';

export class BaseEntity implements IBaseItem {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
