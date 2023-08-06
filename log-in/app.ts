import app from './src/server';
import connection from './src/database/connection';

const { connectToDatabase } = connection;
const { PORT } = process.env;

(async () => {
  await connectToDatabase();

  app.listen(PORT || 3000, async () => {
    console.log(`App listening on port ${PORT}!`);
  });
})();

module.exports = app;
