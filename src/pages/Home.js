import { View, ScrollView, StyleSheet, SafeAreaView, Platform } from "react-native";
import Header from "../components/Header";
import FeaturedCourses from "../components/FeaturedCourses";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const [direction, setDirection] = useState(i18n.language === "ar" ? "rtl" : "ltr");

    useEffect(() => {
        setDirection(i18n.language === "ar" ? "rtl" : "ltr");
    }, [i18n.language]);

    

   

    return (
        <SafeAreaView contentContainerStyle={{ direction: direction }} style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContainer,
                    { direction: direction, flexDirection: "column" },
                ]}
            >
                <View style={[styles.container, { direction: direction }]}>
                    <Header />

                    {/* <View
                        style={[
                            styles.topButtons,
                            {
                                flexDirection: direction === "rtl" ? "row-reverse" : "row",

                            },
                        ]}
                    >
                        <Button
                            mode="contained"
                            buttonColor="#4f46e5"
                            textColor="#fff"
                            style={styles.btn}
                            contentStyle={styles.btnContent}
                            onPress={() =>
                                handleLanguageChange(i18n.language === "ar" ? "en" : "ar")
                            }
                        >
                            {i18n.language === "ar" ? t("English") : t("Arabic")}
                        </Button>

                        <Button
                            mode="contained"
                            buttonColor="#ef4444"
                            textColor="#fff"
                            style={styles.btn}
                            contentStyle={styles.btnContent}
                            onPress={handleLogout}
                        >
                            {t("Logout")}
                        </Button>
                    </View> */}

                    <FeaturedCourses />
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 40,
    },
    container: {
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#fff",
    },
    topButtons: {
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    btn: {
        borderRadius: 8,
        elevation: Platform.OS === "android" ? 2 : 0,
    },
    btnContent: {
        height: 45,
        paddingHorizontal: 16,
    },
});
