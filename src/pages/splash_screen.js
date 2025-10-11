import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SplashScreen() {
    const translateX = useRef(new Animated.Value(-300)).current
    const translateY = useRef(new Animated.Value(-300)).current
    const translateY2 = useRef(new Animated.Value(300)).current
    const [horizontal, setHorizontal] = useState(0)
    const [vertical, setVertical] = useState(0)
    const navigate = useNavigation()
    const moveDown = () => {
        const newPos = vertical - 20
        setVertical(newPos)

        Animated.timing(translateY, {
            toValue: newPos,
            duration: 1000,
            useNativeDriver: true
        }).start()

    }
    const moveUp = () => {
        const newPos = vertical + 20
        setVertical(newPos)

        Animated.timing(translateY2, {
            toValue: newPos,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }
    const MoveRightToHorizontal = () => {
        const newPos = horizontal + 20
        setHorizontal(newPos)

        Animated.timing(translateX, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }
    useEffect(() => {
        moveDown()
        moveUp()
        MoveRightToHorizontal()
    }, [])
    useEffect(() => {
        const checkLoggedIn = async () => {
            const user = await AsyncStorage.getItem("currentUser");
            // console.log(user);
            if (user) {
                if (user.username === "admin") {
                    navigate.navigate("AdminPanel");
                } else {
                    navigate.navigate("All Courses");
                }
            } else {
                navigate.replace("login");
            }
        };
        setTimeout(() => {
            checkLoggedIn();
        }, 3000);
    }, []);
    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateY: translateY }] }}>
                <Text style={styles.welcomstyle}>E-Learning</Text>

            </Animated.View>
            <Animated.View style={{ transform: [{ translateX: translateX }] }}>
                <ActivityIndicator size="large" color="#0000ff" />

            </Animated.View>

            <Animated.View style={{ transform: [{ translateY: translateY2 }] }}>
                <Text style={styles.description}>The best platform to learn new skills online</Text>

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcomstyle: {
        color: '#4f46e5', fontSize: 24, fontWeight: 'bold'
    },
    description: {
        color: '#4f46e5', fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    }
});