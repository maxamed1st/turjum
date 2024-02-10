import { StyleSheet, SafeAreaView } from 'react-native'

export default function Container({ children }: any) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: 'flex',
    justifyContent: "space-around",
  },
})
