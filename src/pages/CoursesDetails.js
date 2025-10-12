import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import MyCard from "../components/MyCard";
import { enrollCourse } from "../../Store/EnrolledCoursesSlice";

function CoursesDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { course } = route.params;

  const isEnrolled = useSelector((state) =>
    state.EnrolledCoursesReducer.enrolled.find((c) => c.id === course.id)
  );

  const handleEnroll = () => {
    dispatch(enrollCourse(course));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyCard course={course} showButton={false} />

      <View style={styles.btnContainer}>
        {!isEnrolled ? (
          <Button
            mode="contained"
            icon="book"
            onPress={handleEnroll}
            style={styles.enrollButton}
          >
            Enroll Now
          </Button>
        ) : (
          <Button
            mode="contained-tonal"
            icon="check"
           onPress={() =>
              navigation.navigate("All Courses", { screen: "MyCourses" })
            }
            style={styles.enrolledButton}
          >
            Go to My Courses
          </Button>
        )}
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
