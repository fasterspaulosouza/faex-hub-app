import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { ThemeColors } from "@/constants/theme";

export type ActivityCardData = {
  id: string;
  userName: string;
  date: string;
  content?: string;
  isPrivate?: boolean;
  userAvatar?: ImageSourcePropType;
  media?: ImageSourcePropType;
};

type Props = {
  data: ActivityCardData;
};

export function ActivityCard({ data }: Props) {
  const [liked, setLiked] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      {/* Cabeçalho do card */}
      <View style={styles.header}>
        <Image source={data.userAvatar ?? {}} style={styles.userAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{data.userName}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.date}>{data.date}</Text>
            {data.isPrivate && (
              <>
                <Text style={styles.dot}> • </Text>
                <Ionicons name="lock-closed" size={12} color={colors.icon} />
              </>
            )}
          </View>
        </View>
      </View>

      {/* Conteúdo de texto */}
      {data.content && (
        <Text style={styles.content}>{data.content}</Text>
      )}

      {/* Thumbnail da mídia */}
      {data.media && (
        <View style={styles.mediaThumbnail}>
          <Image
            source={data.media}
            style={styles.mediaImage}
            resizeMode="cover"
          />
          <Pressable style={styles.playButton}>
            <Ionicons name="play" size={30} color="#fff" />
          </Pressable>
        </View>
      )}

      {/* Ação de curtir */}
      <Pressable
        style={styles.likeButton}
        onPress={() => setLiked((prev) => !prev)}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={20}
          color={liked ? "#ef4444" : colors.icon}
        />
        <Text style={[styles.likeText, liked && styles.likeTextActive]}>
          Curtir
        </Text>
      </Pressable>
    </View>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginHorizontal: 16,
      marginBottom: 14,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 12,
      gap: 10,
    },
    userAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
      borderColor: "#f472b6",
      backgroundColor: colors.indigo,
    },
    headerInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 14,
      fontFamily: Fonts.body.bold,
      color: colors.text,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
    },
    date: {
      fontSize: 12,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
    },
    dot: {
      fontSize: 12,
      color: colors.icon,
    },
    content: {
      fontSize: 14,
      fontFamily: Fonts.body.regular,
      color: colors.text,
      paddingHorizontal: 14,
      paddingBottom: 12,
      lineHeight: 20,
    },
    mediaThumbnail: {
      height: 220,
      backgroundColor: "#1a2035",
      alignItems: "center",
      justifyContent: "center",
    },
    mediaImage: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
    },
    playButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "rgba(0,0,0,0.45)",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 4,
    },
    likeButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    likeText: {
      fontSize: 13,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
    },
    likeTextActive: {
      color: "#ef4444",
    },
  });
}
