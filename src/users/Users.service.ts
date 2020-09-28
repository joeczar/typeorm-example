import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Users.entity';
import { UserDTO } from './Users.dto';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
  async showAll() {
    return await this.usersRepository.find();
  }
  async create(data: UserDTO) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(data);
    return user;
  }
  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    } else {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
    
  }
  async findByEmail(email: string): Promise<UserDTO> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  async findByName(username: string): Promise<UserDTO | undefined> {
    return this.usersRepository.findOne({ where: { name: username } });
  }
  async read(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<UserDTO>) {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }
}