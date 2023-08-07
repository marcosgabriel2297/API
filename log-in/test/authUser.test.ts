import chai from 'chai';
import mocha from 'mocha';
import { faker } from '@faker-js/faker';
import '../app';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { assertHasErrorMessage } from './utils/testUtil';
import ERROR_CODES from '../src/constants/errorCodes';
import { MIN_PASSWORD_LENGTH } from '../src/models/User';
import User from '../src/models/User';
import userService from '../src/services/userService';

const {
    EMAIL_NOT_VALID,
    PASSWORD_NOT_VALID,
    PASSWORD_INVALID_LENGTH,
    USER_NOT_EXISTS,
} = ERROR_CODES;

const { before, after } = mocha;
const { describe, it } = mocha;
const { assert } = chai;

const AUTH_USER_EP = 'auth/';

const user = {
    email: faker.internet.email({ firstName: 'joe', lastName: 'doe' }),
    password: faker.internet.password()
}

const { BASE_URL } = process.env;
const instance = axios.create({
  baseURL: BASE_URL,
});

describe('User Controller', () => {
  before(async () => {
    await User.remove({});
    await userService.create(user);
  });

  after(async () => {
    await User.remove({});
  });

  describe(`POST Auth User`, () => {
    it('Should return bad request as body is empty', async () => {
      try {
        await instance.post(AUTH_USER_EP);

        assert.fail();
      } catch (err) {
        assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assertHasErrorMessage(err, EMAIL_NOT_VALID);
        assertHasErrorMessage(err, PASSWORD_NOT_VALID);
      }
    });

    it('Should return bad request as email is empty', async () => {
        try {
            const {email, ...dataWithoutEmail} = user;
            await instance.post(AUTH_USER_EP, dataWithoutEmail);

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, EMAIL_NOT_VALID);
          }
    })

    it('Should return bad request as email is invalid', async () => {
        try {
            await instance.post(AUTH_USER_EP, {...user, email: faker.string.alphanumeric()});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, EMAIL_NOT_VALID);
          }
    });

    it('Should return bad request as password is invalid', async () => {
        try {
            await instance.post(AUTH_USER_EP, {...user, password: faker.number.int()});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, PASSWORD_NOT_VALID);
          }
    });

    it('Should return bad request as password is very short', async () => {
        try {
            await instance.post(AUTH_USER_EP, {...user, password: faker.string.alphanumeric(MIN_PASSWORD_LENGTH - 1)});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, PASSWORD_INVALID_LENGTH);
          }
    });

    it('Should return bad request because the user not exists', async () => {
        try {
            await instance.post(AUTH_USER_EP, {...user, email: faker.internet.email()});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assert.deepEqual(err.response.data.message, USER_NOT_EXISTS);
          }
    });

    it('Should return bad request because the password is incorrect', async () => {
        try {
            await instance.post(AUTH_USER_EP, {...user, password: faker.internet.password()});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assert.deepEqual(err.response.data.message, PASSWORD_NOT_VALID);
          }
    });

    it('Should authenticate the user', async () => {
        const { data, status } = await instance.post(AUTH_USER_EP, user);

        assert.deepEqual(status, StatusCodes.OK);
        assert.deepEqual(data.email, user.email);
        assert.isDefined(data.token);
        assert.isUndefined(data.password);
    });
  });
});
