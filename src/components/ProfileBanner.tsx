import Logo from "@/assets/logo_white.svg";
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

type Props = {
  name: string;
  email: string;
  avatarUri?: ImageSourcePropType;
  onEditPress?: () => void;
};

export function ProfileBanner({ name, email, avatarUri, onEditPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Logo />
      </View>

      <Pressable style={styles.editBotton} onPress={onEditPress}>
        <Ionicons name="pencil-outline" size={16} color={Colors.text} />
      </Pressable>

      {/* Deixar o import dinamico via url */}
      <Image source={avatarUri} style={styles.avatar} />

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
    height: 100,
    backgroundColor: "#b8c4ea",
    alignItems: "center",
    justifyContent: "center",
  },
  editBotton: {
    position: "absolute",
    top: 108,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#f472b6",
    backgroundColor: Colors.indigo,
    marginTop: -40,
    marginLeft: 16,
  },
  info: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    marginTop: 8,
  },
  name: {
    fontSize: 20,
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
