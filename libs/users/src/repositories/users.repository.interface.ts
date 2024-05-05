import { BaseSequelizeRepository } from 'libs/common/repositories';
import {
  IUser,
  IUsersRepository,
  IdentifyUserCredentials,
} from '../interfaces';
import { TCreateUserCredentials } from '../types';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../models';
import { Repository } from 'sequelize-typescript';
import { Op } from 'sequelize';

export class UsersSequelizeRepository
  extends BaseSequelizeRepository<IUser, TCreateUserCredentials>
  implements IUsersRepository
{
  constructor(
    @InjectModel(UsersModel)
    protected readonly repository: Repository<UsersModel>,
  ) {
    super(repository);
  }

  public isUserRegisteredWithContactInfo(
    input: IdentifyUserCredentials,
  ): Promise<IUser> {
    const { email, phoneNumber, status } = input;
    let where = {};

    if (email && phoneNumber) {
      where = {
        status,
        [Op.or]: [{ email }, { phoneNumber }],
      };
    } else {
      where = input;
    }

    return this.repository.findOne({ where });
  }
}
