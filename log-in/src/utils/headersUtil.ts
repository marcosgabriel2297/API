const { BASE_URL } = process.env;

export const buildAuthorizationHeader = (token: string) => ({
    headers: {
        Authorization: token,
        Origin: BASE_URL
    },
  });