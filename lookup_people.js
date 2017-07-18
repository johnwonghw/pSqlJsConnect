const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text`, [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...')
    console.log(`Found ${result.rows.length} person(s) by the name '${process.argv[2]}'`)
    console.log(`- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name} born, ${result.rows[0].birthdate}`); //output: 1
    client.end();
  });
});