import { ApiProperty } from '@nestjs/swagger';
import { IPermission } from '../interfaces';
import { BaseEntity } from './base.entity';
import { PermissionTypes, Resources } from '../enums';

export class PermissionEntity extends BaseEntity implements IPermission {
  @ApiProperty()
  description?: string;

  @ApiProperty({ enum: Resources })
  resource: Resources;

  @ApiProperty({ enum: PermissionTypes })
  type: PermissionTypes;
}
