import { Fonts } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import LogoWhite from "@/assets/logo_white.svg";
import type { ThemeColors } from "@/constants/theme";

type Props = {
  onEditPress?: () => void;
};

export function ProfileBanner({ onEditPress }: Props) {
  const { usuario } = useAuth();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {/* Banner com gradiente */}
      <LinearGradient
        colors={["#a5b4e8", "#c4cff0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <LogoWhite width={130} height={42} />
      </LinearGradient>

      {/* Avatar sobrepondo o banner */}
      {usuario?.foto ? (
        <Image source={{ uri: usuario.foto }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
      )}

      {/* Botão de editar */}
      {onEditPress && (
        <Pressable style={styles.editButton} onPress={onEditPress}>
          <Ionicons name="pencil-outline" size={16} color={colors.text} />
        </Pressable>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{usuario?.nome ?? ""}</Text>
        <Text style={styles.email}>{usuario?.email ?? ""}</Text>
      </View>
    </View>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      marginBottom: 12,
    },
    banner: {
      height: 110,
      alignItems: "center",
      justifyContent: "center",
    },
    editButton: {
      position: "absolute",
      top: 118,
      right: 16,
      width: 36,
      height: 36,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    avatar: {
      width: 88,
      height: 88,
      borderRadius: 44,
      borderWidth: 4,
      borderColor: "#f472b6",
      backgroundColor: colors.indigo,
      marginTop: -44,
      marginLeft: 16,
    },
    avatarPlaceholder: {
      alignItems: "center",
      justifyContent: "center",
    },
    info: {
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 16,
    },
    name: {
      fontSize: 22,
      fontFamily: Fonts.title.bold,
      color: colors.text,
    },
    email: {
      fontSize: 13,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
      marginTop: 2,
    },
  });
}
