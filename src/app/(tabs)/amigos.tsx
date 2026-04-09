import { ProfileBanner } from "@/components/ProfileBanner";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import avatarImg from "@/assets/avatar.png";

export default function AmigosScreen() {
  return (
    <SafeAreaView>
      <View>
        {/* Header */}
        <ProfileBanner
          name="Paulo Souza"
          email="paulo.souza@example.com"
          avatar={avatarImg}
        />
      </View>
    </SafeAreaView>
  );
}
