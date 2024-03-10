const admin = require("firebase-admin");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
  connectFirestoreEmulator,
} = require("firebase-admin/firestore");

async function fun() {
  // var serviceAccount = require("./myproject-a1ddc-firebase-adminsdk-86ld4-c7a949f6be.json");
  // initializeApp({
  //     credential: admin.credential.cert(serviceAccount)
  // });
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  initializeApp({});

  let db = null;
  db = getFirestore();
  const docRef = db.collection("users").doc("alovelace");

  const aTuringRef = db.collection("users").doc("aturing");
  try {
    await docRef.set({
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
  } catch (error) {
    console.log(error);
  }

  aTuringRef
    .set(
      {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      },
      { merge: true }
    )
    .then(() => {
      console.log("insert completed");
    });
  const snapshot = await docRef.get();
  let born = snapshot.data().born;

  while (true) {
    born = born + 1;
    await docRef.update({ born });
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

fun().then(() => {
  console.log("completed");
});
