const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');
var passw = require('./password.js');

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : passw.password,
    database : 'bathroom'
});

conn.connect();

app.get('/', (req, res) => {
  console.log('Test. Return WSU bathrooms for Watkins');
  let queryString = "select * from bathroom where bathroom.build_id in " +
    "(select build_id from building where build_name = 'Watkins' and org_id in " +
    "(select org_id from organization where org_name = 'Winona State University'));"
  conn.query(queryString, (error, results) => {
    if ( error ){
      console.log(error);
      res.status(400).send('Error in database operation');
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));