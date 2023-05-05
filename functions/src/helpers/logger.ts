import * as functions from "firebase-functions";

export class Logger {
  public static debug(msg: any) {
    functions.logger.debug(msg);
  }
  public static error(msg: any) {
    functions.logger.error(msg);
  }
  public static log(msg: any) {
    functions.logger.log(msg);
  }
  public static info(msg: any) {
    functions.logger.info(msg);
  }
  public static warn(msg: any) {
    functions.logger.warn(msg);
  }
}
