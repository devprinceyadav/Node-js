//                  <<<<-=----firestore conncetion--------->>>>
//                            <<-----start--->>>
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
//                        <<<<<---end---->>>>

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var path = require("path");
var dirname = path.join(__dirname);

app.get("/getdata", async (req, res) => {
  res.sendFile(dirname + "/getdata.html");
  //getting data from firestore
  await db
    .collection("info")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        res.send(
          "table><tr><td>" +
            doc.data().first +
            "</td><td>" +
            doc.data().mail +
            "</td><td>" +
            doc.data().message +
            "</td><td>" +
            doc.data().born +
            "</td><tr></table>"
        );
        document.getElementById("student_details").innerHTML += html;
      });
    });
});

app.listen(8080, () => {
  console.log("Server running on http://127.0.0.1:8080/");
});
