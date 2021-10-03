import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Splash() {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/ic_splash.png')}
          style={styles.canvas}
          resizeMode="cover"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    height: '100%',
    width: '100%',
  },
});
