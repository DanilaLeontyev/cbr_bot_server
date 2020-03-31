import { IUser } from '../../models/User';
import { MongoClient } from 'mongodb';
import moment from 'moment';

export async function UserService(client: MongoClient) {
  const cursor = await client.db('rcr_bot').collection('users')

  async function getUsers(date: Date): Promise<IUser[]> {
    try {
      const searchMonth: number = date.getMonth() + 1
      const searchDay: number = date.getDate()

      const usersAgg = cursor.aggregate([
        {
          $project: {
            month: { "$month": "$date" },
            day: { "$dayOfMonth": "$date" },
            fio: 1,
            gender: 1,
            position: 1,
            role: 1,
            date: 1
          }
        }, {
          $match: {
            month: searchMonth,
            day: searchDay
          }
        }
      ]);
      console.log(await usersAgg.toArray())
      return await usersAgg.toArray();
    }
    catch (err) { throw err }
  }

  async function updateUsersDate(): Promise<void> {
    try {
      const users = cursor.find({}).maxAwaitTimeMS(1000);

      await users.forEach(user => {
        if (user._id) {
          const newDate = new Date(moment.utc(user.date, 'DD.MM.YYYY').toISOString())
          this.cursor.update({
            '_id': user._id,
          }, {
            '$set': {
              'date': newDate,
            }
          })
        }
      })
    } catch (err) { throw err }
  }

  async function getRandomUser(): Promise<IUser> {
    try {
      const usersAgg = cursor.aggregate([
        {
          $sample: {
            size: 1
          }
        }
      ]);
      const users = await usersAgg.toArray()
      return users[0];

    } catch (err) { throw err }
  }

  return {
    getUsers,
    updateUsersDate,
    getRandomUser,
  }
}
