import { ActivityCard, ActivityCardData } from "@/components/ActivityCard";
import { PostCreator } from "@/components/PostCreator";
import { ProfileBanner } from "@/components/ProfileBanner";
import { Colors, Fonts } from "@/constants/theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import avatarPost from "@/assets/avatar-post.png";
import avatarImg from "@/assets/avatar.png";
import post01 from "@/assets/post-01.png";
import post02 from "@/assets/post-02.png";
import { useAuth } from "@/context/AuthContext";

const MOCK_ACTIVITIES: ActivityCardData[] = [
  {
    id: "1",
    userName: "Felipe Silva",
    date: "8 de março às 18:00",
    isPrivate: true,
    userAvatar: avatarPost,
    media: post01,
  },
  {
    id: "2",
    userName: "Felipe Silva",
    date: "8 de março às 18:00",
    isPrivate: true,
    userAvatar: avatarPost,
    media: post02,
  },
];

export default function InicioScreen() {
  const { usuario } = useAuth()
  console.log(usuario)
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de perfil */}
        <ProfileBanner
          name={usuario?.nome || ""}
          email={usuario?.email || ""}
          avatar={avatarImg}
        />

        {/* Criador de publicação */}
        <PostCreator />

        {/* Seção de atividades */}
        <Text style={styles.sectionTitle}>Atividades</Text>

        {MOCK_ACTIVITIES.map((item) => (
          <ActivityCard key={item.id} data={item} />
        ))}

        <View style={styles.bottomSpacing} />
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
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topHeader: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.title.bold,
    color: Colors.text,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 14,
  },
  bottomSpacing: {
    height: 20,
  },
});
