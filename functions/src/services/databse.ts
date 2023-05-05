import * as admin from "firebase-admin";
import {Logger} from "../helpers/logger";

export {FirestoreDatabase};

class FirestoreDatabase {
  private static instance: FirestoreDatabase;

  public static getInstance() {
    if (!FirestoreDatabase.instance) {
      FirestoreDatabase.instance = new FirestoreDatabase();
    }
    return FirestoreDatabase.instance;
  }

  public async getCollectionDocument(
    rootCollection: string,
    documentId: string
  ): Promise<Result<FirebaseFirestore.DocumentData, Error>> {
    try {
      return await admin
        .firestore()
        .collection(rootCollection)
        .doc(documentId)
        .get()
        .then((documentSnapshot) => {
          if (!documentSnapshot.exists) {
            return {ok: false, error: Error("Document does not exists")};
          }
          return {ok: true, value: documentSnapshot.data()!};
        });
    } catch (error: any) {
      Logger.error(error);
      return {ok: false, error: Error("Unhandled error")};
    }
  }

  public async getAllDocumentsFromCollection(
    rootCollection: string
  ): Promise<Result<FirebaseFirestore.DocumentData[], Error>> {
    try {
      return admin
        .firestore()
        .collection(rootCollection)
        .get()
        .then((querySnpshot) => {
          return {
            ok: true,
            value: querySnpshot.docs.map((queryDocumentSnapshot) => {
              return queryDocumentSnapshot.data()!;
            }),
          };
        });
    } catch (error) {
      Logger.error(error);
      return {ok: false, error: Error("Unhandled error")};
    }
  }

  public async updateCollectionDocument(
    rootCollection: string,
    documentId: string,
    updateData: Record<string, any>
  ): Promise<Result<string, Error>> {
    try {
      await admin
        .firestore()
        .collection(rootCollection)
        .doc(documentId)
        .update(updateData);
    } catch (error) {
      return {ok: false, error: Error("Unhandled error")};
    }
    return {
      ok: true,
      value: `Document @ ${rootCollection}/${documentId} updated`,
    };
  }

  public async setCollectionDocument(
    rootCollection: string,
    updateData: Record<string, any>
  ): Promise<Result<string, Error>> {
    try {
      await admin.firestore().collection(rootCollection).doc().set(updateData);
    } catch (error) {
      return {ok: false, error: Error("Unhandled error")};
    }
    return {
      ok: true,
      value: `Document @ ${rootCollection} setted`,
    };
  }
}
