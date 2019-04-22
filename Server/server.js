const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');
var passw = require('./password.js');
var bodyParser = require("body-parser");

app.use(express.json());

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : passw.password,
    database : 'bathroom'
});

var admin = require('firebase-admin');
var serviceAccount = require('./bathroomapp-5daa4-firebase-adminsdk-lswkz-0c46f33157.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bathroomapp-5daa4.firebaseio.com"
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
      institutionFullInfo = results[0];

      //got institution info. Get building info
      queryString = "select * from building where org_id = " + results[0].org_id + ";"
      conn.query(queryString, (error1, results1) => {
        if (error1) {
          errorHandler(error1);
        }
        else {
          institutionFullInfo.buildings = results1;  
          var gotBaths = false;
          var gotRevs = false;
          
          function returnData(dat) {
            if(gotBaths && gotRevs) {
              res.status(200).send(dat);
              console.log("Response sent.");
            }
          }

          //got building info. Get bathroom info
          queryString = "select * from bathroom where org_id = " + results[0].org_id + ";";
          conn.query(queryString, (error2, results2) => {
            if(error2) {
              errorHandler(error2);
            }
            else {
              institutionFullInfo.allBathrooms = results2;
              gotBaths = true;
              returnData(institutionFullInfo);
            }
          });

          //also get all reviews
          queryString = "select * from review where org_id = " + results[0].org_id + ";";
          conn.query(queryString, (error2, results2) => {
            if (error2) {
              errorHandler(error2);
            }
            else {
              institutionFullInfo.allReviews = results2;
              gotRevs = true;
              returnData(institutionFullInfo);
            }
          });
        }
      });
    }
  });
});

app.post("/newUser", (req, res) => {
  console.log("New user post.");

  admin.auth().verifyIdToken(req.body.token)
  .then((decodedToken) => {
    let queryString = "insert into user(fire_id, user_name) VALUE ('" + 
      req.body.uid + "', " + req.body.uname + ");";
    
    conn.query(queryString, (err, res) => {
      if(err) {
        console.log("Error adding user to DB.\n" + err);
      }
      else {
        console.log("Successfully added user to DB.");
        res.status(200).send();
      }
    });
  })
  .catch((e) => {
    console.log("Error authenticating user with firebase.\n" + e);
  })
});

app.get("/search", (req, res) => {
  console.log("Search request for " + req.query.query);
  
  let queryString = "select org_name from organization where org_name like '%" + req.query.query + "%';";

  conn.query(queryString, (err, result) => {
    if (err) {
      console.log("Error querying DB.\n" + err);
    }
    else {
      console.log("Matching entries: \n" + res);
      res.status(200).send(result);
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));