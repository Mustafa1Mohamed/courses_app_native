// // src/pages/adminpanel/AdminPanel.js
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   Image,
//   Alert,
//   ScrollView,
// } from "react-native";
// import {
//   Button,
//   TextInput,
//   Card,
//   Paragraph,
//   Title,
//   Dialog,
//   Portal,
//   Snackbar,
//   ActivityIndicator,
//   IconButton,
//   useTheme,
// } from "react-native-paper";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useTranslation } from "react-i18next";
// // import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';


// // Optional image picker
// let ImagePickerModule = null;
// try {
//   ImagePickerModule = require("expo-image-picker");
// } catch (e) {
//   ImagePickerModule = null;
// }

// const API_URL = "https://retoolapi.dev/dL2nNn/data";
// const COURSES_PER_PAGE = 10;

// export default function AdminPanel({ navigation }) {
//   const { t } = useTranslation();
//   const paperTheme = useTheme();

//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [errorMsg, setErrorMsg] = useState(null);
//   const [successMsg, setSuccessMsg] = useState(null);

//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [pendingDeleteId, setPendingDeleteId] = useState(null);

//   const [courseData, setCourseData] = useState({
//     course_name: "",
//     course_plan: "",
//     course_price: "",
//     course_image: "",
//     course_description: "",
//   });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Check if admin is stored
//   useEffect(() => {
//     (async () => {
//       try {
//         const userData = await AsyncStorage.getItem("currentUser");
// if (!userData) {
//   Alert.alert(
//     t("Not authenticated"),
//     t("You must login first."),
//     [
//       {
//         text: t("OK"),
//         onPress: () => navigation.navigate("login"),
//       },
//     ]
//   );
//   return;
// }

// const user = JSON.parse(userData);
// if (user.username !== "admin") {
//   Alert.alert(
//     t("Access Denied"),
//     t("You are not authorized to access this page."),
//     [
//       {
//         text: t("OK"),
//         onPress: () => navigation.navigate("All Courses"),
//       },
//     ]
//   );
//   return;
// }
//       } catch (err) {
//         console.warn("AsyncStorage error:", err);
//         setErrorMsg(t("Storage error"));
//       }
//     })();
//   }, []);

//   const fetchCourses = async (page = 1, query = "") => {
//     setLoading(true);
//     try {
//       const url = query
//         ? `${API_URL}?course_name_like=${encodeURIComponent(query)}&_page=${page}&_limit=${COURSES_PER_PAGE}`
//         : `${API_URL}?_page=${page}&_limit=${COURSES_PER_PAGE}`;

//       const res = await axios.get(url);
//       setCourses(res.data || []);

//       const totalRaw =
//         res.headers["x-total-count"] || res.headers["X-Total-Count"];
//       const totalItems = totalRaw ? parseInt(totalRaw, 10) : (res.data?.length || 0);
//       setTotalPages(Math.max(1, Math.ceil(totalItems / COURSES_PER_PAGE)));
//     } catch (err) {
//       console.warn("fetchCourses err", err);
//       setErrorMsg(t("Failed to fetch courses"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses(currentPage, searchTerm);
//   }, [currentPage, searchTerm]);

//   const updateField = (name, value) => {
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//   };

//   const pickImageFromDevice = async () => {
//     if (!ImagePickerModule) {
//       setErrorMsg(t("Image picker not installed"));
//       return;
//     }
//     try {
//       const perm = await ImagePickerModule.requestMediaLibraryPermissionsAsync();
//       if (!perm.granted) {
//         setErrorMsg(t("Permission to access media is required"));
//         return;
//       }
//       const res = await ImagePickerModule.launchImageLibraryAsync({
//         mediaTypes: ImagePickerModule.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 0.7,
//       });
//       if (res.canceled) return;
//       const uri = res.assets && res.assets.length > 0 ? res.assets[0].uri : res.uri;
//       if (uri) updateField("course_image", uri);
//     } catch (err) {
//       console.warn("pickImage error", err);
//       setErrorMsg(t("Error picking image"));
//     }
//   };

//   const handleAdd = async () => {
//     if (
//       !courseData.course_name ||
//       !courseData.course_price ||
//       !courseData.course_plan ||
//       !courseData.course_image ||
//       !courseData.course_description
//     ) {
//       setErrorMsg(t("Please fill in all fields"));
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(API_URL, courseData);
//       setSuccessMsg(t("Course added successfully"));
//       setCourseData({
//         course_name: "",
//         course_plan: "",
//         course_price: "",
//         course_image: "",
//         course_description: "",
//       });
//       fetchCourses(currentPage, searchTerm);
//       setDialogVisible(false);
//     } catch (err) {
//       console.warn("handleAdd err", err);
//       setErrorMsg(t("Error adding course"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startEdit = (course) => {
//     setEditingId(course.id);
//     setCourseData({
//       course_name: course.course_name || "",
//       course_plan: course.course_plan || "",
//       course_price: String(course.course_price || ""),
//       course_image: course.course_image || "",
//       course_description: course.course_description || "",
//     });
//     setDialogVisible(true);
//   };

//   const handleUpdate = async () => {
//     if (!editingId) return;
//     setLoading(true);
//     try {
//       await axios.put(`${API_URL}/${editingId}`, courseData);
//       setSuccessMsg(t("Course updated successfully"));
//       setEditingId(null);
//       setCourseData({
//         course_name: "",
//         course_plan: "",
//         course_price: "",
//         course_image: "",
//         course_description: "",
//       });
//       setDialogVisible(false);
//       fetchCourses(currentPage, searchTerm);
//     } catch (err) {
//       console.warn("handleUpdate err", err);
//       setErrorMsg(t("Error updating course"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteRequest = (id) => {
//     setPendingDeleteId(id);
//     Alert.alert(
//       t("Confirm Delete"),
//       t("Are you sure you want to delete this course?"),
//       [
//         {
//           text: t("No"),
//           style: "cancel",
//           onPress: () => setPendingDeleteId(null),
//         },
//         {
//           text: t("Yes"),
//           style: "destructive",
//           onPress: confirmDelete,
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const confirmDelete = async () => {
//     if (!pendingDeleteId) return;
//     setLoading(true);
//     try {
//       await axios.delete(`${API_URL}/${pendingDeleteId}`);
//       setSuccessMsg(t("Course deleted successfully"));
//       if (courses.length === 1 && currentPage > 1) {
//         setCurrentPage((p) => p - 1);
//       } else {
//         fetchCourses(currentPage, searchTerm);
//       }
//     } catch (err) {
//       console.warn("confirmDelete err", err);
//       setErrorMsg(t("Error deleting course"));
//     } finally {
//       setPendingDeleteId(null);
//       setLoading(false);
//     }
//   };

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   const renderItem = ({ item }) => (
//     <Card style={styles.cardItem}>
//       <Card.Content>
//         <Title>{item.course_name}</Title>
//         <Paragraph>
//           {item.course_plan} • ${item.course_price}
//         </Paragraph>
//         <View style={styles.row}>
//           {item.course_image ? (
//             <Image source={{ uri: item.course_image }} style={styles.thumb} />
//           ) : (
//             <View style={styles.noImage}>
//               <Paragraph>No Image</Paragraph>
//             </View>
//           )}
//           <Paragraph style={styles.desc}>{item.course_description}</Paragraph>
//         </View>
//       </Card.Content>
//       <Card.Actions style={{ justifyContent: "flex-end" }}>
//         <Button onPress={() => startEdit(item)} compact>
//           {t("Edit")}
//         </Button>
//         <Button onPress={() => handleDeleteRequest(item.id)} compact textColor={paperTheme.colors.error}>
//           {t("Delete")}
//         </Button>
//       </Card.Actions>
//     </Card>
//   );

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Title style={styles.title}>{t("Admin Panel")}</Title>

//       <View style={styles.topRow}>
//         <TextInput
//           placeholder={t("Search by Course Name")}
//           value={searchTerm}
//           onChangeText={(t) => {
//             setSearchTerm(t);
//             setCurrentPage(1);
//           }}
//           style={[styles.searchInput, { flex: 1 }]}
//           mode="outlined"
//         />
//         <IconButton
//           icon="plus"
//           size={28}
//           onPress={() => {
//             setEditingId(null);
//             setCourseData({
//               course_name: "",
//               course_plan: "",
//               course_price: "",
//               course_image: "",
//               course_description: "",
//             });
//             setDialogVisible(true);
//           }}
//         />
//       </View>

//       {loading && <ActivityIndicator animating style={{ marginVertical: 12 }} />}

//       <View style={{ width: "100%", marginTop: 8 }}>
//         {courses.length === 0 && !loading ? (
//           <Paragraph>{t("No courses found.")}</Paragraph>
//         ) : (
//           <FlatList
//             data={courses}
//             renderItem={renderItem}
//             keyExtractor={(i) => String(i.id)}
//             ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
//             scrollEnabled={false}
//             contentContainerStyle={{ paddingBottom: 12 }}
//           />
//         )}
//       </View>

//       <View style={styles.paginationRow}>
//         <Button disabled={currentPage === 1} onPress={() => goToPage(currentPage - 1)}>
//           {t("Previous")}
//         </Button>
//         <Button disabled={currentPage === totalPages} onPress={() => goToPage(currentPage + 1)}>
//           {t("Next")}
//         </Button>
//       </View>

//       <Portal>
//         <Dialog
//           visible={dialogVisible}
//           onDismiss={() => {
//             setDialogVisible(false);
//             setEditingId(null);
//           }}
//         >
//           <Dialog.Title>{editingId ? t("Edit Course") : t("Add New Course")}</Dialog.Title>
//           <Dialog.Content>
//             <TextInput
//               label={t("Course Name")}
//               value={courseData.course_name}
//               onChangeText={(v) => updateField("course_name", v)}
//               style={styles.input}
//               mode="outlined"
//             />
//             <TextInput
//               label={t("Description")}
//               value={courseData.course_description}
//               onChangeText={(v) => updateField("course_description", v)}
//               style={styles.input}
//               mode="outlined"
//               multiline
//             />
//             <TextInput
//               label={t("Course Plan")}
//               value={courseData.course_plan}
//               onChangeText={(v) => updateField("course_plan", v)}
//               style={styles.input}
//               mode="outlined"
//             />
//             <TextInput
//               label={t("Course Price")}
//               value={courseData.course_price}
//               onChangeText={(v) => updateField("course_price", v)}
//               style={styles.input}
//               mode="outlined"
//               keyboardType="numeric"
//             />
//             <TextInput
//               label={t("Course Image URL")}
//               value={courseData.course_image}
//               onChangeText={(v) => updateField("course_image", v)}
//               style={styles.input}
//               mode="outlined"
//             />
//             {ImagePickerModule ? (
//               <Button onPress={pickImageFromDevice} compact style={{ marginTop: 8 }}>
//                 {t("Pick Image from Device")}
//               </Button>
//             ) : null}
//             {courseData.course_image ? (
//               <Image source={{ uri: courseData.course_image }} style={styles.preview} />
//             ) : null}
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button
//               onPress={() => {
//                 setDialogVisible(false);
//                 setEditingId(null);
//               }}
//             >
//               {t("Cancel")}
//             </Button>
//             {editingId ? (
//               <Button onPress={handleUpdate}>{t("Update Course")}</Button>
//             ) : (
//               <Button onPress={handleAdd}>{t("Add Course")}</Button>
//             )}
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>

//       <Snackbar visible={!!errorMsg} onDismiss={() => setErrorMsg(null)} duration={3000} style={{ backgroundColor: "#fdecea" }}>
//         {errorMsg}
//       </Snackbar>
//       <Snackbar visible={!!successMsg} onDismiss={() => setSuccessMsg(null)} duration={2500}>
//         {successMsg}
//       </Snackbar>
//     </ScrollView>
//   );
// }

// const paperTheme = useTheme();


// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 12,
//     fontWeight: "700",
//   },
//   topRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   searchInput: {
//     marginRight: 6,
//   },
//   input: {
//     marginBottom: 8,
//   },
//   cardItem: {
//     backgroundColor: "#ffffff",
//     paddingVertical: 6,
//     paddingHorizontal: 6,
//   },
//   row: {
//     flexDirection: "row",
//     marginTop: 8,
//     alignItems: "center",
//   },
//   thumb: {
//     width: 80,
//     height: 60,
//     borderRadius: 6,
//   },
//   noImage: {
//     width: 80,
//     height: 60,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   desc: {
//     flex: 1,
//     marginLeft: 8,
//   },
//   preview: {
//     width: 120,
//     height: 90,
//     marginTop: 8,
//     borderRadius: 6,
//   },
//   paginationRow: {
//     marginTop: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   textLight: {
//     color: "#111827",
//   },
// });


// src/pages/adminpanel/AdminPanel.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import {
  Button,
  TextInput,
  Card,
  Paragraph,
  Title,
  Dialog,
  Portal,
  Snackbar,
  ActivityIndicator,
  IconButton,
  useTheme,
} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

// Optional image picker
let ImagePickerModule = null;
try {
  ImagePickerModule = require("expo-image-picker");
} catch (e) {
  ImagePickerModule = null;
}

const API_URL = "https://retoolapi.dev/dL2nNn/data";
const COURSES_PER_PAGE = 10;

export default function AdminPanel({ navigation }) {
  const { t } = useTranslation();
  const theme = useTheme(); // Theme من react-native-paper

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [courseData, setCourseData] = useState({
    course_name: "",
    course_plan: "",
    course_price: "",
    course_image: "",
    course_description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // التحقق من تسجيل الدخول
  useEffect(() => {
    (async () => {
      try {
        const userData = await AsyncStorage.getItem("currentUser");
        if (!userData) {
          Alert.alert(
            t("Not authenticated"),
            t("You must login first."),
            [
              {
                text: t("OK"),
                onPress: () => navigation.navigate("login"),
              },
            ]
          );
          return;
        }

        const user = JSON.parse(userData);
        if (user.username !== "admin") {
          Alert.alert(
            t("Access Denied"),
            t("You are not authorized to access this page."),
            [
              {
                text: t("OK"),
                onPress: () => navigation.navigate("All Courses"),
              },
            ]
          );
          return;
        }
      } catch (err) {
        console.warn("AsyncStorage error:", err);
        setErrorMsg(t("Storage error"));
      }
    })();
  }, []);

  const fetchCourses = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `${API_URL}?course_name_like=${encodeURIComponent(query)}&_page=${page}&_limit=${COURSES_PER_PAGE}`
        : `${API_URL}?_page=${page}&_limit=${COURSES_PER_PAGE}`;

      const res = await axios.get(url);
      setCourses(res.data || []);

      const totalRaw =
        res.headers["x-total-count"] || res.headers["X-Total-Count"];
      const totalItems = totalRaw ? parseInt(totalRaw, 10) : (res.data?.length || 0);
      setTotalPages(Math.max(1, Math.ceil(totalItems / COURSES_PER_PAGE)));
    } catch (err) {
      console.warn("fetchCourses err", err);
      setErrorMsg(t("Failed to fetch courses"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const updateField = (name, value) => {
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const pickImageFromDevice = async () => {
    if (!ImagePickerModule) {
      setErrorMsg(t("Image picker not installed"));
      return;
    }
    try {
      const perm = await ImagePickerModule.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        setErrorMsg(t("Permission to access media is required"));
        return;
      }
      const res = await ImagePickerModule.launchImageLibraryAsync({
        mediaTypes: ImagePickerModule.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (res.canceled) return;
      const uri = res.assets && res.assets.length > 0 ? res.assets[0].uri : res.uri;
      if (uri) updateField("course_image", uri);
    } catch (err) {
      console.warn("pickImage error", err);
      setErrorMsg(t("Error picking image"));
    }
  };

  const handleAdd = async () => {
    if (
      !courseData.course_name ||
      !courseData.course_price ||
      !courseData.course_plan ||
      !courseData.course_image ||
      !courseData.course_description
    ) {
      setErrorMsg(t("Please fill in all fields"));
      return;
    }
    setLoading(true);
    try {
      await axios.post(API_URL, courseData);
      setSuccessMsg(t("Course added successfully"));
      setCourseData({
        course_name: "",
        course_plan: "",
        course_price: "",
        course_image: "",
        course_description: "",
      });
      fetchCourses(currentPage, searchTerm);
      setDialogVisible(false);
    } catch (err) {
      console.warn("handleAdd err", err);
      setErrorMsg(t("Error adding course"));
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (course) => {
    setEditingId(course.id);
    setCourseData({
      course_name: course.course_name || "",
      course_plan: course.course_plan || "",
      course_price: String(course.course_price || ""),
      course_image: course.course_image || "",
      course_description: course.course_description || "",
    });
    setDialogVisible(true);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${editingId}`, courseData);
      setSuccessMsg(t("Course updated successfully"));
      setEditingId(null);
      setCourseData({
        course_name: "",
        course_plan: "",
        course_price: "",
        course_image: "",
        course_description: "",
      });
      setDialogVisible(false);
      fetchCourses(currentPage, searchTerm);
    } catch (err) {
      console.warn("handleUpdate err", err);
      setErrorMsg(t("Error updating course"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    Alert.alert(
      t("Confirm Delete"),
      t("Are you sure you want to delete this course?"),
      [
        {
          text: t("No"),
          style: "cancel",
          onPress: () => setPendingDeleteId(null),
        },
        {
          text: t("Yes"),
          style: "destructive",
          onPress: confirmDelete,
        },
      ],
      { cancelable: true }
    );
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${pendingDeleteId}`);
      setSuccessMsg(t("Course deleted successfully"));
      if (courses.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        fetchCourses(currentPage, searchTerm);
      }
    } catch (err) {
      console.warn("confirmDelete err", err);
      setErrorMsg(t("Error deleting course"));
    } finally {
      setPendingDeleteId(null);
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.cardItem, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Title style={{ color: theme.colors.text }}>{item.course_name}</Title>
        <Paragraph style={{ color: theme.colors.text }}>
          {item.course_plan} • ${item.course_price}
        </Paragraph>
        <View style={styles.row}>
          {item.course_image ? (
            <Image source={{ uri: item.course_image }} style={styles.thumb} />
          ) : (
            <View style={styles.noImage}>
              <Paragraph style={{ color: theme.colors.text }}>No Image</Paragraph>
            </View>
          )}
          <Paragraph style={[styles.desc, { color: theme.colors.text }]}>
            {item.course_description}
          </Paragraph>
        </View>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "flex-end" }}>
        <Button onPress={() => startEdit(item)} compact textColor={theme.colors.primary}>
          {t("Edit")}
        </Button>
        <Button onPress={() => handleDeleteRequest(item.id)} compact textColor={theme.colors.error}>
          {t("Delete")}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Title style={[styles.title, { color: theme.colors.text }]}>{t("Admin Panel")}</Title>

      <View style={styles.topRow}>
        <TextInput
          placeholder={t("Search by Course Name")}
          value={searchTerm}
          onChangeText={(t) => {
            setSearchTerm(t);
            setCurrentPage(1);
          }}
          style={[styles.searchInput, { flex: 1 }]}
          mode="outlined"
          textColor={theme.colors.text}
        />
        <IconButton
          icon="plus"
          size={28}
          onPress={() => {
            setEditingId(null);
            setCourseData({
              course_name: "",
              course_plan: "",
              course_price: "",
              course_image: "",
              course_description: "",
            });
            setDialogVisible(true);
          }}
          iconColor={theme.colors.primary}
        />
        <IconButton
          icon="logout"
          size={28}
          onPress={() => {
            AsyncStorage.removeItem("currentUser");
            navigation.navigate("login");
          }}
          iconColor={theme.colors.error}
        />
      </View>

      {loading && <ActivityIndicator animating style={{ marginVertical: 12 }} color={theme.colors.primary} />}

      <View style={{ width: "100%", marginTop: 8 }}>
        {courses.length === 0 && !loading ? (
          <Paragraph style={{ color: theme.colors.text }}>{t("No courses found.")}</Paragraph>
        ) : (
          <FlatList
            data={courses}
            renderItem={renderItem}
            keyExtractor={(i) => String(i.id)}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 12 }}
          />
        )}
      </View>

      <View style={styles.paginationRow}>
        <Button disabled={currentPage === 1} onPress={() => goToPage(currentPage - 1)} textColor={theme.colors.primary}>
          {t("Previous")}
        </Button>
        <Button disabled={currentPage === totalPages} onPress={() => goToPage(currentPage + 1)} textColor={theme.colors.primary}>
          {t("Next")}
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => {
            setDialogVisible(false);
            setEditingId(null);
          }}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title style={{ color: theme.colors.text }}>
            {editingId ? t("Edit Course") : t("Add New Course")}
          </Dialog.Title>
          <Dialog.Content style={{ backgroundColor: theme.colors.surface }}>
            <TextInput
              label={t("Course Name")}
              value={courseData.course_name}
              onChangeText={(v) => updateField("course_name", v)}
              style={styles.input}
              mode="outlined"
              textColor={theme.colors.text}
            />
            <TextInput
              label={t("Description")}
              value={courseData.course_description}
              onChangeText={(v) => updateField("course_description", v)}
              style={styles.input}
              mode="outlined"
              multiline
              textColor={theme.colors.text}
            />
            <TextInput
              label={t("Course Plan")}
              value={courseData.course_plan}
              onChangeText={(v) => updateField("course_plan", v)}
              style={styles.input}
              mode="outlined"
              textColor={theme.colors.text}
            />
            <TextInput
              label={t("Course Price")}
              value={courseData.course_price}
              onChangeText={(v) => updateField("course_price", v)}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              textColor={theme.colors.text}
            />
            <TextInput
              label={t("Course Image URL")}
              value={courseData.course_image}
              onChangeText={(v) => updateField("course_image", v)}
              style={styles.input}
              mode="outlined"
              textColor={theme.colors.text}
            />
            {ImagePickerModule ? (
              <Button onPress={pickImageFromDevice} compact style={{ marginTop: 8 }} textColor={theme.colors.primary}>
                {t("Pick Image from Device")}
              </Button>
            ) : null}
            {courseData.course_image ? (
              <Image source={{ uri: courseData.course_image }} style={styles.preview} />
            ) : null}
          </Dialog.Content>
          <Dialog.Actions style={{ backgroundColor: theme.colors.surface }}>
            <Button
              onPress={() => {
                setDialogVisible(false);
                setEditingId(null);
              }}
              textColor={theme.colors.text}
            >
              {t("Cancel")}
            </Button>
            {editingId ? (
              <Button onPress={handleUpdate} textColor={theme.colors.primary}>
                {t("Update Course")}
              </Button>
            ) : (
              <Button onPress={handleAdd} textColor={theme.colors.primary}>
                {t("Add Course")}
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar visible={!!errorMsg} onDismiss={() => setErrorMsg(null)} duration={3000} style={{ backgroundColor: "#fdecea", color: theme.colors.text }}>
        {errorMsg}
      </Snackbar>
      <Snackbar visible={!!successMsg} onDismiss={() => setSuccessMsg(null)} duration={2500} style={{ color: theme.colors.text }}>
        {successMsg}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: "700",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  searchInput: {
    marginRight: 6,
  },
  input: {
    marginBottom: 8,
  },
  cardItem: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  thumb: {
    width: 80,
    height: 60,
    borderRadius: 6,
  },
  noImage: {
    width: 80,
    height: 60,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    flex: 1,
    marginLeft: 8,
  },
  preview: {
    width: 120,
    height: 90,
    marginTop: 8,
    borderRadius: 6,
  },
  paginationRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
