import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ThemeColors } from "@/constants/theme";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

function TabIcon({ name, color }: { name: IoniconsName; color: string }) {
  return <Ionicons name={name} size={24} color={color} />;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.icon,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.card,
            height: 62 + insets.bottom,
            paddingBottom: 6 + insets.bottom,
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
          name="configuracoes"
          options={{
            title: "Configurações",
            tabBarIcon: ({ color }) => (
              <TabIcon name="settings-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="presentes"
          options={{
            title: "Sair",
            tabBarIcon: ({ color }) => (
              <TabIcon name="log-out-outline" color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setShowLogout(true);
            },
          }}
        />
      </Tabs>

      {/* ── Modal de confirmação de logout ──────────────────────────── */}
      <Modal visible={showLogout} transparent animationType="fade">
        <Pressable
          style={styles.overlay}
          onPress={() => setShowLogout(false)}
        >
          <Pressable style={styles.modal} onPress={() => {}}>
            <View style={styles.iconWrap}>
              <Ionicons name="log-out-outline" size={36} color={colors.primary} />
            </View>
            <Text style={styles.title}>Sair da conta</Text>
            <Text style={styles.desc}>Tem certeza que deseja sair?</Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.btnCancel}
                onPress={() => setShowLogout(false)}
              >
                <Text style={styles.btnCancelText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.btnConfirm}
                onPress={() => {
                  setShowLogout(false);
                  logout();
                }}
              >
                <Text style={styles.btnConfirmText}>Confirmar</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
    },
    modal: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 28,
      alignItems: "center",
      width: "100%",
      gap: 8,
    },
    iconWrap: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.indigo,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
    title: {
      fontSize: 18,
      fontFamily: Fonts.title.bold,
      color: colors.text,
    },
    desc: {
      fontSize: 14,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
      textAlign: "center",
      marginBottom: 8,
    },
    actions: {
      flexDirection: "row",
      gap: 12,
      width: "100%",
    },
    btnCancel: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 13,
      alignItems: "center",
    },
    btnCancelText: {
      fontFamily: Fonts.body.semiBold,
      color: colors.text,
      fontSize: 14,
    },
    btnConfirm: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 13,
      alignItems: "center",
    },
    btnConfirmText: {
      fontFamily: Fonts.body.semiBold,
      color: "#fff",
      fontSize: 14,
    },
  });
}
