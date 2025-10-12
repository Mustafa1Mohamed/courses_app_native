import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Alert, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import { enrollCourse } from "../../Store/EnrolledCoursesSlice";

export default function PayPalCheckout() {
    const navigate=useNavigation()
    const route = useRoute();
    const { course } = route.params || {};
    const dispatch = useDispatch();
    const handleMessage = (event) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);

            if (data.status === "success") {
                Alert.alert(
                    "Payment Successful",
                    `Paid by: ${data.details.payer.name.given_name}`
                );
                if (course) {
                    dispatch(enrollCourse(course));
                    navigate.goBack();
                }
            } else if (data.status === "error") {
                Alert.alert("Payment Error", data.message);
            }
        } catch (err) {
            console.log("Error parsing message:", err);
        }
    };

    return (
        <View style={styles.container}>
            {Platform.OS === 'web' ? <iframe
                width="100%"
                height="100%"
                src="https://mustafa1mohamed.github.io/hostedPage/"
                title="PayPal Checkout"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onClick={handleMessage}
            ></iframe> :
                <WebView
                    source={{ uri: "https://mustafa1mohamed.github.io/hostedPage/" }}
                    onMessage={handleMessage}
                    javaScriptEnabled
                    domStorageEnabled
                    startInLoadingState
                    renderLoading={() => (
                        <ActivityIndicator
                            size="large"
                            color="#0070BA"
                            style={{ flex: 1, alignSelf: "center", }}
                        />
                    )}
                />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cd2323ff',
        flex: 1,
        // top: "40%",
        // left: "10%"
    },
});
