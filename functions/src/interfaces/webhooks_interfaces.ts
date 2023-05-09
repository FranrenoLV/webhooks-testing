export interface WhatsappAPIEntry {
  /** The WhatsApp Business Account ID for the business that is subscribed to the webhook. */
  id: string;
  /** An array of change objects. */
  changes: WhatsappAPIChange[];
}

export interface WhatsappAPIChange {
  /** A value object. Value will be messages. */
  field: string;
  /** Notification type. WhatsappAPIValue will be messages. */
  value: WhatsappAPIValue;
}

/** The value object contains details for the change that triggered the webhook. */
export interface WhatsappAPIValue {
  /** Product used to send the message. Value is always `whatsapp`. */
  messaging_product: string;
  /** A metadata object describing the business subscribed to the webhook. */
  metadata: WhatsappAPIMetadata;
  /** Array of contact objects with information for the customer who sent a message to the business. */
  contacts: WhatsappAPIContact[];
  /** Information about a message received by the business that is subscribed to the webhook. */
  messages: WhatsappAPIMessage[];
  /** An array of error objects describing the error. Error objects have the following properties, which map to their equivalent properties in {@link https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes API error response payloads}. */
  errors?: WhatsappAPIErrors[];
  /** Status object for a message that was sent by the business that is subscribed to the webhook. */
  statuses: WhatsappAPIStatuses[];
}

export interface WhatsappAPIErrors {
  /** Example: 130429. */
  code: number;
  /** Error code title. Example: Rate limit hit. */
  title: string;
}

export interface WhatsappAPIMetadata {
  /** The phone number that is displayed for a business. */
  display_phone_number: string;
  /** ID for the phone number. A business can respond to a message using this ID. */
  phone_number_id: string;
}

export interface WhatsappAPIContact {
  /** A customer profile object. */
  profile: {
    /** The customer's name. */
    name: string;
  };
  /** The customer's WhatsApp ID. A business can respond to a message using this ID. */
  wa_id: string;
}

export interface WhatsappAPIMessage {
  /** The customer's phone number who sent the message to the business. */
  from: string;
  /** The ID for the message that was received by the business. You could use {@link https://shorturl.at/wE569 messages endpoint} to mark this specific message as read. */
  id: string;
  /** Unix timestamp indicating when the WhatsApp server received the message from the customer. */
  timestamp: string;
  /** Only included when a user replies or interacts with one of your messages */
  context?: WhatsappAPIContext;
  /** An array of error objects describing the error. Error objects have the following properties, which map to their equivalent properties in {@link https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes API error response payloads}. */
  errors?: WhatsappAPIErrors[];
  /** The type of message that has been received by the business that has subscribed to Webhooks. */
  type:
    | "audio"
    | "button"
    | "document"
    | "text"
    | "image"
    | "interactive"
    | "sticker"
    | "video"
    | "unknown";
  text?: WhatsappAPIText;
  /** When the `messages type` is set to `audio`. */
  audio?: WhatsappAPIAudio;
  /** When the `messages type` field is set to `button`. */
  button?: WhatsappAPIButton;
  /** A document object. When `messages type` is set to `document`. */
  document?: WhatsappAPIDocument;
  /** When `messages type` is set to image */
  image?: WhatsappAPIImage;
  /** When a customer has interacted with your message. */
  interactive?: WhatsappAPIInteractive;
  /** When `messages type` is set to sticker */
  sticker?: WhatsappAPISticker;
  /** When `messages type` is set to video */
  video?: WhatsappAPIVideo;
}

/** The statuses object is nested within the value object and is
 *  triggered when a message is sent or delivered to a customer or
 *  the customer reads the delivered message sent by a business that
 *  is subscribed to the Webhooks. */
export interface WhatsappAPIStatuses {
  /** The ID for the message that the business that is subscribed to the webhooks sent to a customer */
  id: string;
  /** The WhatsApp ID for the customer that the business, that is subscribed to the webhooks, sent to the customer */
  recipient_id: string;
  /** Status of the message */
  status: "delivered" | "read" | "sent";
  /** Date for the status message */
  timestamp: string;
  /** Information about the conversation. */
  conversation: WhatsappAPIConversation;
  /** An array of error objects describing the error.  */
  errors?: WhatsappAPIErrors[];
}

export interface WhatsappAPIConversation {
  /** Represents the ID of the conversation the given status notification belongs to. */
  id: string;
  /**  Indicates who initiated the conversation */
  origin: {
    type: "business_initiated" | "customer_initiated" | "referral_conversion";
  };
  /** Date when the conversation expires. This field is only present for messages with a `status` set to `sent`. */
  expiration_timestamp: string;
}

export interface WhatsappAPIText {
  /** The text of the message. */
  body: string;
}

export interface WhatsappAPIAudio {
  /** ID for the audio file.*/
  id: string;
  /** Mime type of the audio file. */
  mime_type: string;
}

export interface WhatsappAPIButton {
  /** The payload for a button set up by the business that a customer clicked as part of an interactive message. */
  payload: string;
  /** Button text. */
  text: string;
}

export interface WhatsappAPIContext {
  /** Set to `true` if the message received by the business has been forwarded. */
  forwarded: boolean;
  /** Set to `true` if the message received by the business has been forwarded more than 5 times. */
  frequently_forwarded: boolean;
  /** The WhatsApp ID for the customer who replied to an inbound message. */
  from: string;
  /** The message ID for the sent message for an inbound reply. */
  id: string;
  /** Referred product object describing the product the user is requesting information about.
   *  You must parse this value if you support Product Enquiry Messages. */
  referred_product: {
    /** Unique identifier of the Meta catalog linked to the WhatsApp Business Account. */
    catalog_id: string;
    /** Unique identifier of the product in a catalog. */
    product_retailer_id: string;
  };
}

export interface WhatsappAPIDocument {
  /** Caption for the document, if provided. */
  caption?: string;
  /** Name for the file on the sender's device. */
  filename: string;
  /** SHA 256 hash. */
  sha256: string;
  /** _ Mime type of the document file. */
  mime_type: string;
  /** ID for the document. */
  id: string;
}

export interface WhatsappAPIImage {
  /** Caption for the image, if provided. */
  caption?: string;
  /** Image hash. */
  sha256: string;
  /** ID for the image. */
  id: string;
  /** Mime type for the image. */
  mime_type: string;
}

export interface WhatsappAPIInteractive {
  type: {
    /** Sent when a customer clicks a button. */
    button_reply?: {
      /** Unique ID of a button. */
      id: string;
      /** Title of a button. */
      title: string;
    };
    /** Sent when a customer selects an item from a list.  */
    list_reply?: {
      /** Unique ID of the selected list item. */
      id: string;
      /** Title of the selected list item. */
      title: string;
      /** Description of the selected row. */
      description: string;
    };
  };
}

export interface WhatsappAPISticker {
  /** image/webp. */
  mime_type: string;
  /** Hash for the sticker. */
  sha256: string;
  /** ID for the sticker. */
  id: string;
  /** Set to `true` if the sticker is animated; `false` otherwise. */
  animated: boolean;
}

export interface WhatsappAPIVideo {
  /** The caption for the video, if provided. */
  caption: string;
  /** The name for the file on the sender's device. */
  filename: string;
  /** The hash for the video. */
  sha256: string;
  /** The ID for the video. */
  id: string;
  /** The mime type for the video file. */
  mime_type: string;
}

export interface WhatsappAPIMediaData {
  messaging_product: "whatsapp";
  url: string;
  mime_type: string;
  sha256: string;
  file_size: string;
  id: string;
}

export type WhatsappAPIDatabaseModel = {
  /** Checks if the message should be stored in database. */
  storeMessage: boolean;
  /** Set to `true` if the message was received from user.
   * Otherwise is set to `false` if message was sent to user. */
  received?: boolean;
  /** Number from customer.  */
  contactPhoneNumber?: string;
  /** Messages field. */
  value?: WhatsappAPIValue;
};
