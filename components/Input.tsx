import { TextInput, StyleSheet, Text } from "react-native";
import { TextInputProps } from "react-native";

type inputProps = TextInputProps & { label: String }

export default function Input({ label, ...props }: inputProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...props}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
  },
  label: {
    display: "flex",
    gap: 4,
    paddingHorizontal: 6,
  },
})
