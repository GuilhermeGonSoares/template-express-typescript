import { Repository } from 'typeorm';
import { dataSource } from '../db/data-source';
import { UserEntity } from '../entities/User';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdatedUserDto } from '../dtos/updated-user-dto';
import HttpException from '../utils/exceptions/http-exeption';

export default class UserService {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = dataSource.getRepository(UserEntity);
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new HttpException(404, `Not found user with this ${id} id`);
    }
    return user;
  }

  async findAll() {
    return await this.repository.find();
  }

  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    return await this.repository.save(user);
  }

  async updated(id: number, dto: UpdatedUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);

    return await this.repository.save({ ...user, ...dto });
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    return await this.repository.remove(user);
  }
}
