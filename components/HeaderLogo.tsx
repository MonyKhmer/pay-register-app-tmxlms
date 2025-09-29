
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface HeaderLogoProps {
  size?: number;
}

export function HeaderLogo({ size = 32 }: HeaderLogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/final_quest_240x240.png')}
        style={[styles.logo, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderRadius: 4,
  },
});
