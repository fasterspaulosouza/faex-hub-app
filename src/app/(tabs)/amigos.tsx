import { ProfileBanner } from "@/components/ProfileBanner";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AmigosScreen() {
  return (
    <SafeAreaView>
      <View>
        <ProfileBanner />
      </View>
    </SafeAreaView>
  );
}
