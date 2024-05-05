import { BaseSequelizeRepository } from 'libs/common/repositories';
import { IUser, IUsersRepository } from '../interfaces';
import { TCreateUserCredentials } from '../types';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../models';
import { Repository } from 'sequelize-typescript';

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

  public findUser(input: Partial<IUser>): Promise<IUser> {
    return this.repository.findOne({
      where: input,
    });
  }
}
