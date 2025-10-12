import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    I18nManager,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";

export default function Login() {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [direction, setDirection] = useState(i18n.language === "ar" ? "rtl" : "ltr");

    const [errors, setErrors] = useState({
        usernameErr: "",
        passwordErr: "",
    });



    useEffect(() => {
        const newDir = i18n.language === "ar" ? "rtl" : "ltr";
        setDirection(newDir);
    }, [i18n.language]);

    const validate = () => {
        let valid = true;
        if (username.length === 0) {
            setErrors((e) => ({
                ...e,
                usernameErr: t("Username is required"),
            }));
            valid = false;
        } else if (username.length < 3) {
            setErrors((e) => ({
                ...e,
                usernameErr: t("Username must be at least 3 characters"),
            }));
            valid = false;
        } else {
            setErrors((e) => ({ ...e, usernameErr: "" }));
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (password.length === 0) {
            setErrors((e) => ({
                ...e,
                passwordErr: t("Password is required"),
            }));
            valid = false;
        } else if (password.length < 6) {
            setErrors((e) => ({
                ...e,
                passwordErr: t("Password must be at least 6 characters"),
            }));
            valid = false;
        } else if (!passwordRegex.test(password)) {
            setErrors((e) => ({
                ...e,
                passwordErr: t("Password must contain at least one letter and one number"),
            }));
            valid = false;
        } else {
            setErrors((e) => ({ ...e, passwordErr: "" }));
        }

        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const user = users.find((u) => u.username === username && u.password === password);
            if (user) {
                await AsyncStorage.setItem("currentUser", JSON.stringify(user));
                if (user.username === "admin") {
                    navigation.navigate("AdminPanel");
                } else {
                    navigation.navigate("All Courses");
                }
            } else {
                alert(t("Invalid username or password"));
            }
        } else {
            alert(t("No account found. Redirecting to Register..."));
            navigation.navigate("register");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboard}
        >
            <View style={[styles.screen, { direction: direction, writingDirection: direction }]}>
                <Button
                    style={styles.btn}
                    mode="contained"
                    onPress={() => {
                        const newLang = i18n.language === "en" ? "ar" : "en";
                        i18n.changeLanguage(newLang);
                    }}
                >
                    {i18n.language === "en" ? "AR" : "EN"}
                </Button>

                <View style={styles.formContainer}>
                    <Text style={[styles.title, { textAlign: "center" }]}>
                        {t("Login")}
                    </Text>

                    {/* Username */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                { textAlign: direction === "rtl" ? "right" : "left" },
                                errors.usernameErr
                                    ? styles.inputError
                                    : username
                                        ? styles.inputSuccess
                                        : null,
                            ]}
                            placeholder={t("Username")}
                            placeholderTextColor="#aaa"
                            value={username}
                            onChangeText={setUsername}
                        />
                        {errors.usernameErr ? (
                            <Text style={styles.errorText}>{errors.usernameErr}</Text>
                        ) : username ? (
                            <Text style={styles.successText}>{t("Looks good!")}</Text>
                        ) : null}
                    </View>

                    {/* Password */}
                    <View style={styles.inputContainer}>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={[
                                    styles.input,
                                    { textAlign: direction === "rtl" ? "right" : "left" },
                                    errors.passwordErr
                                        ? styles.inputError
                                        : password
                                            ? styles.inputSuccess
                                            : null,
                                ]}
                                placeholder={t("Password")}
                                placeholderTextColor="#aaa"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={[
                                    styles.eyeButton,
                                    direction === "rtl" ? { left: 10, right: "auto" } : { right: 10, left: "auto" },
                                ]}
                            >
                                {showPassword ? (
                                    <AntDesign name="eye-invisible" size={24} color="#6b7280" />
                                ) : (
                                    <Feather name="eye" size={24} color="#6b7280" />
                                )}
                            </TouchableOpacity>
                        </View>
                        {errors.passwordErr ? (
                            <Text style={styles.errorText}>{errors.passwordErr}</Text>
                        ) : password ? (
                            <Text style={styles.successText}>{t("Looks good!")}</Text>
                        ) : null}
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{t("Login")}</Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <TouchableOpacity onPress={() => navigation.navigate("register")}>
                        <Text style={styles.registerText}>
                            {t("Don't have an account?")}{" "}
                            <Text style={styles.registerLink}>{t("Register")}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: 20,
    },
    keyboard: {
        flex: 1,
    },
    formContainer: {
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: 400,
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6366f1",
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 18,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: "#d1d5db",
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        color: "#111827",
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "#dc2626",
    },
    inputSuccess: {
        borderColor: "#16a34a",
    },
    errorText: {
        color: "#dc2626",
        fontSize: 12,
        marginTop: 4,
    },
    successText: {
        color: "#16a34a",
        fontSize: 12,
        marginTop: 4,
    },
    passwordWrapper: {
        position: "relative",
    },
    eyeButton: {
        position: "absolute",
        top: 12,
    },
    button: {
        backgroundColor: "#6366f1",
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    registerText: {
        textAlign: "center",
        color: "#6b7280",
        fontSize: 14,
    },
    registerLink: {
        color: "#6366f1",
        fontWeight: "600",
    },
    btn: {
        alignSelf: "flex-end",
        marginBottom: 20,
        backgroundColor: "#6366f1",
        padding: 0,
        borderRadius: 8,
    }
});