import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyCard from "./MyCard";
import axios from "axios";
import { useTranslation } from "react-i18next";

const FeaturedCourses = () => {
  const { t , i18n} = useTranslation();
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation(); 

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

  useEffect(() => {
    axios
      .get("https://retoolapi.dev/dL2nNn/data")
      .then((res) => setCourses(res.data.slice(0, 2)))
      .catch((err) => console.log("API Error:", err));
  }, []);

  return (
    <View style={[styles.container, { direction }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t("Featured Courses")}</Text>
        <TouchableOpacity
          style={styles.allCoursesBtn}
          onPress={() => navigation.navigate("Courses")} 
        >
          <Text style={styles.allCoursesText}>{t("All Courses")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsGrid}>
        {courses.map((course) => (
          <MyCard key={course.id} course={course} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 45,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  allCoursesBtn: {
    borderWidth: 1,
    borderColor: "#4f46e5",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  allCoursesText: {
    color: "#4f46e5",
    fontWeight: "600",
  },
  cardsGrid: {
    gap: 16,
  },
});

export default FeaturedCourses;


