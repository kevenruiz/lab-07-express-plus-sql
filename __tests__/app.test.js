import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  /*beforeAll(() => {
    execSync('npm run recreate-tables');
  });
  */

  beforeAll(() => {
    execSync('npm run setup-db');
  });


  afterAll(async () => {
    return client.end();
  });

  //describe(('/api/pokemon CRUD'), () => {


  //});
  /*
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
    }];
    */

  let expectedRaichu = {
    id: expect.any(Number),
    name: 'Raichu',
    pokemon_number: 32,
    type_1: 'electric',
    ability_1: 'static',
    url_image: '',
    isMegaEvolution: false
  };

  let Raichu = {
    id: 9,
    name: 'Raichu',
    pokemon_number: 32,
    type_1: 'electric',
    ability_1: 'static',
    url_image: '',
    isMegaEvolution: false
  };

  let raichu = {
    id: 35,
    name: 'Raichu',
    pokemon_number: 32,
    type_1: 'electric',
    ability_1: 'static',
    url_image: '',
    isMegaEvolution: false
  };




  let lugia = {
    id: expect.any(Number),
    name: 'Lugia',
    pokemon_number: 249,
    type_1: 'psychic',
    ability_1: 'flying',
    url_image: '',
    isMegaEvolution: false
  };


  it('POST raichu to /api/pokemon', async () => {
    const response = await request
      .post('/api/pokemon')
      .send(raichu);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(raichu);

    raichu = response.body;
  });

  it('PUT updated raichu to /api/pokemon/:id', async () => {
    raichu.pokemon_number = 35;
    raichu.name = 'raichu';

    const response = await request
      .put(`/api/pokemon/${raichu.id}`)
      .send(raichu);
    response;

  });

  it('GET raichu from /api/pokemon/:id', async () => {
    const response = await request.get(`/api/pokemon/${Raichu.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(Raichu);
  });

  it('GET list of pokemon from /api/pokemon', async () => {
    const r1 = await request.post('/api/pokemon').send(raichu);
    raichu = r1.body;
    const r2 = await request.post('/api/pokemon').send(lugia);
    lugia = r2.body;

    const response = await request.get('/api/pokemon');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([{
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
    }])
    );


  });

  it('DELETE Raichu from /api/pokemon/:id', async () => {
    const response = await request.delete(`/api/pokemon/${Raichu.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedRaichu);

    const getResponse = await request.get('/api/pokemon');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(expect.arrayContaining([{
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
    {
      'id': 9,
      'name': 'Raichu',
      'pokemon_number': 32,
      'type_1': 'electric',
      'ability_1': 'static',
      'url_image': '',
      'isMegaEvolution': false
    },
    {
      'id': 10,
      'name': 'raichu',
      'pokemon_number': 35,
      'type_1': 'electric',
      'ability_1': 'static',
      'url_image': '',
      'isMegaEvolution': false
    },
    {
      'id': 11,
      'name': 'Lugia',
      'pokemon_number': 249,
      'type_1': 'psychic',
      'ability_1': 'flying',
      'url_image': '',
      'isMegaEvolution': false
    }]));
  });




  // If a GET request is made to /api/pokemon, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  //it('GET /api/pokemon', async () => {
  // act - make the request
  //const response = await request.get('/api/pokemon');

  // was response OK (200)?
  //expect(response.status).toBe(200);

  // did it return the data we expected?
  // eslint-disable-next-line no-undef
  //expect(response.body).toEqual(expectedPokemon);

  //});

  // If a GET request is made to /api/pokemon/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?

  /*
  it.skip('GET /api/pokemon/:id', async () => {
    const response = await request.get('/api/pokemon/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedPokemon[1]);
  });
});
*/
});