import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const AboutUs = () => {
  const videoUrl = 'https://www.youtube.com/embed/ArBS88h1r2Q';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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
        <Text style={styles.title}>About Our E-Learning App</Text>

        <Text style={styles.paragraph}>
          Welcome to our E-Learning platform — a place to discover practical, career-focused courses taught by industry professionals. Our mission is to make high-quality learning accessible, flexible, and effective for learners at every level.
        </Text>

        <Text style={styles.heading}>Features</Text>
        <Text style={styles.paragraph}>
          • Online courses (free & paid){"\n"}• Secure payment using PayPal{"\n"}• Interactive chatbot support{"\n"}
        </Text>

        <Text style={styles.heading}>Contact & Support</Text>
        <Text style={styles.paragraph}>
          For support, feedback or partnership inquiries, email us at:
        </Text>
        <Text style={styles.contact}>support@elearning.example.com</Text>

        <Text style={styles.footer}>Thank you for learning with us — keep growing!</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  video: {
    height: 300,
    borderRadius: 6,
  },
  content: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  contact: {
    marginTop: 6,
    fontSize: 14,
    color: '#1a73e8',
  },
  footer: {
    marginTop: 18,
    fontSize: 13,
    color: '#666',
  },
});

export default AboutUs;



