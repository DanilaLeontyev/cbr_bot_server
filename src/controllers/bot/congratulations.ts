import { Congratulation, CongratulationForUser } from '../../models/Congratulation';
import { MongoClient } from 'mongodb';
import petrovich from 'petrovich';
import fs from 'fs';
import { resolve } from 'path';

export async function CongratulateService(client: MongoClient) {
  const cursor = await client
    .db('rcr_bot')
    .collection('congratulation');

  async function getRandomCongratulation(): Promise<Congratulation[]> {
    try {
      const congratulation = await cursor.aggregate([
        {
          $sample: {
            size: 1
          }
        }
      ]);
      return await congratulation.toArray();

    } catch (err) { throw err }
  }

  async function getCongratulationForUser(user: any): Promise<CongratulationForUser> {
    try {
      const congratulation = await getRandomCongratulation();
      const fio = user.fio.split(' ');
      const name = petrovich({
        gender: user.gender ? 'male' : 'female',
        first: fio[1],
        last: fio[0],
        middle: fio[2]
      }, 'accusative')
      const happyBirthdayMessage = `Поздравляем ${name.last} ${name.first} ${name.middle}!\n🎈🎈🎈🎈🎈🎈🎈🎈\n${congratulation[0].text}`
      const imageFolder = fs.readdirSync(resolve(__dirname, '../public/images/'))
      const choosenFile = imageFolder[Math.floor(Math.random() * imageFolder.length)]

      return {
        message: happyBirthdayMessage,
        photoPath: choosenFile,
      }

    } catch (err) { throw err }
  }

  return {
    getRandomCongratulation,
    getCongratulationForUser
  }
}
