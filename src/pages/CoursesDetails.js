import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import MyCard from "../components/MyCard";

function CoursesDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { course } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyCard course={course} showButton={false} />

      <View style={styles.btnContainer}>
        <Button
          mode="outlined"
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back
        </Button>
      </View>
    </ScrollView>
  );
}

export default CoursesDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  backButton: {
    width: "30%",
  },
});
