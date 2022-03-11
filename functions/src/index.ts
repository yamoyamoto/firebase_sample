import * as functions from "firebase-functions";
import axios from "axios";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(async (request: functions.https.Request, response: functions.Response) => {
  const slackWebhookUrl = process.env.SLACKWEBHOOKURL!;
  await axios.post(slackWebhookUrl, {
    text: "hello gucchi!",
  }).then(() => {
    functions.logger.info("complete send message to slack");
  }).catch(() => {
    functions.logger.info("failed send message to slack");
  });
  response.send("Hello gucchi!");
});
