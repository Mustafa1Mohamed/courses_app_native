import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import headerImg from "../imgs/header.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  return (
    <ImageBackground
      source={headerImg}
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{t("Best Online Learning System")}</Text>
          <Text style={styles.subtitle}>
            {t("Here where you can find the best courses for you to build your career and learn new skills  online. Join us and start learning today!")}
          </Text>

          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            {t("Read More")}
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 450,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    color: "#ddd",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6366F1",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
