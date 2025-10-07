import { View, Text } from "react-native";
import { ScrollView } from "react-native";
import Header from "../components/Header";
import AboutUs from "./AboutUs";
import FeaturedCourses from "../components/FeaturedCourses";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <ScrollView>
        <View>
            <Header />
            <FeaturedCourses />
           

        </View>
        </ScrollView>
    );
}