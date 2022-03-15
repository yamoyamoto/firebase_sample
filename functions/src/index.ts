import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import axios from "axios";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const fireStore = new admin.firestore.Firestore();

export const helloWorld = functions.https.onRequest(async (request: functions.https.Request, response: functions.Response) => {
  const slackWebhookUrl = process.env.SLACKWEBHOOKURL!;
  await axios.post(slackWebhookUrl, {
    text: "hello gucchi!",
  }).then(() => {
    functions.logger.info("complete send message to slack");
  }).catch(() => {
    functions.logger.info("failed send message to slack");
  });

  const correctionRef = fireStore.collection("sample_correction");

  const document = await correctionRef.add({
    title: "title",
    body: "hello world",
  });

  await document.update({
    body: "My first Firestore app",
  });

  // const doc = document.get();

  response.send("Hello gucchi!");
});
