import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([])],
})
export class CmsModule {}
