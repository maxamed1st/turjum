import * as admin from "firebase-admin"
import { log } from "firebase-functions/logger";
import { onDocumentCreated, onDocumentWritten } from "firebase-functions/v2/firestore";

admin.initializeApp();

export const handleDocument = onDocumentCreated("users/{userId}/jobs", async (event) => {
  const data = event.data?.data();
  const id = event.data?.id;

  log(`${id} has been created with data:`, data);
});

export const handleImage = onDocumentWritten("users/{userId}/jobs", async () => {
  log(`new data:`);
});
