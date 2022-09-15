//   <<<<<<----firestore connectiom---->>>>>
//    <<<<<--start--->>>>
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

//  <<<---end--->>>>
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var path = require("path");
var dirname = path.join(__dirname);
app.get("/index", (req, res) => {
  res.sendFile(dirname + "/index.html");
});
app.post("/myaction", async (req, res) => {
  console.log(req.body.name);

  console.log(req.body.email);

  //adding form data in database
  await db
    .collection("info")
    .add({
      first: req.body.name,
      mail: req.body.email,
      born: 2002,
      message: req.body.message,
    })
    .then(async (docRef) => {
      console.log("Document written with ID: ", docRef.id);
      await db.collection("info").doc(docRef.id).update({
        id: docRef.id,
      });

      res.send("data added successfully in database");
    });
});

app.listen(8080, () => {
  console.log("Server running on http://127.0.0.1:8080/");
});
