/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import cats from './cats.js';

run();

async function run() {

  try {

    await Promise.all(
      cats.map(cat => {
        return client.query(`
          INSERT INTO cats (name, type, url, year, lives, is_sidekick)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
        [cat.name, cat.type, cat.url, cat.year, cat.lives, cat.isSidekick]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}