const functions = require("firebase-functions");
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
const express = require("express");
const { default: Axios } = require("axios");
const app = express();
const cors = require("cors")({ origin: true });
admin.initializeApp();
const db = admin.firestore();
const Firestore = admin.firestore.Firestore;

app.use(cors);

app.post("/signup", (req, res) => {
  console.log("hitting here");
  const { email, password, fullName } = req.body;

  admin
    .auth()
    .createUser({
      email,
      emailVerified: false,
      password,
      displayName: fullName,
      disabled: false,
    })
    .then(function (userRecord) {
      console.log("Successfully created new user:", userRecord.uid);
      return db
        .collection("kycusers")
        .doc(userRecord.uid)
        .set({ fullName, email })
        .then(() => res.json({ success: true }))
        .catch((err) => console.log("error saving to db", err));
    })
    .catch(function (error) {
      console.log("Error creating new user:", error);
      res.status(400).json(error);
    });
});

app.post("/bvn", (req, res) => {
  console.log("resolving bvn");

  var config = {
    method: "get",
    url: `https://api.paystack.co/bank/resolve_bvn/${req.body.bvn}`,
    headers: {
      Authorization: "Bearer secret",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return res.json(error.response.data);
    });
});

exports.kyc = functions.https.onRequest(app);
