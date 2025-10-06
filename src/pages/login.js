import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Animated,
} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        usernameErr: "",
        passwordErr: "",
    });

    const validate = () => {
        let valid = true;
        if (username.length === 0) {
            setErrors((e) => ({
                ...e,
                usernameErr: "Username is required",
            }));
            valid = false;
        } else if (username.length < 3) {
            setErrors((e) => ({
                ...e,
                usernameErr: "Username must be at least 3 characters",
            }));
            valid = false;
        } else {
            setErrors((e) => ({ ...e, usernameErr: "" }));
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (password.length === 0) {
            setErrors((e) => ({
                ...e,
                passwordErr: "Password is required",
            }));
            valid = false;
        } else if (password.length < 6) {
            setErrors((e) => ({
                ...e,
                passwordErr: "Password must be at least 6 characters",
            }));
            valid = false;
        } else if (!passwordRegex.test(password)) {
            setErrors((e) => ({
                ...e,
                passwordErr:
                    "Password must contain at least one letter and one number",
            }));
            valid = false;
        } else {
            setErrors((e) => ({ ...e, passwordErr: "" }));
        }

        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.username === username && user.password === password) {
                navigation.navigate("home");
            } else {
                alert("Invalid username or password");
            }
        } else {
            alert("No account found. Redirecting to Register...");
            navigation.navigate("register");
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>

                {/* Username */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            errors.usernameErr
                                ? styles.inputError
                                : username
                                    ? styles.inputSuccess
                                    : null,
                        ]}
                        placeholder="Username"
                        placeholderTextColor="#aaa"
                        value={username}
                        onChangeText={setUsername}
                    />
                    {errors.usernameErr ? (
                        <Text style={styles.errorText}>{errors.usernameErr}</Text>
                    ) : username ? (
                        <Text style={styles.successText}>Looks good!</Text>
                    ) : null}
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                    <View style={styles.passwordWrapper}>
                        <TextInput
                            style={[
                                styles.input,
                                errors.passwordErr
                                    ? styles.inputError
                                    : password
                                        ? styles.inputSuccess
                                        : null,
                            ]}
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                        >
                            <Text style={styles.eyeText}>
                                {showPassword ? <AntDesign name="eye-invisible" size={24} color="#6b7280" /> : <Feather name="eye" size={24} color="#6b7280" />}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {errors.passwordErr ? (
                        <Text style={styles.errorText}>{errors.passwordErr}</Text>
                    ) : password ? (
                        <Text style={styles.successText}>Password looks good.</Text>
                    ) : null}
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Register Link */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("register")}
                >
                    <Text style={styles.registerText}>
                        Don't have an account?{" "}
                        <Text style={styles.registerLink}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6", // tailwind gray-100
        padding: 20,
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
        color: "#6366f1", // tailwind indigo-500
        textAlign: "center",
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 18,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: "#d1d5db", // gray-300
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        color: "#111827", // gray-900
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "#dc2626", // red-600
    },
    inputSuccess: {
        borderColor: "#16a34a", // green-600
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
        right: 10,
        top: 12,
    },
    eyeText: {
        fontSize: 18,
        color: "#6b7280", // gray-500
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
});
