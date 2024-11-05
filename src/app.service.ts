import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animals } from './entities/Animals';
import { Repository } from 'typeorm';
import { Team } from './entities/Team';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Animals)
    private animalRepository: Repository<Animals>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async saveTeam(team: Team[]): Promise<void> {
    await this.teamRepository.save(team);
  }

  async saveAnimal(animal: Animals): Promise<Animals> {
    return await this.animalRepository.save(animal);
  }

  async getAnimalByNameAndImg(
    animalName: string,
    animalImg: string,
  ): Promise<Animals> {
    return await this.animalRepository.findOneBy({
      name: animalName,
      img: animalImg,
    });
  }

  async getAnimalsAll(): Promise<Animals[]> {
    return await this.animalRepository.find();
  }
}
