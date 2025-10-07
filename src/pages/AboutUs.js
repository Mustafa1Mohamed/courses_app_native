import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const AboutUs = () => {
  const videoUrl = 'https://www.youtube.com/embed/ArBS88h1r2Q';

  return (
    <View style={styles.container}>
     
      {Platform.OS === 'web' ? (
        <iframe
          width="100%"
          height="300"
          src={videoUrl}
          title="About Us Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={styles.video}
        ></iframe>
      ) : (
        <WebView
          style={styles.video}
          source={{ uri: videoUrl }}
          javaScriptEnabled
          allowsFullscreenVideo
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  video: {
    height: 300,
    borderRadius: 6,
  },
});

export default AboutUs;

