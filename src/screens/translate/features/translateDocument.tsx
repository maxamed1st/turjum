import Spinner from '@/components/Spinner';
import { styles } from '@/components/Styles';
import useUser from '@/store/useUser';
import { db, uploadDocdocument } from '@/utils/firebase';
import log from '@/utils/logger';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDocumentAsync } from 'expo-document-picker';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { jobDocument } from 'types';

export default function TranslateDocument() {
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

      const path = "gs:/ / turjum - cf6e9.appspot.com / users / AZ325DwXUDfwB4BpVmkwDxmolWa2 / original / documents / CVMohamedHassanAhmed.pdf";

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

  const handlePickDoc = async () => {
    const doc = await getDocumentAsync();
    const docName = doc.assets?.at(0)?.name as string;
    const uri = doc.assets?.at(0)?.uri as string;

    setTitle(docName);
    setUri(uri);
  }

  return (
    <>
      {title ?
        <SafeAreaView tw="flex-1 justify-between m-2">
          <View tw="flex-row justify-between border p-3 rounded-md">
            <Text tw="text-xs">{title}</Text>
            <Ionicons name="close-sharp" size={18} onPress={() => setTitle("")} />
          </View>

          <View style={styles.inputView}>
            <TextInput
              autoCapitalize="none"
              value={srcLang}
              style={styles.textInput}
              placeholder="source langauge..."
              placeholderTextColor="#000"
              onChangeText={(text) => setSrcLang(text.trim())}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              autoCapitalize="none"
              value={targetLang}
              style={styles.textInput}
              placeholder="target langauge..."
              placeholderTextColor="#000"
              onChangeText={(text) => setTargetLang(text.trim())}
            />
          </View>

          <Pressable
            onPress={handleUploadDoc}
            tw="w-full h-14 bg-black items-center justify-center p-3 rounded"
          >
            {isLoading ?
              <Spinner />
              :
              <Text tw="text-white">Turjum</Text>
            }
          </Pressable>
        </SafeAreaView >
        :
        <SafeAreaView tw="flex-1 items-center justify-evenly">
          <View>
            <Text tw="text-blue-600 text-center" onPress={handlePickDoc}>upload a document...</Text>
          </View>
        </SafeAreaView >
      }
    </>
  )
}
