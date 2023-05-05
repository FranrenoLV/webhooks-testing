import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Mediator} from "./services/mediator";
import {Logger} from "./helpers/logger";

admin.initializeApp();
const mediator = Mediator.getInstance();

export const webhooksListener = functions.https.onRequest(
  async (
    req: functions.https.Request,
    res: functions.Response
  ): Promise<void> => {
    switch (req.method) {
    case "POST":
      Logger.log("Starting POST webhook");
      await mediator.handlePOSTWebhook(res, req.body);
      break;
    case "GET":
      await mediator.handleGETWebhook(res, {
        mode: String(req.query["hub.mode"]),
        token: String(req.query["hub.verify_token"]),
        challenge: req.query["hub.challenge"],
      });
      break;
    }

    return;
  }
);
