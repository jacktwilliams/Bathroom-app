const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');
var passw = require('./password.js');
var bodyParser = require("body-parser");
const fs = require('fs');
var path = require('path');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'adminViews')));

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
    
    conn.query(queryString, (err, result) => {
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

app.post("/review", (req, res) => {
  console.log("New Review posted.\n" + JSON.stringify(req.body));
  conn.query("select user_id from user where fire_id = '" + req.body.uid + "';", (err, result1) => {
    if (err) {
      console.log("Error getting user given firebase id\n" + err);
    }
    else {
      console.log("uid: " + JSON.stringify(result1));
      let queryString = "insert into review (org_id, build_id, bath_id, user_id, stars, clean, stocked, quiet";

      let valString = " VALUES (" + req.body.org_id + ", " + req.body.build_id + ", " +
        req.body.bath_id + ", " + result1[0].user_id + ", " + req.body.stars + ", '" + req.body.clean + "', '" +
        req.body.stocked + "', '" + req.body.quiet;
        if (req.body.review_text) {
          queryString += ", review_text)"
          valString += "', '" + req.body.review_text + "');";
        }
        else {
          queryString += ")"
          valString += "');"
        }
    
        console.log(queryString + valString);
        conn.query(queryString + valString, (err, results) => {
          if (err) {
            console.log("Error posting review\n" + err);
          }
          else {
            console.log("Success. Response: \n" + JSON.stringify(results));
            res.status(200).send();
          }
        });
    }
  })

});

const htmlHeader = '<!doctype html> <html lang="en"> <head><meta charset="utf-i"> <title>Review Reports</title></head> <body>';
const htmlCloser = '</body></html>';
app.get("/admin", (req, res) => {
  console.log("New request for admin page.");
  let qString = "select review_id, review_text from review where review_id in (select review_id from report);"
  conn.query(qString, (err, results) => {
    if (err) {
      console.log("Error review for admin page.\n" + err);
    }
    else {
      console.log("Success getting reported reviews. Response: \n" + JSON.stringify(results));
      
      let htmlS = htmlHeader;
      for (let i = 0; i < results.length; ++i) {
        if (results[i].review_text != null) {
          htmlS += '<p>' + results[i].review_text + '</p>';
          htmlS += '<form action="/admin/resolve" method="post"> <input name="review_id" type="hidden" value="' + results[i].review_id + '">' +
            '<input name="Resolve" type="Submit" value="Ignore"><input name="Resolve" type="Submit" value="Remove"></form><hr>';
        }
      }
      htmlS += htmlCloser;
      fs.writeFile(path.join(__dirname, "adminViews","resolvePage.html"), htmlS, function (err) {
        if (err ) {
          console.log("Error saving generated html page.\n" + err);
        }
        else {
          console.log("Gen'd file was saved.");
          res.sendfile(path.join(__dirname, "adminViews", "resolvePage.html"));
        }
      });
    }
  });
});

app.post("/admin/resolve", (req, res) => {
  console.log("Admin resolved a report.\n" + JSON.stringify(req.body));
  let qString;
  let review_id = parseInt(req.body.review_id);
  if (req.body.Resolve === "Remove") {
    qString = "DELETE FROM review where review_id = " + review_id + ";";
  }
  else {
    qString = "DELETE FROM report where review_id = " + review_id + ";";
  }

  conn.query(qString, (err, results) => {
    if (err) {
      console.log("Error resolving review in database.\n" + err);
    }
    else {
      console.log("Successfully resolved review in database.\n" + JSON.stringify(results));
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));