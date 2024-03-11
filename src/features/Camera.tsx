import { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Camera, CameraType, AutoFocus } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function CameraComponent() {
  const [imageUri, setImageUri] = useState("");
  const cameraRef = useRef(null);

  const handleCameraCapture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets.at(0)?.uri as string;
        setImageUri(uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets.at(0)?.uri as string;
        setImageUri(uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={{ flex: 1 }} >
      {!imageUri ? (
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          type={CameraType.back}
          autoFocus={AutoFocus.auto}
        />
      ) : (
        <Image source={{ uri: imageUri }} style={{ flex: 1, marginBottom: 20 }} />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 50,
          }}
          onPress={handleCameraCapture}
        >
          <Text>Capture Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 50,
          }}
          onPress={handleImagePicker}
        >
          <Text>Choose Image</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}
