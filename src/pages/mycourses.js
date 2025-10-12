import React, { useState } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { Text, Card, Button, Dialog, Portal, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { enrollCourse, unenrollCourse } from "../../Store/EnrolledCoursesSlice.js";


const MyCourses = () => {
  const courses = useSelector((state) => state.EnrolledCoursesReducer.enrolled);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openDialog = (course) => {
    setSelectedCourse(course);
    setVisible(true);
  };

  const closeDialog = () => {
    setSelectedCourse(null);
    setVisible(false);
  };

  const handleConfirmUnenroll = () => {
    if (selectedCourse) {
      dispatch(unenrollCourse(selectedCourse));
      closeDialog();
    }
  };

  const renderCourse = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate("More", { id: item.id })}>
      <Card.Cover source={{ uri: item.course_image }} style={styles.image} />
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {item.course_name}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained-tonal"
          buttonColor="#ef4444"
          textColor="white"
          onPress={() => openDialog(item)}
        >
          Unenroll
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        My Courses
      </Text>

      {courses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="titleMedium" style={styles.emptyText}>
            No courses enrolled yet
          </Text>
          <Text variant="bodyMedium" style={styles.subText}>
            Start enrolling to see your courses here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Dialog (Modal) */}
      <Portal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to unenroll from this course?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirmUnenroll} textColor="#ef4444">
              Yes
            </Button>
            <Button onPress={closeDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MyCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 70,
    paddingHorizontal: 16,
  },
  header: {
    textAlign: "center",
    color: "#4f46e5",
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    height: 130,
  },
  title: {
    marginTop: 8,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyText: {
    color: "#6b7280",
  },
  subText: {
    color: "#9ca3af",
    marginTop: 4,
  },
});
