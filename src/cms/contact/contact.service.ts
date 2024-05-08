import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ResponseContactEntity } from './entities/response-contact.entity';
import { CreateContactResponseDto } from './dto/create-contact-response.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
    @InjectRepository(ResponseContactEntity)
    private responseContactRepository: Repository<ResponseContactEntity>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    createContactDto.createdAt = new Date(Date.now());
    createContactDto.updatedAt = new Date(Date.now());
    const data = await this.contactRepository.save({ ...createContactDto });
    return data;
  }

  async responseById(
    id: ContactEntity,
    createContactResponseDto: CreateContactResponseDto,
  ) {
    createContactResponseDto.createdAt = new Date(Date.now());
    createContactResponseDto.updatedAt = new Date(Date.now());
    createContactResponseDto.contact = id;
    const data = await this.responseContactRepository.save({
      ...createContactResponseDto,
    });
    return data;
  }

  async findAll() {
    return await this.contactRepository.find();
  }
  async findResponseContact(id: number) {
    return await this.responseContactRepository.query(
      `SELECT * FROM response_contact where contactId=${id}`,
    );
  }
}
