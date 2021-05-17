/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';

// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/', (req, res) => {
  res.send('THis will say pokemon');
});

// API routes,
app.get('/api/pokemon', async (req, res) => {

  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              pokemon_number,
              type_1,
              ability_1,
              url_image,
              is_Mega_Evolution as "isMegaEvolution"
      FROM    pokemon;
    `);

    // send back the data
    res.json(data.rows); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.get('/api/pokemon/:id', async (req, res) => {
  // use SQL query to get data...
  console.log(req.params.id);
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              pokemon_number,
              type_1,
              ability_1,
              url_image,
              is_Mega_Evolution as "isMegaEvolution"
      FROM    pokemon
      WHERE   id = $1;
    `, [req.params.id]);

    // send back the data
    res.json(data.rows[0] || null); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.post('/api/pokemon', async (req, res) => {
  try {
    const pokemon = req.body;
    const data = await client.query(`
    INSERT INTO pokemon (name, pokemon_number, type_1, ability_1, url_image, is_Mega_evolution)
                 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id,
                name,
                pokemon_number,
                type_1,
                ability_1,
                url_image,
                is_Mega_Evolution as "isMegaEvolution";
    `, [pokemon.name, pokemon.pokemon_number, pokemon.type_1, pokemon.ability_1, pokemon.url_image, pokemon.isMegaEvolution]);
    res.json(data.rows[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/pokemon/:id', async (req, res) => {
  try {
    const pokemon = req.body;

    const data = await client.query(`
    UPDATE pokemon
    SET   name = $1
          pokemon_number = $2
          type_1 = $3
          ability_1 = $4
          url_image = $5
          is_Mega_Evolution as "isMegaEvolution" = $6
    WHERE id = $7
    RETURNING id, name, pokemon_number, type_1, ability_1, url_image, is_Mega_Evolution as "isMegaEvolution";`,


      // eslint-disable-next-line indent
      [pokemon.name, pokemon.pokemon_number, pokemon.type_1, pokemon.ability_1, pokemon.url_image, pokemon.isMegaEvolution]);

    res.json(data.rows[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/pokemon/:id', async (req, res) => {
  try {
    const data = await client.query(`
    DELETE FROM pokemon
    WHERE id = $1
    RETURNING id, name, pokemon_number, type_1, ability_1, url_image, is_Mega_Evolution as "isMegaEvolution";`,
      // eslint-disable-next-line indent
      [req.params.id]);

    res.json(data.rows[0]);
  }
  catch (err) {
    console.log(err);
    res.status(200).json({ error: err.message });
  }
});







export default app;