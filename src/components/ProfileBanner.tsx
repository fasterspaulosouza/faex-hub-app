import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LogoWhite from "@/assets/logo_white.svg";

type Props = {
  name: string;
  email: string;
  avatar?: ImageSourcePropType;
  onEditPress?: () => void;
};

export function ProfileBanner({ name, email, avatar, onEditPress }: Props) {
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
      <Image source={avatar ?? {}} style={styles.avatar} />

      {/* Botão de editar */}
      <Pressable style={styles.editButton} onPress={onEditPress}>
        <Ionicons name="pencil-outline" size={16} color={Colors.text} />
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
    borderColor: Colors.border,
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.indigo,
    marginTop: -44,
    marginLeft: 16,
  },
  info: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  name: {
    fontSize: 22,
    fontFamily: Fonts.title.bold,
    color: Colors.text,
  },
  email: {
    fontSize: 13,
    fontFamily: Fonts.body.regular,
    color: Colors.icon,
    marginTop: 2,
  },
});
