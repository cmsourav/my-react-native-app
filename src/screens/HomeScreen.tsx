import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { searchImage } from '../api/unsplash';
import ImageCard from '../components/ImageCard';
import { UnsplashImage } from '../types/UnsplashTypes';
import RNFS from 'react-native-fs';

const HomeScreen = () => {
  const [query, setQuery] = useState('nature');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchImage(query);
      setImages(results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!selectedImage) return;

    try {
      const { regular } = selectedImage.urls;
      const fileName = `${Date.now()}.jpg`;
      const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const res = await RNFS.downloadFile({
        fromUrl: regular,
        toFile: path,
      }).promise;

      if (res.statusCode === 200) {
        Alert.alert('Download complete!', `Saved to ${path}`);
      } else {
        throw new Error('Download failed');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to download image.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
        />
        <TouchableOpacity onPress={fetchData} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageCard url={item.urls.small} onPress={() => setSelectedImage(item)} />
        )}
      />

      {/* MODAL */}
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          {selectedImage && (
            <>
              <Image source={{ uri: selectedImage.urls.regular }} style={styles.fullImage} />
              <Text style={styles.imageText}>By {selectedImage.user.name}</Text>
              <TouchableOpacity onPress={downloadImage} style={styles.downloadButton}>
                <Text style={styles.downloadText}>⬇ Download</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.closeButton}>
                <Text style={styles.downloadText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  searchRow: { flexDirection: 'row', marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: { color: '#fff' },
  error: { color: 'red', textAlign: 'center', marginTop: 10 },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000dd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageText: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
  },
  downloadText: {
    color: '#fff',
    fontSize: 16,
  },
});
