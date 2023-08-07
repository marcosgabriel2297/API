import chai from 'chai';
import mocha from 'mocha';
import { faker } from '@faker-js/faker';
import '../app';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import ERROR_CODES from '../src/constants/errorCodes';
import User, { IUser } from '../src/models/User';
import userService from '../src/services/userService';
import { buildAuthorizationHeader } from '../src/utils/headersUtil';
import { signJwt } from '../src/utils/jwtUtil';
import { parseJsonObject } from './utils/testUtil';

const {
    PAGINATION_PAGE_INVALID,
    PAGINATION_LIMIT_INVALID
} = ERROR_CODES;

const { before, after } = mocha;
const { describe, it } = mocha;
const { assert } = chai;

const USERS_EP = '/users';

let users: IUser[];

const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

describe('User Controller', () => {
  before(async () => {
    await User.remove({});

    users = await Promise.all([
      userService.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      }),
      userService.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      }),
      userService.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      }),
      userService.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      }),
      userService.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      }),
      userService.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      }),
    ])
  });

  after(async () => {
    await User.remove({});
  });

  describe.only(`GET Auth User`, () => {
    it('Should return access denied', async () => {
      try {
        await instance.get(USERS_EP, buildAuthorizationHeader(`Bearer invalid token`, faker.internet.url()));

        assert.fail();
      } catch (err) {
        assert.deepEqual(err.response.status, StatusCodes.FORBIDDEN);
        assert.deepEqual(err.response.data.error, 'Access denied');
      }
    });

    it('Should return invalid token', async () => {
      try {
        await instance.get(USERS_EP, buildAuthorizationHeader(`Bearer invalid token`));

        assert.fail();
      } catch (err) {
        assert.deepEqual(err.response.status, StatusCodes.UNAUTHORIZED);
        assert.deepEqual(err.response.data.code, 'credentials_bad_format');
      }
    });

    it('Should return bad request as page is invalid', async () => {
      try {
        const token = signJwt(users[0]);

        const options = {
          ...buildAuthorizationHeader(`Bearer ${token}`),
          params: {
            pagination: { page: faker.string.alphanumeric() }
          }
        }

        await instance.get(USERS_EP, options);

        assert.fail();
      } catch (err) {
        assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assert.deepEqual(err.response.data.error, PAGINATION_PAGE_INVALID);
      }
    });

    it('Should return bad request as limit is invalid', async () => {
      try {
        const token = signJwt(users[0]);

        const options = {
          ...buildAuthorizationHeader(`Bearer ${token}`),
          params: {
            pagination: { limit: faker.string.alphanumeric() }
          }
        }

        await instance.get(USERS_EP, options);

        assert.fail();
      } catch (err) {
        assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assert.deepEqual(err.response.data.error, PAGINATION_LIMIT_INVALID);
      }
    });

    it('Should return users', async () => {
      const token = signJwt(users[0]);

      const options = {
        ...buildAuthorizationHeader(`Bearer ${token}`),
      }

      const { data, status } = await instance.get(USERS_EP, options);

      assert.deepEqual(status, StatusCodes.OK);
      assert.deepEqual(data.currentPage, 1);
      assert.deepEqual(data.totalPages, 1);
      assert.deepEqual(data.totalItems, users.length);
      assert.deepEqual(data.itemsPerPage, 10);
      assert.deepEqual(data.results, parseJsonObject(users.map(user => user.toJSON())));
    });

    it('Should return paginated users', async () => {
      const token = signJwt(users[0]);

      const options = {
        ...buildAuthorizationHeader(`Bearer ${token}`),
        params: {
          pagination: { page: 2, limit: 2 }
        }
      }

      const { data, status } = await instance.get(USERS_EP, options);

      assert.deepEqual(status, StatusCodes.OK);
      assert.deepEqual(data.currentPage, 2);
      assert.deepEqual(data.totalPages, 3);
      assert.deepEqual(data.totalItems, users.length);
      assert.deepEqual(data.itemsPerPage, 2);
      assert.deepEqual(data.results, parseJsonObject([users[2], users[3]]));
    });

    it('Should return users filtered by email', async () => {
      const token = signJwt(users[0]);

      const options = {
        ...buildAuthorizationHeader(`Bearer ${token}`),
        params: {
          email: users[0].email.toLocaleUpperCase()
        }
      }

      const { data, status } = await instance.get(USERS_EP, options);
      const expectedUsers = users.filter(user => user.email === users[0].email);

      assert.deepEqual(status, StatusCodes.OK);
      assert.deepEqual(data.currentPage, 1);
      assert.deepEqual(data.totalPages, 1);
      assert.deepEqual(data.totalItems, expectedUsers.length);
      assert.deepEqual(data.itemsPerPage, 10);
      assert.deepEqual(data.results, parseJsonObject(expectedUsers));
    });
  });
});
