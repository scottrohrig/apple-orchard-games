const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});

  // create user data
  const userData = [];

  const weight = Math.floor(Math.random() * 10 )

  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = 'pw123';
    const gemCount = Math.floor(Math.random() * (1*weight));
    const appleCount = Math.floor(Math.random() * (50 * weight));
    const money = Math.floor(Math.random() * (250 * weight));

    userData.push({ username, email, password, gemCount, money, appleCount });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log('all done!');
  process.exit(0);
});
