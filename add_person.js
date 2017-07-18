const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

// knex('famous_people')
// .where('last_name', process.argv[2])
// .orWhere('first_name', process.argv[2])
// .then(data => console.log(data))



knex('famous_people')
.insert({last_name: process.argv[2],
first_name: process.argv[3],
birthdate: process.argv[4]})
.then(data => console.log(data))

  return knex.destroy();
