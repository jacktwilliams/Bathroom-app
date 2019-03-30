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
  //function to handle any errors in query process
  let errorHandler = function(error, extraMessage) {
    console.log(error);
    let additional = extraMessage ? extraMessage : "";
    res.status(400).send('Error querying DB\n' + additional);
  }

  let queryInstitution = req.query.institution;
  console.log("Request recieved for " + queryInstitution);
  let queryString = "select * from organization where org_name = '" + queryInstitution + "'";
  let institutionFullInfo;
  
  conn.query(queryString, (error, results) => {
    if ( error ){
      errorHandler(error);
    } else {
      console.log("Institution Data\n" + JSON.stringify(results));
      institutionFullInfo = results[0];

      //got institution info. Get building info
      queryString = "select * from building where org_id = " + results[0].org_id + ";"
      conn.query(queryString, (error1, results1) => {
        if (error1) {
          errorHandler(error1);
        }
        else {
          console.log("Building Data\n" + JSON.stringify(results1));
          institutionFullInfo.buildings = results1;

          //got building info. Get bathroom info
          queryString = "select * from bathroom where org_id = " + results[0].org_id +
            " and build_id in (select build_id from organization where org_id = " + results[0].org_id + ");";
          conn.query(queryString, (error2, results2) => {
            if(error2) {
              errorHandler(error2);
            }
            else {
              console.log("Bathroom Data\n" + JSON.stringify(results2));
              institutionFullInfo.allBathrooms = results2;

              //respond to request with all data
              console.log("Full info\n" + JSON.stringify(institutionFullInfo));
              res.status(200).send(institutionFullInfo);
            }
          });
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));