import { useAuth } from "@/context/AuthContext";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SairScreen() {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="log-out-outline" size={48} color={Colors.primary} />
        <Text style={styles.title}>Sair da conta</Text>
        <Text style={styles.subtitle}>
          Tem certeza que deseja sair?
        </Text>
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Confirmar saída</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.title.bold,
    color: Colors.text,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.body.regular,
    color: Colors.icon,
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.title.bold,
    fontSize: 15,
  },
});
