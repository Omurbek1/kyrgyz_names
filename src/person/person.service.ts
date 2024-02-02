// src/person/person.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './person.entity';
import { UpdatePersonDto } from './update-person.dto';

@Injectable()
export class PersonService {
  private readonly persons: Person[] = [];
  private currentId = 0;

  findAll(): Person[] {
    return this.persons;
  }

  findOne(id: number): Person {
    const person = this.persons.find((person) => person.id === id);
    if (!person) {
      throw new NotFoundException(`Person with ID "${id}" not found`);
    }
    return person;
  }

  create(personDto: Omit<Person, 'id'>): Person {
    const newPerson: Person = {
      id: ++this.currentId,
      favorite: false,
      ...personDto,
    };
    this.persons.push(newPerson);
    return newPerson;
  }

  update(id: number, updatePersonDto: UpdatePersonDto): Person {
    const personIndex = this.persons.findIndex((person) => person.id === id);
    if (personIndex === -1) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    this.persons[personIndex] = {
      ...this.persons[personIndex],
      ...updatePersonDto,
    };
    return this.persons[personIndex];
  }

  delete(id: number): void {
    const personIndex = this.persons.findIndex((person) => person.id === id);
    if (personIndex === -1) {
      throw new NotFoundException('Person not found');
    }
    this.persons.splice(personIndex, 1);
  }

  getFavorites(): Person[] {
    console.log('Filtering favorite persons');
    return this.persons.filter((person) => person.favorite);
  }
  toggleFavorite(id: number): Person {
    const personIndex = this.persons.findIndex((person) => person.id === id);
    if (personIndex === -1) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    this.persons[personIndex].favorite = !this.persons[personIndex].favorite;
    return this.persons[personIndex];
  }

  findByTags(searchTags: string[]): Person[] {
    return this.persons.filter((person) =>
      person.tag.some((tag) => searchTags.includes(tag)),
    );
  }
}
