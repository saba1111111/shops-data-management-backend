import { PaginationResponseBaseEntity } from 'libs/common/entities';
import { PermissionEntity } from './permissions.entity';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationPermissionsResponseEntity extends PaginationResponseBaseEntity {
  @Expose()
  @Type(() => PermissionEntity)
  @ApiProperty({
    type: () => [PermissionEntity],
  })
  items: [PermissionEntity];
}
