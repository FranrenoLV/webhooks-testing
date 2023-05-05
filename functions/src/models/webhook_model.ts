import {WhatsappAPIEntry} from "../interfaces/webhooks_interfaces";

export class WebhookModel {
  /** The specific webhook a business is subscribed to. The webhook is whatsapp_business_account. */
  object: string;
  /** An array of entry objects. */
  entry: WhatsappAPIEntry[];
  constructor(_object: string, _entry: WhatsappAPIEntry[]) {
    this.object = _object;
    this.entry = _entry;
  }

  public static fromJson(json: Record<string, any>): WebhookModel {
    return new WebhookModel(json["object"], json["entry"]);
  }

  public toJson(): Record<string, any> {
    return {
      object: this.object,
      entry: this.entry,
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJson());
  }
}
