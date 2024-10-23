import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import useGlobalStorage from '@/src/hooks/useGlobalStorage';

export default function ExportDetail() {
  const { data, loading, error } = useGlobalStorage('html');

  if ( loading ) {
    return (
      <ActivityIndicator color={"#cecece"} size="large" />
    )
  }

  return (
    <View style={styles.container}>
      <iframe
        srcDoc={data}
        style={styles.mapIframe}
        title="Map"
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapIframe: {
    flex: 1,
    border: 'none',
  },
});
