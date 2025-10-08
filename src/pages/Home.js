import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import FeaturedCourses from "../components/FeaturedCourses";
import Footer from "../components/Footer";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigate = useNavigation();
    const { t, i18n } = useTranslation();
    const [direction, setDirection] = useState(i18n.language === "ar" ? "rtl" : "ltr");

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        setDirection(lang === "ar" ? "rtl" : "ltr");
    };
    const handleLogout = () => {
        AsyncStorage.removeItem("user");
        navigate.replace("login");
    }

    return (
        <ScrollView contentContainerStyle={{ flexDirection: direction === "rtl" ? "row-reverse" : "row" }}>
            <View>
                <Header />
                <Button onPress={() => handleLanguageChange(i18n.language === "ar" ? "en" : "ar")}>
                    {i18n.language === "ar" ? t("English") : t("Arabic")}
                </Button>
                <Button onPress={
            
                       handleLogout
                    
                }>
                    {t("Logout")}
                </Button>
                <FeaturedCourses />
                <Footer />
            </View>
        </ScrollView>
    );
}
