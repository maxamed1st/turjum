import useUser from '../store/useUser';
import { storage } from '../utils/firebase';
import log from "../utils/logger";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDocumentAsync } from 'expo-document-picker';
import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { translateProps } from '../../types';
import Spinner from '@/utils/Spinner';

export default function Translate(navigator: translateProps) {
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `users/${currentUser?.uid}/original/${title}`);
      const res = await uploadBytes(storageRef, blob);
      log("translate", res.ref.fullPath);
    } catch (err) {
      log("translate", err)
    } finally {
      setIsLoading(false);
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
            tw="w-full h-14 bg-black items-center justify-center p-3 rounded mt-auto"
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
          <View>
            <Text>OR</Text>
          </View>
          <View>
            <Ionicons name='camera' size={32} color="#f00" onPress={() => navigator.navigation.navigate("Camera")} />
          </View>
        </SafeAreaView >
      }
    </>
  )
}

