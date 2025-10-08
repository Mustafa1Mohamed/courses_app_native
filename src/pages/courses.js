import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";
import MyCard from "../components/MyCard";
import { useTranslation } from "react-i18next";

function Courses() {
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
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const coursesPerPage = 6;
  const API_URL = "https://retoolapi.dev/dL2nNn/data";

  const fetchCourses = async (page, query = "") => {
    try {
      const url = query
        ? `${API_URL}?course_name_like=${query}`
        : `${API_URL}?_page=${page}&_limit=${coursesPerPage}`;

      const res = await axios.get(url);
      setCourses(res.data);

      const totalItems = res.headers["x-total-count"];
      if (totalItems) {
        setTotalPages(Math.ceil(totalItems / coursesPerPage));
      } else if (query) {
        setTotalPages(1);
      }
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("Courses")}</Text>

      <TextInput
        placeholder={t("Search courses...")}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={styles.input}
      />

      {courses.length > 0 ? (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyCard course={item} />}
        />
      ) : (
        <Text style={styles.noCourses}>{t("No courses found.")}</Text>
      )}

      {totalPages > 1 && (
        <View style={[styles.pagination, { flexDirection: direction === "rtl" ? "row-reverse" : "row" }]}>
          <Button
            mode="outlined"
            onPress={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={styles.pageButton}
          >
            {t("Previous")}
          </Button>

          <Text style={{ ...styles.pageText, writingDirection: direction }}>{`${currentPage} / ${totalPages}`}</Text>

          <Button
            mode="outlined"
            onPress={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={styles.pageButton}
          >
            {t("Next")}
          </Button>
        </View>
      )}
    </View>
  );
}

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  noCourses: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  pageButton: {
    marginHorizontal: 5,
  },
  pageText: {
    marginHorizontal: 8,
  },
});

