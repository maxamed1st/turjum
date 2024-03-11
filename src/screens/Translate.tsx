import TranslateDocument from '@/features/TranslateDocument';
import useUser from '@/store/useUser';
import { db, uploadDocdocument } from '@/utils/firebase';
import log from "@/utils/logger";
import Ionicons from '@expo/vector-icons/Ionicons';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { jobDocument, translateProps } from 'types';

export default function Translate(navigator: translateProps) {
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState("");
  const [srcLang, setSrcLang] = useState("");
  const [targetLang, setTargetLang] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useUser(state => state.currentUser);

  const handleUploadDoc = async () => {
    try {
      setIsLoading(true);
      const uid = currentUser?.uid as string;
      //const path = await uploadDocdocument({ currentUser, title, uri }) as string;

      const colRef = collection(db, "users", uid, "jobs");

      const path = "gs://turjum-cf6e9.appspot.com/users/AZ325DwXUDfwB4BpVmkwDxmolWa2/original/documents/CVMohamedHassanAhmed.pdf";


      const data: jobDocument = {
        title,
        path: path,
        srcLang,
        targetLang,
        credit: 0
      }

      const result = await addDoc(colRef, data);
      log("Translate", result);
    }

    catch (err) {
      log("translate", err)
    } finally {
      setIsLoading(false);
    }
  }

  const translateDocumentProps = {
    title,
    setTitle,
    srcLang,
    setSrcLang,
    targetLang,
    setTargetLang,
    handleUploadDoc,
    isLoading,
    setUri
  }

  return (
    <>
      <SafeAreaView tw="flex-1 items-center justify-evenly">
        <TranslateDocument {...translateDocumentProps} />

        {!uri &&
          <>
            <View>
              <Text>OR</Text>
            </View>
            <View>
              <Ionicons name='camera' size={32} color="#f00" onPress={() => navigator.navigation.navigate("Camera")} />
            </View>
          </>
        }
      </SafeAreaView >
    </>
  )
}
