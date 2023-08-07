import chai from 'chai';

const { assert } = chai;

export const assertHasErrorMessage = (err: any, message: string) => {
    const emailErrors = err.response.data.errors.map((e: any) => e.msg);
    assert.isTrue(emailErrors.includes(message));
  };

export const parseJsonObject = (o: any) => JSON.parse(JSON.stringify(o));