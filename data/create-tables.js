/* eslint-disable no-console */
import client from '../lib/client.js';

// async/await needs to run in a function
run();

async function run() {

  try {

    // run a query to create tables
    await client.query(`          
      CREATE TABLE pokemon (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(512) NOT NULL,
        pokemon_number INTEGER NOT NULL,
        type_1 VARCHAR(512) NOT NULL,
        ability_1 VARCHAR(512) NOT NULL,
        url_image VARCHAR(1024) NOT NULL,
        is_Mega_Evolution BOOLEAN DEFAULT FALSE
      );
    `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}