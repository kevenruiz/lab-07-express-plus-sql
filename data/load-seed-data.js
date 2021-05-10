/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import pokemon from './pokemon.js';

run();

async function run() {

  try {

    await Promise.all(
      pokemon.map(pokemon => {
        return client.query(`
          INSERT INTO  (name, type, url, year, lives, is_sidekick)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
          [pokemon.name, pokemon.type, pokemon.url, pokemon.year, pokemon.lives, pokemon.isSidekick]);
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