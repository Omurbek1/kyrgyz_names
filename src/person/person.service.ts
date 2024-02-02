// src/person/person.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './person.entity';
import { UpdatePersonDto } from './update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  private currentId = 0;

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }

  async create(personDto: Omit<Person, 'id'>): Promise<Person> {
    const newPerson = this.personRepository.create(personDto);
    return await this.personRepository.save(newPerson);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    Object.assign(person, updatePersonDto);
    return await this.personRepository.save(person);
  }

  async delete(id: number): Promise<void> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    await this.personRepository.remove(person);
  }

  async getFavorites(): Promise<Person[]> {
    return this.personRepository.find({ where: { favorite: true } });
  }
  async toggleFavorite(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    person.favorite = !person.favorite;
    return await this.personRepository.save(person);
  }

  async findByTags(searchTags: string[]): Promise<Person[]> {
    return this.personRepository
      .createQueryBuilder('person')
      .where('person.tags @> ARRAY[:...tags]', { tags: searchTags })
      .getMany();
  }
}
