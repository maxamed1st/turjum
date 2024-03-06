import useUser from '../store/useUser';
import { storage } from '../utils/firebase';
import log from "../utils/logger";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDocumentAsync } from 'expo-document-picker';
import { StatusBar } from 'expo-status-bar';
import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { translateProps } from '../../types';

export default function Translate(navigator: translateProps) {
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState("");
  const currentUser = useUser(state => state.currentUser);

  const handlePickDoc = async () => {
    const doc = await getDocumentAsync();
    const docName = doc.assets?.at(0)?.name as string;
    const uri = doc.assets?.at(0)?.uri as string;

    setTitle(docName);
    setUri(uri);
  }

  const handleUploadDoc = async () => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `users/${currentUser?.uid}/original/${title}`);
      const res = await uploadBytes(storageRef, blob);
      log("translate", res.ref.fullPath);
    } catch (err) {
      log("translate", err)
    }
  }

  return (
    <>
      {title ?
        <SafeAreaView tw="flex-1 justify-start m-2">
          <View tw="flex-row justify-between border p-3 rounded-md">
            <Text tw="text-xs">{title}</Text>
            <Ionicons name="close-sharp" size={18} onPress={() => setTitle("")} />
          </View>

          <Pressable
            onPress={handleUploadDoc}
            tw="w-['100%'] bg-blue-500 items-center py-3 px-3 mt-auto rounded"
          >
            <Text tw="text-white">Turjum</Text>
          </Pressable>
        </SafeAreaView >
        :

        <SafeAreaView tw="flex-1 items-center justify-evenly">
          <View>
            <Text tw="text-blue-600 text-center" onPress={handlePickDoc}>upload a document...</Text>
          </View>
          <View>
            <Text>OR</Text>
          </View>
          <View>
            <Ionicons name='camera' size={32} color="#f00" onPress={() => navigator.navigation.navigate("Camera")} />
          </View>
        </SafeAreaView >
      }
      <StatusBar style='dark' />
    </>
  )
}

