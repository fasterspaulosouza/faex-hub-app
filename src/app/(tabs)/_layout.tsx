import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

function TabIcon({ name, color }: { name: IoniconsName; color: string }) {
  return <Ionicons name={name} size={24} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.icon,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          backgroundColor: Colors.white,
          height: 62,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: Fonts.body.regular,
        },
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <TabIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="amigos"
        options={{
          title: "Amigos",
          tabBarIcon: ({ color }) => (
            <TabIcon name="people-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="presentes"
        options={{
          title: "Presentes",
          tabBarIcon: ({ color }) => (
            <TabIcon name="gift-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <TabIcon name="settings-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
