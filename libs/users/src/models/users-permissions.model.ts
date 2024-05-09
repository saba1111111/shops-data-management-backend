import { Models } from 'libs/common/enums';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IUserPermissions } from '../interfaces';
import { TCreateUserPermissionCredentials } from '../types';
import { UserPermissionsStatuses } from '../enums';
import { UsersModel } from './users.models';
import { PermissionModel } from 'libs/permissions/models';

@Table({ tableName: Models.USERS_PERMISSIONS, timestamps: true })
export class UsersPermissionsModel
  extends Model<IUserPermissions, TCreateUserPermissionCredentials>
  implements TCreateUserPermissionCredentials
{
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id')?.toString();
    },
  })
  id: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserPermissionsStatuses)),
    allowNull: false,
    defaultValue: UserPermissionsStatuses.ACTIVE,
  })
  status: UserPermissionsStatuses;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  allow: boolean;

  @ForeignKey(() => UsersModel)
  @Column({
    get() {
      return this.getDataValue('userId')?.toString();
    },
  })
  userId: string;

  @BelongsTo(() => UsersModel)
  user: UsersModel;

  @ForeignKey(() => PermissionModel)
  @Column({
    get() {
      return this.getDataValue('permissionId')?.toString();
    },
  })
  permissionId: string;

  @BelongsTo(() => PermissionModel)
  permission: PermissionModel;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
