import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MyCard = ({ course, showButton = true }) => {
  const navigation = useNavigation();
  const [isFav, setIsFav] = useState(false);

  const handlePress = () => {
    navigation.navigate("CoursesDetails", { course });
  };

  const toggleFavorite = () => {
    setIsFav(!isFav);
  };

  return (
    <Card style={styles.card}>
      
      <View style={styles.imageContainer}>
        <Card.Cover source={{ uri: course.course_image }} style={styles.image} />
        <IconButton
          icon="heart"
          iconColor={isFav ? "red" : "gray"}
          size={24}
          onPress={toggleFavorite}
          style={styles.favoriteIcon}
        />
      </View>

      
      <Card.Content style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{course.course_name}</Text>
          {showButton && (
            <Button mode="contained" onPress={handlePress} style={styles.viewButton}>
              View Details
            </Button>
          )}
        </View>

        <Text style={styles.plan}>{course.course_plan}</Text>
        <Text style={styles.price}>${course.course_price}</Text>
      </Card.Content>
    </Card>
  );
};

export default MyCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    height: 180,
  },
  favoriteIcon: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "white",
    borderRadius: 20,
  },
  content: {
    padding: 15,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  plan: {
    color: "gray",
    marginVertical: 4,
  },
  price: {
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 10,
  },
  viewButton: {
    height: 40,
    justifyContent: "center",
  },
});

