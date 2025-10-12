import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Switch,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    image: "",
  });
  const [language, setLanguage] = useState("ar");
  const [darkTheme, setDarkTheme] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        let raw = await AsyncStorage.getItem("currentUser");
        if (!raw) raw = await AsyncStorage.getItem("user");
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser({
            name: parsed.name || "",
            email: parsed.email || parsed.username || "",
            username: parsed.username || "",
            image: parsed.image || "",
          });
        }
        const lang = await AsyncStorage.getItem("app_language");
        if (lang) setLanguage(lang);
        const theme = await AsyncStorage.getItem("app_theme");
        if (theme) setDarkTheme(theme === "dark");
      } catch (e) {
        console.log("Failed to load user", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleLanguage = async () => {
    const next = language === "ar" ? "en" : "ar";
    setLanguage(next);
    try {
      await AsyncStorage.setItem("app_language", next);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleTheme = async () => {
    const next = !darkTheme;
    setDarkTheme(next);
    try {
      await AsyncStorage.setItem("app_theme", next ? "dark" : "light");
    } catch (e) {
      console.log(e);
    }
  };

  const openEditor = () => {
    setEditName(user.name || "");
    setEditImage(user.image || "");
    setEditing(true);
  };

  const saveEdits = async () => {
    try {
      const updated = { ...user, name: editName, image: editImage };
      setUser(updated);
      await AsyncStorage.setItem("user", JSON.stringify(updated));
      await AsyncStorage.setItem("currentUser", JSON.stringify(updated));
      setEditing(false);
      alert("Profile updated");
    } catch (e) {
      console.log(e);
      alert("Failed to save");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: user.image || "../assets/Profile.jpg" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name || "-"}</Text>
        <Text style={styles.email}>{user.email || user.username || "-"}</Text>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.listItem} onPress={toggleLanguage}>
          <Text style={styles.listLabel}>Language</Text>
          <Text style={styles.listValue}>
            {language === "ar" ? "Arabic" : "English"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={toggleTheme}>
          <Text style={styles.listLabel}>Theme</Text>
          <Text style={styles.listValue}>{darkTheme ? "Dark" : "Light"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={openEditor}>
          <Text style={styles.listLabel}>Edit</Text>
          <Text style={styles.listValue}>Change name or image</Text>
        </TouchableOpacity>

        {editing ? (
          <View style={{ width: "100%", marginTop: 12 }}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={editImage}
              onChangeText={setEditImage}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveButton} onPress={saveEdits}>
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditing(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#f7fafc",
    minHeight: "100%",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  name: { fontSize: 20, fontWeight: "700", color: "#111827" },
  email: { color: "#6b7280", marginTop: 4 },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    width: "100%",
    marginVertical: 12,
  },
  listItem: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  listLabel: { fontSize: 16, color: "#111827" },
  listValue: { color: "#6b7280" },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#6366f1",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
});

export default Profile;
