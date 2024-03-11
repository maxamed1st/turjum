import * as admin from "firebase-admin"
import { log } from "firebase-functions/logger";
import { onDocumentCreated, onDocumentWritten } from "firebase-functions/v2/firestore";

admin.initializeApp();

export const translation = onDocumentCreated("users/{userId}/", async (event) => {
  const data = event.data?.data();
  const id = event.data?.id;

  log(`${id} has been created with data:`, data);
});

export const rn = onDocumentWritten("users/{userId}//jobs/", async () => {
  log(`new data:`);
});
