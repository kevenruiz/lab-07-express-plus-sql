/* eslint-disable indent */
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
          INSERT INTO pokemon (name, pokemon_number, type_1, ability_1, url_image, is_Mega_Evolution)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
          [pokemon.name, pokemon.pokemon_number, pokemon.type_1, pokemon.ability_1, pokemon.url_image, pokemon.isMegaEvolution]);
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