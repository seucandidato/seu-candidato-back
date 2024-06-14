import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { DataException } from '../../services/exceptions/data.exception';
import { CreateContactResponseDto } from './dto/create-contact-response.dto';
import { ContactEntity } from './entities/contact.entity';
import { AuthGuard } from '../../authorization/auth/auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createContactDto: CreateContactDto, @Request() user) {
    try {
      const data = await this.contactService.create(createContactDto, user);
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

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() user) {
    try {
      const data = await this.contactService.findAll(user);
      return {
        message: 'Contatos buscados com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get('findResponse/:id')
  async findResponse(@Param('id') id: number) {
    try {
      const data = await this.contactService.findResponseContact(id);
      return {
        message: 'Respostas de contato buscados com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }
}
