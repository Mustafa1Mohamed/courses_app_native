import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import Courses from "./src/pages/Courses";
import Home from "./src/pages/Home";
import Favorites from "./src/pages/Favorites";
import CoursesDetails from "./src/pages/CoursesDetails";


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainStack() {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="CoursesDetails" component={CoursesDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (

      <NavigationContainer style={styles.container}>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="All Courses" component={MainStack} />
          <Drawer.Screen name="Favorites" component={Favorites} />     
        </Drawer.Navigator>
      </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C467B",
    padding: 10,
  },
});

