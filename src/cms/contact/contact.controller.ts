import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { DataException } from '../../services/exceptions/data.exception';
import { CreateContactResponseDto } from './dto/create-contact-response.dto';
import { ContactEntity } from './entities/contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const data = await this.contactService.create(createContactDto);
      return {
        message: 'Contato criado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Post('response/:id')
  async response(
    @Param('id') id: ContactEntity,
    @Body() createContactResponseDto: CreateContactResponseDto,
  ) {
    try {
      const data = await this.contactService.responseById(
        id,
        createContactResponseDto,
      );
      return {
        message: 'Resposta enviada com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  // @Get()
  // findAll() {
  //   return this.contactService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contactService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
  //   return this.contactService.update(+id, updateContactDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contactService.remove(+id);
  // }
}
