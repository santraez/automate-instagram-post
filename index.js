require("dotenv").config();
// const express = require('express');

// const app = express();
// const port = process.env.PORT || 4000;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
// const CronJob = require("cron").CronJob;

const postToInsta = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  const imageBuffer = await get({
    url: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ5pAUkFjASncLgVEsqVbwyTj0LP1ObO85jakWZEibYYmjHzzQux9-C1zQ2DXiZnAldF_l5_EXyZXQqQf4',
    encoding: null, 
  });

  await ig.publish.photo({
    file: imageBuffer,
    caption: 'Really nice photo from the internet!', // nice caption (optional)
  });
}

// const cronInsta = new CronJob("30 * * * * *", async () => {
//   postToInsta();
// });

// cronInsta.start();

postToInsta();