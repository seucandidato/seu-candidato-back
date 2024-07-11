import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DataException } from '../../services/exceptions/data.exception';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.createdAt = new Date(Date.now());
    createUserDto.updatedAt = new Date(Date.now());
    createUserDto.password = CryptoJS.MD5(createUserDto.password).toString();
    createUserDto.hash = CryptoJS.MD5(createUserDto.email).toString();
    createUserDto.active = true;
    const data = await this.userRepository.save({ ...createUserDto });
    return data;
  }

  async findAll() {
    const data = await this.userRepository.find({ where: { active: true } });
    if (data.length === 0) {
      throw new DataException('Sem usuários cadastrados !');
    }
    return data;
  }

  async findOneByUsername(data: string) {
    const response = await this.userRepository.query(
      `SELECT * FROM users WHERE username = '${data}' OR email = '${data}' OR "active" = true LIMIT 1`,
    );

    if (!response) {
      throw new DataException('Sem usuário cadastrado !');
    }
    return response[0];
  }

  async findOneByEmail(email: string) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.active = ' + true)
      .getOne();

    if (!data) {
      throw new DataException('Sem usuário cadastrado !');
    }
    return data;
  }

  async confirmEmail(hash: string) {
    const data: UpdateUserDto = await this.userRepository.findOne({
      where: { hash },
    });
    if (!data.checked) {
      data.checked = true;
      this.userRepository.save({ ...data });
    }
    return 'Email confirmado !';
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedAt = new Date(Date.now());
    const data = await this.userRepository.update({ email }, updateUserDto);
    return data;
  }

  async remove(email: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new DataException('Email não cadastrado !');
    }

    user.active = false;

    return this.userRepository.save({ ...user });
  }
}
