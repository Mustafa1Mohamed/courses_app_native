import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* Logo & About */}
      <View style={styles.section}>
        <Text style={styles.logo}>
          <Text>E-Learning</Text>
        </Text>
        <Text style={styles.text}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia mollit anim id est laborum.
        </Text>
        <Text style={styles.copy}>© 2025 All rights reserved</Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.text}>Email: info@elearning.com</Text>
        <Text style={styles.text}>Phone: (+88) 111 555 666</Text>
        <Text style={styles.text}>Address: 40 Baria Street, New York, USA</Text>
      </View>

      {/* Follow Us Row at Bottom */}
      <View style={styles.followRow}>
        <Text style={styles.heading}>Follow Us:</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
            <FontAwesome name="facebook" size={18} color="#4f46e5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
            <FontAwesome name="instagram" size={18} color="#4f46e5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
            <FontAwesome name="twitter" size={18} color="#4f46e5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f3f4f6",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 40,
  },
  section: {
    marginBottom: 15,
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginRight: 10,
  },
  text: {
    color: "#555",
    fontSize: 13,
    marginBottom: 2,
  },
  copy: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },
  followRow: {
    flexDirection: "row",
    alignItems: "center",
    
    
    paddingTop: 10,
    marginTop: 10,
    gap: 10,
  },
  socialRow: {
    flexDirection: "row",
    gap: 15,
  },
});

export default Footer;

