import { SafeAreaView, ScrollView } from 'react-native'

export default function Container({ children }: any) {
  return (
    <>
      <ScrollView>
        <SafeAreaView>
          {children}
        </SafeAreaView>
      </ScrollView>
    </>
  )
}

