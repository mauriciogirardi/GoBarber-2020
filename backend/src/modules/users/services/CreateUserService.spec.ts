import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    )
  });

  it('should  be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a new user with same email ', async () => {
    await createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await expect(createUser.execute({
      name: 'Jonh Doe2',
      email: 'johndoe@test.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
