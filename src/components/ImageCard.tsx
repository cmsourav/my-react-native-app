import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface Props {
  url: string;
  onPress: () => void;
}

const ImageCard = ({ url, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image source={{uri: url}} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    margin: '1%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    height: 150,
    width: '100%',
  },
});
