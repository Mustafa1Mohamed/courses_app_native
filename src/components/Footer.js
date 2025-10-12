import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [direction, setDirection] = useState(i18n.language === "ar" ? "rtl" : "ltr");
  useEffect(() => {
      const handleLanguageChange = (lang) => {
        setDirection(lang === "ar" ? "rtl" : "ltr");
      };
  
      i18n.on("languageChanged", handleLanguageChange);
  
      return () => {
        i18n.off("languageChanged", handleLanguageChange);
      };
    }, [i18n]);
  return (
    <View style={[styles.footer, { direction }]}>
      {/* Logo & About */}
      <View style={styles.section}>
        <Text style={styles.logo}>
          <Text>{t("E-Learning")}</Text>
        </Text>
        <Text style={styles.text}>
          {t("The best platform to learn new skills online. Join us and start learning today!")}
        </Text>
        <Text style={styles.copy}>{t("© 2023 E-Learning. All rights reserved.")}</Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.heading}>{t("Contact Us")}</Text>
        <Text style={styles.text}>{t("Email")}: info@elearning.com</Text>
        <Text style={styles.text}>{t("Phone")}: (+88) 111 555 666</Text>
        <Text style={styles.text}>{t("Address")}: 40 Baria Street, New York, USA</Text>
      </View>

      {/* Follow Us Row at Bottom */}
      <View style={styles.followRow}>
        <Text style={styles.heading}>{t("Follow Us")}:</Text>
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

