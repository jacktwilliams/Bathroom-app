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
  let queryString = "select * from bathroom "; 

  let queryInstitution = req.query.institution;
  let queryBuilding = req.query.building;
  let queryGender = req.query.gender;

  if(queryGender) {
    queryString += "where bathroom.gender = '" + queryGender + "'";
  }

  if(queryInstitution && queryBuilding) {
    if(queryGender) {
      
    }
    queryString += "where bathroom.build_id in " +
    "(select build_id from building where build_name = '" + queryBuilding + "' and org_id in " +
    "(select org_id from organization where org_name = '" + queryInstitution + "'));"
  }
  else if (queryInstitution) {
    queryString += "where bathroom.org_id in " +
      "(select org_id from organization where org_name = '" + queryInstitution + "');";
  }
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