import { Picker } from '@react-native-picker/picker'
import React from 'react'

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function PickLang({ value, setValue }: Props) {
  return (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue) => setValue(itemValue)}
      mode="dropdown"
    >
      <Picker.Item label="English" value="en" />
      <Picker.Item label="Somali" value="so" />
      <Picker.Item label="Swedish" value="sv" />
    </Picker>
  )
}
