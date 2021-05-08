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

  const expectedCats = [
    {
      id: expect.any(Number),
      name: 'Felix',
      type: 'Tuxedo',
      url: 'cats/felix.png',
      year: 1892,
      lives: 3,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Garfield',
      type: 'Orange Tabby',
      url: 'cats/garfield.jpeg',
      year: 1978,
      lives: 7,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Duchess',
      type: 'Angora',
      url: 'cats/duchess.jpeg',
      year: 1970,
      lives: 9,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Stimpy',
      type: 'Manx',
      url: 'cats/stimpy.jpeg',
      year: 1990,
      lives: 1,
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Sylvester',
      type: 'Tuxedo',
      url: 'cats/sylvester.jpeg',
      year: 1945,
      lives: 1,
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Tigger',
      type: 'Orange Tabby',
      url: 'cats/tigger.jpeg',
      year: 1928,
      lives: 8,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Hello Kitty',
      type: 'Angora',
      url: 'cats/hello-kitty.jpeg',
      year: 1974,
      lives: 9,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Hobbs',
      type: 'Orange Tabby',
      url: 'cats/hobbs.jpeg',
      year: 1985,
      lives: 6,
      isSidekick: true
    }
  ];

  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('GET /api/cats', async () => {
    // act - make the request
    const response = await request.get('/api/cats');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(expectedCats);

  });

  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('GET /api/cats/:id', async () => {
    const response = await request.get('/api/cats/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedCats[1]);
  });
});