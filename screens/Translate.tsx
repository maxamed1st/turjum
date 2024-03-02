import useUser from '@/store/useUser';
import { storage } from '@/utils/firebase';
import log from "@/utils/logger";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDocumentAsync } from 'expo-document-picker';
import { StatusBar } from 'expo-status-bar';
import { ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn';

export default function Translate() {
  const tailwind = useTailwind();
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
        <SafeAreaView style={tailwind("flex-1 justify-start p-2")}>
          <Text style={tailwind("text-xs border py-3 px-3 rounded-md")}>{title}</Text>
          <Pressable
            onPress={handleUploadDoc}
            style={tailwind("w-['100%'] bg-blue-500 items-center py-3 px-3 mt-auto rounded")}
          >
            <Text style={tailwind("text-white")}>Turjum</Text>
          </Pressable>
        </SafeAreaView>
        :

        <SafeAreaView style={tailwind("flex-1 justify-center items-center")}>
          <View>
            <Text style={tailwind("text-blue-600 text-center")} onPress={handlePickDoc}>upload a document...</Text>
          </View>
          <View> <Text>OR</Text> </View>
          <View>
            <Text> <Ionicons name='camera' /> </Text>
          </View>
        </SafeAreaView>
      }
      <StatusBar style='dark' />
    </>
  )
}

