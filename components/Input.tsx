import { TextInput, StyleSheet, Text } from "react-native";
import { TextInputProps } from "react-native";

type inputProps = TextInputProps & { label: String }

export default function Input({ label, ...props }: inputProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        {...props}
      />
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  label: {
    display: "flex",
    gap: 4,
    paddingHorizontal: 6,
  },
})
