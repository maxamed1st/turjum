import { DocumentPickerResult, getDocumentAsync } from 'expo-document-picker';
import FormData from 'form-data';
import axios from "axios";
import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Constants from 'expo-constants';

export default function Translate() {
  const tailwind = useTailwind();
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState<DocumentPickerResult>();

  const handleUpload = async () => {
    const doc = await getDocumentAsync();
    const docName = doc.assets ? doc.assets[0].name : "";
    setTitle(docName);
    setDoc(doc);
  }

  const handleTranslation = async () => {
    try {
      const url = Constants?.expoConfig?.extra?.URL
      const payload = new FormData();

      payload.append("file", {
        name: doc?.assets?.at(0)?.name,
        uri: doc?.assets?.at(0)?.uri,
        type: doc?.assets?.at(0)?.mimeType,
      });

      const result = await axios.postForm(url, payload);
      const status = result.status;
      const res = await result.data;

      console.log("TRANSLATE: ", status, "\n", res);
    } catch (err) {
      console.error("TRANSLATE: ", err)
    }
  }

  return (
    <>
      {title ?
        <View style={tailwind("flex-1 justify-start p-2")}>
          <Text style={tailwind("text-xs border py-3 px-3 rounded-md")}>{title}</Text>
          <Pressable
            onPress={handleTranslation}
            style={tailwind("w-['100%'] bg-blue-500 items-center py-3 px-3 mt-auto rounded")}
          >
            <Text style={tailwind("text-white")}>Turjum</Text>
          </Pressable>
        </View>
        :
        <View style={tailwind("flex-1 justify-center")}>
          <Text style={tailwind("text-blue-600 text-center")} onPress={handleUpload}>upload a document...</Text>
        </View>
      }
    </>
  )
}

