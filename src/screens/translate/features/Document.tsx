import Spinner from '@/components/Spinner';
import useUser from '@/store/useUser';
import { db, uploadDocdocument } from '@/utils/firebase';
import log from '@/utils/logger';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addDoc, collection } from 'firebase/firestore';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { jobDocument } from 'types';
import PickLang from '../utils/PickLang';
import { renderingAtom, titleAtom, uriAtom } from '../utils/atoms';

type Lang = "en" | "so" | "sv";

export default function TranslateDocument() {
  const currentUser = useUser(state => state.currentUser);

  const uri = useAtomValue(uriAtom);
  const title = useAtomValue(titleAtom);
  const setRendering = useSetAtom(renderingAtom);

  const [srcLang, setSrcLang] = useState<Lang>("en");
  const [targetLang, setTargetLang] = useState<Lang>("sv");
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadDoc = async () => {
    try {
      setIsLoading(true);
      const uid = currentUser?.uid as string;
      const path = await uploadDocdocument({ currentUser, title, uri }) as string;

      const colRef = collection(db, "users", uid, "jobs");
      const data: jobDocument = {
        title,
        path: path,
        srcLang,
        targetLang,
      }

      const result = await addDoc(colRef, data);
      log("Translate", result);
    } catch (err) {
      log("translate", err)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView tw="flex-1 justify-between m-2">
      <View tw="flex-row justify-between border p-3 rounded-md">
        <Text tw="text-xs">{title}</Text>
        <Ionicons name="close-sharp" size={18} onPress={() => setRendering("none")} />
      </View>

      <View>
        <Text> Source Language </Text>
        <PickLang value={srcLang} setValue={setSrcLang} />
        <Text> Target Language </Text>
        <PickLang value={targetLang} setValue={setTargetLang} />
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
  )
}
