import { Models } from 'libs/common/enums';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IPermission } from '../interfaces';
import { PermissionTypes, Resources } from '../enums';
import { TCreatePermissionCredentials } from '../types';

@Table({ tableName: Models.PERMISSIONS, timestamps: true })
export class PermissionModel
  extends Model<IPermission, TCreatePermissionCredentials>
  implements IPermission
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
    type: DataType.ENUM(...Object.values(Resources)),
    allowNull: false,
  })
  resource: Resources;

  @Column({
    type: DataType.ENUM(...Object.values(PermissionTypes)),
    allowNull: false,
  })
  type: PermissionTypes;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
