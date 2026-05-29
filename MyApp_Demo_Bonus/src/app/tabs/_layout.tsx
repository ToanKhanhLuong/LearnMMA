import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0066ff",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          height: 90,
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../../assets/images/HomeActive.png")
                  : require("../../../assets/images/HomeDeactive.png")
              }
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="allapps"
        options={{
          title: "All Apps",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../../assets/images/AllAppActive.png")
                  : require("../../../assets/images/AllAppDeactive.png")
              }
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="gold"
        options={{
          title: "Gold",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../../assets/images/GoldActive.png")
                  : require("../../../assets/images/GoldDeactive.png")
              }
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="game"
        options={{
          title: "Game",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../../assets/images/GameActive.png")
                  : require("../../../assets/images/GameDeactive.png")
              }
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../../assets/images/ProfileActive.png")
                  : require("../../../assets/images/ProfileDeactive.png")
              }
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
