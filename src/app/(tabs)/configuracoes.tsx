import { ProfileBanner } from "@/components/ProfileBanner";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import avatarImg from "@/assets/avatar.png";
import { useAuth } from "@/context/AuthContext";

export default function ConfiguracoesScreen() {
  
  const { logout } = useAuth()
  
  return (
    <SafeAreaView>
      <View>
        {/* Header */}
        <ProfileBanner
          name="Paulo Souza"
          email="paulo.souza@example.com"
          avatar={avatarImg}
        />

        <Pressable onPress={logout}>
          <Text>Sair</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
