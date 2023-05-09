import {
  WhatsappAPIContact,
  WhatsappAPIDatabaseModel,
  WhatsappAPIEntry,
  WhatsappAPIStatuses,
  WhatsappAPIValue,
} from "../interfaces/webhooks_interfaces";

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

  public formatToStructuredUpload(): WhatsappAPIDatabaseModel {
    const contact: WhatsappAPIContact | undefined = this.entry[0].changes[0]
      .value.contacts ?
      this.entry[0].changes[0].value.contacts[0] :
      undefined;

    const statuses: WhatsappAPIStatuses | undefined = this.entry[0].changes[0]
      .value.statuses ?
      this.entry[0].changes[0].value.statuses[0] :
      undefined;

    const value: WhatsappAPIValue = this.entry[0].changes[0].value;

    /** If contact is defined the message was received */
    if (contact) {
      return {
        storeMessage: true,
        received: true,
        contactPhoneNumber: contact.wa_id,
        value: value,
      };
    } else if (statuses && statuses.conversation) {
      /** If statuses is defined the message was sent from LonVi */
      /** Dont store message if status isn't sent */
      if (statuses.status != "sent") {
        return {storeMessage: false};
      }

      return {
        storeMessage: true,
        received: false,
        contactPhoneNumber: statuses.recipient_id,
        value: value,
      };
    } else {
      /** If neither then dont do anything */
      return {
        storeMessage: false,
      };
    }
  }

  public toString(): string {
    return JSON.stringify(this.toJson());
  }
}
