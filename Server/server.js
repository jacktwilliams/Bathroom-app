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
  let errorHandler = function(error, extraMessage) {
    console.log(error);
    let additional = extraMessage ? extraMessage : "";
    res.status(400).send('Error querying DB\n' + additional);
  }

  console.log('Test. Return WSU bathrooms for Watkins');

  let queryInstitution = req.query.institution;
  let queryString = "select * from organization where org_name = '" + queryInstitution + "'";
  let institutionFullInfo;
  
  conn.query(queryString, (error, results) => {
    if ( error ){
      errorHandler(error);
    } else {
      console.log(results);
      //got city info. Get bathrooms
      institutionFullInfo = results[0];

      queryString = "select * from building where org_id = " + results[0].org_id + ";"
      conn.query(queryString, (error1, results1) => {
        if (error1) {
          errorHandler(error1);
        }
        else {
          console.log(results1);
          institutionFullInfo.buildings = results1;
          console.log("Full info\n" + JSON.stringify(institutionFullInfo));

          queryString = "select * from bathroom where org_id = " + results[0].org_id +
            " and build_id in (select build_id from organization where org_id = " + results[0].org_id + ");";
          conn.query(queryString, (error2, results2) => {
            if(error2) {
              errorHandler(error2);
            }
            else {
              console.log(results2);
              institutionFullInfo.allBathrooms = results2;
              res.status(200).send(institutionFullInfo);
            }
          });
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));