import { Colors, Fonts } from "@/constants/theme";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Logo from "@/assets/logo_black.svg";
import { ProfileBanner } from "@/components/ProfileBanner";
import { PostCreator } from "@/components/PostCreator";
import { ActivityCard, ActivityCardData } from "@/components/ActivityCard";

const MOCK_ACTIVITIES: ActivityCardData[] = [
  {
    id: "1",
    userName: "Maria Oliveira",
    date: "2 horas atrás",
    isPrivate: true,
    userAvatarUri: "",
    mediaUri: "",
  },
  {
    id: "2",
    userName: "João Silva",
    date: "1 hora atrás",
    isPrivate: false,
    userAvatarUri: "",
    mediaUri: "",
  },
];

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

        {/* Criador de publicaçoes */}
        <PostCreator />

        {/* Titulo Sessao */}
        <Text style={styles.sectionTitle}>Atividades</Text>

        {/* Map(array) lista de atividades */}
        {MOCK_ACTIVITIES.map((item) => (
          <ActivityCard key={item.id} data={item} />
        ))}
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.title.bold,
    color: Colors.text,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
  },
});
