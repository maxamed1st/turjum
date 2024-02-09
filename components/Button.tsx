import { Pressable, PressableProps, StyleSheet, Text, TextProps } from 'react-native'

type buttonProps = PressableProps & TextProps & { text: String }

export default function Button({ text, onPress }: buttonProps) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text} onPress={onPress}>{text}</Text>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    margin: 4,
  },
  text: {
    color: "white",
  },
})
