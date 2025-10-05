import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import headerImg from "../imgs/header.png";

const Header = () => {
  return (
    <ImageBackground
      source={headerImg}
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Best Online Learning System</Text>
          <Text style={styles.subtitle}>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </Text>

          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Read More
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
    height: 400,
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
