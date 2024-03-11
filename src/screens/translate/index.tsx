import { Ionicons } from '@expo/vector-icons';
import { getDocumentAsync } from 'expo-document-picker';
import { atom, useAtom } from 'jotai';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import CameraComponent from './features/Camera';
import TranslateDocument from './features/Document';

type renderingType = "none" | "document" | "camera";

const renderingAtom = atom<renderingType>("none")

export const titleAtom = atom("");
export const uriAtom = atom("");

export default function Translate() {
  const [rendering, setRendering] = useAtom(renderingAtom);
  const setTitle = useAtom(titleAtom)[1];
  const setUri = useAtom(uriAtom)[1];

  const handlePickDocument = async () => {
    const doc = await getDocumentAsync();
    const docName = doc.assets?.at(0)?.name as string;
    const uri = doc.assets?.at(0)?.uri as string;

    setTitle(docName);
    setUri(uri);

    setRendering("document");
  }

  return (
    <>
      {rendering == "none" ?
        <SafeAreaView tw="flex-1 items-center justify-evenly">
          < View >
            <Text tw="text-blue-600 text-center" onPress={handlePickDocument}>upload a document...</Text>
          </View >

          <View>
            <Text>OR</Text>
          </View>

          <View>
            <Ionicons name='camera' size={32} color="#f00" onPress={() => setRendering("camera")} />
          </View>
        </SafeAreaView >
        :
        rendering == "document" ?
          <TranslateDocument />
          :
          <CameraComponent />
      }
    </>
  )
}
