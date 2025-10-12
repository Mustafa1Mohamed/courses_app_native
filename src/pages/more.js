import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Card,
  Text,
  Button,
  ActivityIndicator,
  List,
} from "react-native-paper";
import axios from "axios";
import { WebView } from "react-native-webview";

const More = ({ route, navigation }) => {
  const { id } = route.params;
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const videoUrl =
    "https://www.youtube.com/embed/BiajDUFrw54?list=PLE-RRPPf3IM47sQNEgVFURcOkDconhXbv";

  useEffect(() => {
    axios
      .get(`https://retoolapi.dev/dL2nNn/data/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log("API Error:", err));

    const generatedLessons = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Lession${i + 1}`,
      duration: `${10 + i * 2} Min`,
      description: "course.course_description",
      isCompleted: false,
    }));

    setLessons(generatedLessons);
  }, [id]);

  const handleComplete = (lessonId) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
      )
    );
  };

  const toggleExpand = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    setActiveVideo(null);
  };

  const showAndExpand = (lessonId) => {
    setExpandedLesson(lessonId);
    setActiveVideo(lessonId);
  };

  if (!course) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 10 }}>loading ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        {/*enroll courses*/}
        <Card style={styles.courseCard}>
          <Card.Cover source={{ uri: course.course_image }} />
          <Card.Content>
            <Text variant="titleLarge" style={styles.courseTitle}>
              {course.course_name}
            </Text>
            <Text variant="bodyMedium">{course.course_plan}</Text>
            <Text variant="bodySmall" style={{ marginTop: 5 }}>
              {course.course_description}
            </Text>
          </Card.Content>
        </Card>

        {/* الدروس */}
        <Text variant="titleMedium" style={styles.lessonsTitle}>
          الدروس
        </Text>

        {lessons.map((lesson) => {
          const expanded = expandedLesson === lesson.id;
          const showLessonVideo = activeVideo === lesson.id;

          return (
            <Card key={lesson.id} style={{ marginBottom: 10 }}>
              <List.Accordion
                title={lesson.title}
                description={lesson.duration}
                expanded={expanded}
                onPress={() => toggleExpand(lesson.id)}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={lesson.isCompleted ? "check-circle" : "book"}
                    color={lesson.isCompleted ? "green" : "#6200ee"}
                  />
                )}
              >
                <Card.Content>
                  <Text variant="bodyMedium">{lesson.description}</Text>

                  {!showLessonVideo ? (
                    <Button
                      mode="contained"
                      onPress={() => showAndExpand(lesson.id)}
                      style={{ marginTop: 10 }}
                    >
                      show
                    </Button>
                  ) : Platform.OS === "web" ? (
                    <View style={styles.webVideoContainer}>
                      <iframe
                        src={videoUrl}
                        title="Lesson Video"
                        style={styles.webVideo}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </View>
                  ) : (
                    <WebView
                      source={{ uri: videoUrl }}
                      style={styles.video}
                      javaScriptEnabled
                      allowsFullscreenVideo
                      nestedScrollEnabled={true}
                      scrollEnabled={false}
                    />
                  )}

                  <Button
                    mode="outlined"
                    onPress={() => handleComplete(lesson.id)}
                    disabled={lesson.isCompleted}
                    style={{ marginTop: 5 }}
                  >
                    {lesson.isCompleted ? "Done" : "Start"}
                  </Button>
                </Card.Content>
              </List.Accordion>
            </Card>
          );
        })}

        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate("MyCourses")}
          style={{ marginVertical: 20 }}
        >
          Back
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  courseCard: {
    marginBottom: 15,
  },
  courseTitle: {
    marginVertical: 8,
  },
  lessonsTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  video: {
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  webVideoContainer: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  webVideo: {
    width: "100%",
    height: "100%",
    border: "none",
  },
});

export default More;
