import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function Register() {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        const newErrors = {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!form.name.trim()) newErrors.name = "Name is required";

        if (!form.username.trim()) {
            newErrors.username = "Username is required";
        } else if (form.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        } else {
            newErrors.username = "";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Invalid email address";
        } else {
            newErrors.email = "";
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!passwordRegex.test(form.password)) {
            newErrors.password =
                "Password must contain at least one letter and one number";
        } else {
            newErrors.password = "";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = "Passwords do not match";
        } else {
            newErrors.confirmPassword = "";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== "");
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        console.log("hello");
        const newUser = {
            name: form.name.trim(),
            username: form.username.trim(),
            password: form.password,
        };

        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        alert("Registration successful! Redirecting to login...");
        navigation.navigate("login");
    };

    const inputStyle = (error, value) => [
        styles.input,
        error ? styles.inputError : value ? styles.inputSuccess : null,
    ];

    return (
        <View style={styles.screen}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Register</Text>

                {/* Name */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={inputStyle(errors.name, form.name)}
                        placeholder="Full Name"
                        placeholderTextColor="#aaa"
                        value={form.name}
                        onChangeText={(val) => handleChange("name", val)}
                    />
                    {errors.name ? (
                        <Text style={styles.errorText}>{errors.name}</Text>
                    ) : form.name ? (
                        <Text style={styles.successText}>Looks good!</Text>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={inputStyle(errors.username, form.username)}
                        placeholder="Username"
                        placeholderTextColor="#aaa"
                        value={form.username}
                        onChangeText={(val) => handleChange("username", val)}
                    />
                    {errors.username ? (
                        <Text style={styles.errorText}>{errors.username}</Text>
                    ) : form.username ? (
                        <Text style={styles.successText}>Looks good!</Text>
                    ) : null}
                </View>

          

                <View style={styles.inputContainer}>
                    <TextInput
                        style={inputStyle(errors.email, form.email)}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        value={form.email}
                        onChangeText={(val) => handleChange("email", val)}
                    />
                    {errors.email ? (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    ) : form.email ? (
                        <Text style={styles.successText}>Looks good!</Text>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[inputStyle(errors.password, form.password), { paddingRight: 40 }]}
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!showPassword}
                            value={form.password}
                            onChangeText={(val) => handleChange("password", val)}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword((prev) => !prev)}
                            style={styles.eyeIcon}
                        >
                            {!showPassword ? (
                                // <AntDesign name="eye" size={22} color="#6b7280" />
                                <Feather name="eye" size={22} color="#6b7280" />

                            ) : (
                                    <AntDesign name="eye-invisible" size={22} color="#6b7280" />

                            )}
                        </TouchableOpacity>
                    </View>
                    {errors.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    ) : form.password ? (
                        <Text style={styles.successText}>Password looks good.</Text>
                    ) : null}
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[inputStyle(errors.confirmPassword, form.confirmPassword), { paddingRight: 40 }]}
                            placeholder="Confirm Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!showConfirmPassword}
                            value={form.confirmPassword}
                            onChangeText={(val) => handleChange("confirmPassword", val)}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword((prev) => !prev)}
                            style={styles.eyeIcon}
                        >
                            {!showConfirmPassword ? (
                                <Feather name="eye" size={22} color="#6b7280" />
                            ) : (
                                <AntDesign name="eye-invisible" size={22} color="#6b7280" />
                            )}
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword ? (
                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    ) : form.confirmPassword ? (
                        <Text style={styles.successText}>Passwords match.</Text>
                    ) : null}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>
                    navigation.goBack()
                }>
                    <Text style={styles.registerText}>
                        Already have an account?{" "}
                        <Text style={styles.registerLink}>Login</Text>
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
        backgroundColor: "#f3f4f6",
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
        color: "#6366f1",
        textAlign: "center",
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 18,
    },
    inputWrapper: {
        position: "relative",
        justifyContent: "center",
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
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }],
        padding: 4,
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
