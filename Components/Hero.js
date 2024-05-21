import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const HeroImage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Gotcha_Header.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 8
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
});

export default HeroImage;
