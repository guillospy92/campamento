import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Team } from './entities/Team';
import { Animals } from './entities/Animals';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'template' };
  }

  @Get('/rules')
  @Render('rules')
  rules() {
    return { message: 'template' };
  }

  @Get('/team')
  @Render('team')
  async team() {
    const animals = await this.appService.getAnimalsAll();
    return { message: 'template', animals: animals };
  }

  @Get('/teams-form')
  @Render('team-select')
  teamForm(@Query() body: any) {
    console.log(body);
    return { imgName: body.imgName, teamName: body.teamName };
  }

  @Post('/teams-form-save')
  @Render('result')
  async saveTeamForm(@Body() body: any, @Res() res: Response) {
    const verifyAnimal = await this.appService.getAnimalByNameAndImg(
      body.animal_name,
      body.animal_img,
    );

    if (verifyAnimal) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return res.redirect(
        `/teams-form?error=${encodeURIComponent('el equipo ya existe')}&imgName=${encodeURIComponent(body.animal_img)}&teamName=${encodeURIComponent(body.animal_name)}`,
      );
    }

    const animals = new Animals();
    animals.name = body.animal_name;
    animals.img = body.animal_img;

    const animalDb = await this.appService.saveAnimal(animals);
    const members: Team[] = [];

    const leader = new Team();
    leader.name = body.leader_name;
    leader.cc = body.leader_cc;
    leader.phone = body.leader_phone;
    leader.start_date = new Date(body.leader_date);
    leader.age = body.leader_age;
    leader.animal = animalDb;
    leader.role = 'Lider';

    members.push(leader);

    for (const index in body.member_name) {
      const member = new Team();
      member.name = body.member_name[index];
      member.cc = body.member_cc[index];
      member.phone = body.member_phone[index];
      member.start_date = new Date(body.member_date[index]);
      member.age = body.member_age[index];
      member.role = 'Integrante';
      member.animal = animalDb;
      members.push(member);
    }

    await this.appService.saveTeam(members);

    return { imgName: animalDb.img, teamName: animalDb.name, members: members };
  }
}
