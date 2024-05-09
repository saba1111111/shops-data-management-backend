import { ApiProperty } from '@nestjs/swagger';
import { UserPermissionsStatuses } from '../enums';
import { BaseEntity } from 'libs/permissions/entities';

export class UserPermissionEntity extends BaseEntity {
  @ApiProperty({
    type: Boolean,
    description:
      'Specifies whether the permission allows the user to perform a certain action. If true, the user is allowed; if false, the user is denied.',
  })
  allow: boolean;

  @ApiProperty({
    type: String,
    description: 'The ID of the user to whom the permission is assigned.',
  })
  userId: string;

  @ApiProperty({
    type: String,
    description: 'The ID of the permission being assigned to the user.',
  })
  permissionId: string;

  @ApiProperty({
    enum: UserPermissionsStatuses,
  })
  status: UserPermissionsStatuses;
}
