import { resolve } from 'path';
import dotenv from "dotenv";
import Telegraf from 'telegraf';
import cron from 'node-cron';
import { UserService } from './controllers/bot/users';
import { CongratulateService } from './controllers/bot/congratulations';
import { MongoClient } from 'mongodb';
import fs from 'fs'

export const mongoClient = new MongoClient('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect();

dotenv.config({ path: resolve(__dirname, '../.env') });

const bot = new Telegraf(process.env.BOT_TOKEN, {
  polling: true,
})

bot.start((ctx: any) => {
  return ctx.reply('Welcome!')
})

bot.command('happyRandomUser', async (ctx: any) => {
  const userService = await UserService(mongoClient);
  const congratulateService = await CongratulateService(mongoClient);

  const user = await userService.getRandomUser();
  const congratulation = await congratulateService.getCongratulationForUser(user);

  ctx.replyWithPhoto(
    { source: fs.readFileSync(resolve(__dirname, './public/images/', congratulation.photoPath)) },
    { caption: congratulation.message });
})

cron.schedule('0 9 * * *', async () => {
  const userService = await UserService(mongoClient);
  const congratulateService = await CongratulateService(mongoClient);

  const users = await userService.getUsers(new Date());
  if (users.length > 0) {
    users.forEach(async (user) => {
      const congratulation = await congratulateService.getCongratulationForUser(user);
      await bot.telegram.sendPhoto(
        process.env.GROUP_ID,
        { source: fs.readFileSync(resolve(__dirname, './public/images/', congratulation.photoPath)) },
        { caption: congratulation.message },
      )
    });
  }
})

bot.launch()

