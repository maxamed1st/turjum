import { log } from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { jobDocument } from "../types";
import { translateDocument } from "./translation";
import { config } from "dotenv"

//load .env variables to process.env
config();

export const handleTranslation = onDocumentCreated("users/{userId}/jobs", async (event) => {
  const id = event.data?.id;
  const data = event.data?.data() as jobDocument;

  const { path, srcLang, targetLang } = data

  log(`${id} has been created with data:`, data);

  const result = await translateDocument({
    inputUri: path,
    srcLang,
    targetLang,
    outputUriPrefix: path // use the same path for the result temporarly
  });

  log(result);
});
