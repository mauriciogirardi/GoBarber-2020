import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProviderDTO from '../dtos/IFindAllProviderDTO';

export default interface IUsersRepository {
  findAllProvider(data: IFindAllProviderDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
