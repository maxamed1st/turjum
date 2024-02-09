import { StyleSheet, View } from 'react-native'
import React from 'react'

export default function Container({ children }: any) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: 'flex',
    justifyContent: "space-around",
  },
})
