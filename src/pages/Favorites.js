import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import MyCard from "../components/MyCard";

export default function Favorites() {
    const courses= useSelector((state) => state.favReducer.fav);
    return (
        <View style={styles.container}>
            {courses.length > 0 ? (
                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MyCard course={item} />}
                />
            ) : (
                <Text style={styles.noCourses}>No favorite courses found.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    noCourses: {
        textAlign: "center",
        color: "gray",
        marginTop: 20,
    },
});