import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataException } from '../../services/exceptions/data.exception';
import { MailerService } from '../../mailer/mailer.service';
import { sendMailInterface } from '../../services/interfaces/sendMail.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.create(createUserDto);
      const content = `
      Email enviado automaticamente \n
      Para confirmar seu email por favor clique no link abaixo. \n
      ${process.env['URL_FRONT']}user/confirmEmail/${data.hash}
      `;
      const bodyMailer: sendMailInterface = {
        to: data.email,
        subject: 'Confirmação de email - SeuCandidato.com',
        content,
      };
      this.mailerService.sendMail(bodyMailer);
      return {
        message: 'Usuário criado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get('findOneByEmail/:email')
  findOneByEmail(@Param('email') email: string) {
    try {
      return this.userService.findOneByEmail(email);
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get('findOneByUsername/:username')
  findOneByUsername(@Param('username') username: string) {
    try {
      return this.userService.findOneByUsername(username);
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get('confirmEmail/:hash')
  confirmEmail(@Param('hash') hash: string) {
    try {
      return this.userService.confirmEmail(hash);
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const data = await this.userService.update(email, updateUserDto);
      return {
        message: 'Usuário atualizado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    try {
      const data = await this.userService.remove(email);
      return {
        message: 'Usuário deletado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }
}
