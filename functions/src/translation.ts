import { TranslationServiceClient } from "@google-cloud/translate";

type translationProps = {
  inputUri: string,
  srcLang: string,
  targetLang: string,
  outputUriPrefix: string,
}

export async function translateDocument(
  { inputUri,
    srcLang,
    targetLang,
    outputUriPrefix
  }: translationProps
) {
  // Instantiates a client
  const translationClient = new TranslationServiceClient();
  const projectId = process.env.projectId;
  const location = process.env.LOCATION;

  const documentInputConfig = {
    gcsSource: {
      inputUri,
    },
  }

  const docuementOutputConfig = {
    gcsDestination: {
      outputUriPrefix
    }
  }

  // Construct request
  const request = {
    parent: translationClient.locationPath(projectId, location),
    documentInputConfig: documentInputConfig,
    docuementOutputConfig: docuementOutputConfig,
    sourceLanguageCode: srcLang,
    targetLanguageCode: targetLang,
  };

  // Run request
  const [response] = await translationClient.translateDocument(request);

  return response;
}
