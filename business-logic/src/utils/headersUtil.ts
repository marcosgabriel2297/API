const { BASE_URL } = process.env;

export const buildAuthorizationHeader = (token: string, origin = BASE_URL) => ({
    headers: {
        Authorization: token,
        Origin: origin
    },
  });