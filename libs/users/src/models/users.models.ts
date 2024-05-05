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
import { IUser } from '../interfaces';
import { TCreateUserCredentials } from '../types';
import { UserStatuses } from '../enums';

@Table({ tableName: Models.USERS, timestamps: true })
export class UsersModel
  extends Model<IUser, TCreateUserCredentials>
  implements IUser
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
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  email?: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatuses)),
    allowNull: false,
  })
  status: UserStatuses;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  information: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
