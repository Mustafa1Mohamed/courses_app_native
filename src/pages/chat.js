import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView
} from "react-native";
import axios from "axios";

const ChatbotScreen = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() === "" || isLoading) return;

        const userMessage = { role: "user", content: input };
        const userInput = input;
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const GEMINI_API_KEY = "AIzaSyBNILClKKHRK16DZYrOjEC-mYLP9RbRvXg";

            if (!GEMINI_API_KEY) {
                throw new Error(
                    "API key not found. Please check your .env file (EXPO_PUBLIC_GEMINI_API_KEY)."
                );
            }


            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: userInput,
                                },
                            ],
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 30000,
                }
            );

            const botMessage = {
                role: "assistant",
                content:
                    response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                    "No response from model.",
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Chatbot API Error:", error.response?.data || error.message);

            let errorMsg = "Sorry, I am unable to respond at the moment.";

            if (error.response?.status === 429) {
                errorMsg = "Rate limit reached. Please wait a moment and try again.";
            } else if (error.response?.status === 400) {
                errorMsg = "Invalid request. Please try again.";
            } else if (error.response?.status === 403) {
                errorMsg = "API key error. Please check your Gemini API key.";
            } else if (error.response?.status === 404) {
                errorMsg = "Model not found. Please check the API endpoint.";
            } else if (error.response?.status === 500) {
                errorMsg = "Service error. Try again later.";
            } else if (error.message.includes("API key not found")) {
                errorMsg = "Missing API key. Check your .env file.";
            } else if (error.code === "ECONNABORTED") {
                errorMsg = "Request timed out. Please check your internet.";
            } else if (!error.response) {
                errorMsg = "Network error. Please check your connection.";
            }

            const errorMessage = { role: "assistant", content: errorMsg };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90} >
            <View style={styles.container}>
                <ScrollView
                    style={styles.messagesContainer}
                    contentContainerStyle={styles.messagesContent}
                >
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            style={[
                                styles.messageBubble,
                                msg.role === "user" ? styles.userBubble : styles.botBubble,
                            ]}
                        >
                            <Text
                                style={msg.role === "user" ? styles.userText : styles.botText}
                            >
                                {msg.content}
                            </Text>
                        </View>
                    ))}

                    {isLoading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#666" />
                            <Text style={styles.loadingText}>Thinking...</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type your message..."
                        editable={!isLoading}
                        multiline
                    />
                    <TouchableOpacity
                        title="Send"
                        onPress={handleSend}
                        disabled={isLoading || input.trim() === ""}
                        style={[isLoading || input.trim() === "" ? styles.disabledSendButton : styles.sendButton]}
                    ><Text style={styles.sendButtonText}>Send</Text></TouchableOpacity>


                </View>
            </View>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        paddingBottom: 10,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 12,
        marginVertical: 4,
        maxWidth: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    userBubble: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C6",
    },
    botBubble: {
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF",
    },
    userText: {
        color: "#000",
        fontSize: 16,
    },
    botText: {
        color: "#000",
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        fontSize: 16,
        maxHeight: 100,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 4,
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        maxWidth: "80%",
    },
    loadingText: {
        marginLeft: 10,
        color: "#666",
        fontStyle: "italic",
        fontSize: 16,
    },
    sendButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#4f46e5",
        borderRadius: 20,
        color: "#fff",
    },
    disabledSendButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#ccc",
        borderRadius: 20,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default ChatbotScreen;
