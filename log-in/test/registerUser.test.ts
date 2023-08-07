import chai from 'chai';
import mocha from 'mocha';
import { faker } from '@faker-js/faker';
import '../app';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { assertHasErrorMessage } from './utils/testUtil';
import ERROR_CODES from '../src/constants/errorCodes';
import { MIN_PASSWORD_LENGTH } from '../src/models/User';
import User, { IUser } from '../src/models/User';
import userService from '../src/services/userService';
import { comparePassword } from '../src/utils/bycriptUtil';

const {
    EMAIL_NOT_VALID,
    PASSWORD_NOT_VALID,
    PASSWORD_INVALID_LENGTH,
    EMAIL_ALREADY_IN_USE
} = ERROR_CODES;

const { before, after } = mocha;
const { describe, it } = mocha;
const { assert } = chai;

const REGISTER_USER_EP = 'auth/register';
const existingEmail = faker.internet.email();

const userToCreate = {
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
    await userService.create({ email: existingEmail, password: faker.internet.password() });
  });

  after(async () => {
    await User.remove({});
  });

  describe(`POST Register User`, () => {
    it('Should return bad request as body is empty', async () => {
      try {
        await instance.post(REGISTER_USER_EP);

        assert.fail();
      } catch (err) {
        assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
        assertHasErrorMessage(err, EMAIL_NOT_VALID);
        assertHasErrorMessage(err, PASSWORD_NOT_VALID);
      }
    });

    it('Should return bad request as email is empty', async () => {
        try {
            const {email, ...dataWithoutEmail} = userToCreate;
            await instance.post(REGISTER_USER_EP, dataWithoutEmail);

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, EMAIL_NOT_VALID);
          }
    })

    it('Should return bad request as email is invalid', async () => {
        try {
            await instance.post(REGISTER_USER_EP, {...userToCreate, email: faker.string.alphanumeric()});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, EMAIL_NOT_VALID);
          }
    });

    it('Should return bad request as password is invalid', async () => {
        try {
            await instance.post(REGISTER_USER_EP, {...userToCreate, password: faker.number.int()});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, PASSWORD_NOT_VALID);
          }
    });

    it('Should return bad request as password is very short', async () => {
        try {
            await instance.post(REGISTER_USER_EP, {...userToCreate, password: faker.string.alphanumeric(MIN_PASSWORD_LENGTH - 1)});

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, PASSWORD_INVALID_LENGTH);
          }
    });

    it('Should return bad request because the email already exists', async () => {
        try {
            await instance.post(REGISTER_USER_EP, { ...userToCreate, email: existingEmail });

            assert.fail();
          } catch (err) {
            assert.deepEqual(err.response.status, StatusCodes.UNPROCESSABLE_ENTITY);
            assertHasErrorMessage(err, EMAIL_ALREADY_IN_USE);
          }
    });

    it('Should create a new user', async () => {
        const { data, status } = await instance.post(REGISTER_USER_EP, userToCreate);

        const createdUser: IUser | null = await userService.findByEmail(userToCreate.email);
        const password: string = createdUser?.password ?? '';

        assert.deepEqual(status, StatusCodes.OK);
        assert.deepEqual(data.email, userToCreate.email);
        assert.isTrue(await comparePassword(userToCreate.password, password));
    });
  });
});
