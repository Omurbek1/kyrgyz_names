// src/person/person.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.entity';
import { CreatePersonDto } from './create-person.dto';
import { UpdatePersonDto } from './update-person.dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @Get()
  findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get('favorites')
  getFavorites(): Promise<Person[]> {
    console.log('Fetching favorites');
    return this.personService.getFavorites();
  }
  @Get('tags')
  findByTags(@Query('tags') tags: string): Promise<Person[]> | Person[] {
    const searchTags = tags.split(','); // Convert comma-separated string to array
    return this.personService.findByTags(searchTags);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): { message: string } {
    this.personService.delete(id);
    return { message: 'Person successfully deleted' };
  }

  @Patch(':id/favorite')
  toggleFavorite(@Param('id') id: number): Promise<Person> | Person {
    return this.personService.toggleFavorite(id);
  }
}
