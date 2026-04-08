import { Colors } from "@/constants/theme";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Logo from "@/assets/logo_black.svg";
import { ProfileBanner } from "@/components/ProfileBanner";

export default function InicioScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Topo (logo) */}
        <View style={styles.topHeader}>
          <Logo width={120} height={38} />
        </View>

        {/* Header */}
        <ProfileBanner
          name="Paulo Souza"
          email="paulo.souza@example.com"
          avatarUri="@/assets/avatar.png"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topHeader: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
