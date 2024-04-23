import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DataException } from '../../services/exceptions/data.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.createdAt = new Date(Date.now());
    createUserDto.updatedAt = new Date(Date.now());
    const data = await this.userRepository.save({ ...createUserDto });
    return data;
  }

  async findAll() {
    const data = await this.userRepository.find();
    if (data.length === 0) {
      throw new DataException('Sem usuários cadastrados !');
    }
    return data;
  }

  async findOneByUsername(username: string) {
    const data = await this.userRepository.findOne({ where: { username } });
    if (!data) {
      throw new DataException('Sem usuário cadastrado !');
    }
    return data;
  }

  async findOneByEmail(email: string) {
    const data = await this.userRepository.findOne({ where: { email } });
    if (!data) {
      throw new DataException('Sem usuário cadastrado !');
    }
    return data;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedAt = new Date(Date.now());
    const data = await this.userRepository.update({ email }, updateUserDto);
    return data;
  }

  async remove(email: string) {
    const findOne = await this.findOneByEmail(email);
    if (!findOne) {
      throw new DataException('Email não cadastrado !');
    }
    return this.userRepository.delete({ email });
  }
}
