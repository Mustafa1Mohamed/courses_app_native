import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, Platform } from "react-native";
import {
  Card,
  Text,
  Button,
  ActivityIndicator,
  List,
  Surface,
  useTheme,
} from "react-native-paper";
import axios from "axios";
import { WebView } from "react-native-webview";

const More = ({ route, navigation }) => {
  const { id } = route.params;
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const { colors } = useTheme();

  const videoUrl =
    "https://www.youtube.com/embed/BiajDUFrw54?list=PLE-RRPPf3IM47sQNEgVFURcOkDconhXbv";

  useEffect(() => {
    axios
      .get(`https://retoolapi.dev/dL2nNn/data/${id}`)
      .then((res) => {
        setCourse(res.data);

        const generatedLessons = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Lesson ${i + 1}`,
          duration: `${10 + i * 2} min`,
          description: res.data.course_description || "No description available",
          isCompleted: false,
        }));

        setLessons(generatedLessons);
      })
      .catch((err) => console.log("API Error:", err));
  }, [id]);

  const handleWatchLesson = (lessonId) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
      )
    );
    setActiveLesson(lessonId);
  };

  if (!course) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 10 }}>Loading ...</Text>
      </SafeAreaView>
    );
  }

  const renderLesson = ({ item }) => {
    const isActive = activeLesson === item.id;
    return (
      <Card
        style={{
          marginVertical: 8,
          borderRadius: 12,
          ...(Platform.OS === "web"
            ? { boxShadow: "0px 2px 6px rgba(0,0,0,0.15)" }
            : { elevation: 3 }),
        }}
      >
        <List.Accordion
          title={item.title}
          description={item.duration}
          left={(props) => (
            <List.Icon
              {...props}
              icon={item.isCompleted ? "check-circle" : "book-open-variant"}
              color={item.isCompleted ? colors.primary : colors.secondary}
            />
          )}
        >
          <Card.Content>
            <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
              {item.description}
            </Text>

            {isActive && (
              <View
                style={{
                  height: 300,
                  marginBottom: 10,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {Platform.OS === "web" ? (
                  <iframe
                    src={videoUrl}
                    title="Lesson Video"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: 10,
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <WebView
                    source={{ uri: videoUrl }}
                    style={{ flex: 1 }}
                    javaScriptEnabled
                    allowsFullscreenVideo
                  />
                )}
              </View>
            )}

            <Button
              mode={item.isCompleted ? "outlined" : "contained"}
              onPress={() => handleWatchLesson(item.id)}
              disabled={item.isCompleted}
              icon={item.isCompleted ? "check" : "play"}
            >
              {item.isCompleted ? "Completed" : "Show Lesson"}
            </Button>
          </Card.Content>
        </List.Accordion>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Surface style={{ flex: 1, padding: 10, backgroundColor: colors.background }}>
        <FlatList
          ListHeaderComponent={
            <>
              <Card
                style={{
                  marginBottom: 15,
                  borderRadius: 12,
                  ...(Platform.OS === "web"
                    ? { boxShadow: "0px 2px 6px rgba(231, 214, 214, 0.15)" }
                    : { elevation: 3 }),
                }}
              >
                <Card.Cover source={{ uri: course.course_image }} />
                <Card.Title
                  title={course.course_name}
                  subtitle={course.course_plan}
                />
                <Card.Content>
                  <Text variant="bodyMedium">{course.course_description}</Text>
                </Card.Content>
              </Card>

              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  fontWeight: "bold",
                  color: colors.primary,
                }}
              >
                Lessons
              </Text>
            </>
          }
          data={lessons}
          renderItem={renderLesson}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListFooterComponent={
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate("MyCourses")}
              style={{
                marginVertical: 30,
                alignSelf: "center",
                width: "60%",
                borderRadius: 8,
              }}
            >
              Back
            </Button>
          }
        />
      </Surface>
    </SafeAreaView>
  );
};

export default More;
