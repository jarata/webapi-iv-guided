// old starting code
// const server = require('./api/server.js');
//
// server.listen(4000, () => {
//   console.log('\n*** Server Running on http://localhost:4000 ***\n');
// });

// it's recommended to load configuration for .env as early as possible
require('dotenv').config(); // add this line as the first thing to run1

const server = require('./api/server.js');

server.get('/', async (req, res) => {
  try {
    const shoutouts = await db('shoutouts');
    const messageOfTheDay = process.env.MOTD || 'Hello World!'; // add this line
    res.status(200).json({ motd: messageOfTheDay, shoutouts }); // change this line
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
  }
});

// we'll read the port from the server environment if it is there
// heroku will have the PORT environment variable set
const port = process.env.PORT || 5000;

// we can now use that port, if set up by heroku or read from .env or 5000 as a default if not set
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});