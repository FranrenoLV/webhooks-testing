import {Response} from "firebase-functions/v1";
import {WebhookGetProps} from "../interfaces/webhook_get_interface";
import {Logger} from "../helpers/logger";
import {WebhookModel} from "../models/webhook_model";
import {FirestoreDatabase} from "./databse";

export {Mediator};

class Mediator {
  private static instance: Mediator;
  private databse: FirestoreDatabase;

  constructor() {
    this.databse = FirestoreDatabase.getInstance();
  }

  public static getInstance(): Mediator {
    if (!Mediator.instance) {
      Mediator.instance = new Mediator();
    }
    return Mediator.instance;
  }

  public async handleGETWebhook(response: Response, props: WebhookGetProps) {
    const verifyToken = process.env.VERIFY_TOKEN;

    if (props.mode && props.token) {
      if (props.mode === "subscribe" && props.token === verifyToken) {
        Logger.log("WEBHOOK_VERIFIED");
        response.status(200).send(props.challenge);
      } else {
        response.sendStatus(403);
      }
    }
  }

  public async handlePOSTWebhook(
    response: Response,
    body: Record<string, any>
  ) {
    Logger.log("creating webhook model");
    const webhookModel = WebhookModel.fromJson(body);
    Logger.log("created");
    Logger.log(`${webhookModel.toString()}`);

    Logger.log("Setting at collection");
    const setResult = await this.databse.setCollectionDocument(
      "webhooksListener",
      webhookModel.toJson()
    );

    if (!setResult.ok) {
      response.status(400).send(setResult.error.message);
      return;
    }

    response.status(200).send(setResult.value);
    return;
  }
}
