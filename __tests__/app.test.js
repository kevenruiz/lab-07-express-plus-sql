import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  beforeAll(() => {
    execSync('npm run setup-db');
  });

  afterAll(async () => {
    return client.end();
  });

  const expectedPokemon = [
    {
      'id': 1,
      'name': 'butterfree',
      'pokemon_number': 16,
      'type_1': 'bug',
      'ability_1': 'compound-eyes',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png',
      'isMegaEvolution': false
    },
    {
      'id': 2,
      'name': 'venusaur-mega',
      'pokemon_number': 4,
      'type_1': 'grass',
      'ability_1': 'thick-fat',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/003_f2.png',
      'isMegaEvolution': true
    },
    {
      'id': 3,
      'name': 'pidgeotto',
      'pokemon_number': 22,
      'type_1': 'normal',
      'ability_1': 'keen-eye',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/017.png',
      'isMegaEvolution': false
    },
    {
      'id': 4,
      'name': 'arbok',
      'pokemon_number': 30,
      'type_1': 'poison',
      'ability_1': 'intimidate',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png',
      'isMegaEvolution': false
    },
    {
      'id': 5,
      'name': 'pikachu',
      'pokemon_number': 31,
      'type_1': 'electric',
      'ability_1': 'static',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      'isMegaEvolution': false
    },
    {
      'id': 6,
      'name': 'clefairy',
      'pokemon_number': 41,
      'type_1': 'fairy',
      'ability_1': 'cute-charm',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png',
      'isMegaEvolution': false
    },
    {
      'id': 7,
      'name': 'jigglypuff',
      'pokemon_number': 45,
      'type_1': 'normal',
      'ability_1': 'cute-charm',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png',
      'isMegaEvolution': false
    },
    {
      'id': 8,
      'name': 'charmeleon',
      'pokemon_number': 6,
      'type_1': 'fire',
      'ability_1': 'blaze',
      'url_image': 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
      'isMegaEvolution': false
    },
  ];

  // If a GET request is made to /api/pokemon, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('GET /api/pokemon', async () => {
    // act - make the request
    const response = await request.get('/api/pokemon');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(expectedPokemon);

  });

  // If a GET request is made to /api/pokemon/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('GET /api/pokemon/:id', async () => {
    const response = await request.get('/api/pokemon/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedPokemon[1]);
  });
});