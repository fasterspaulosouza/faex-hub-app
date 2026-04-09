import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type ActivityCardData = {
  id: string;
  userName: string;
  date: string;
  isPrivate?: boolean;
  userAvatar?: ImageSourcePropType;
  media?: ImageSourcePropType;
};

type Props = {
  data: ActivityCardData;
};

export function ActivityCard({ data }: Props) {
  const [liked, setLiked] = useState(false);

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
                <Ionicons name="lock-closed" size={12} color={Colors.icon} />
              </>
            )}
          </View>
        </View>
      </View>

      {/* Thumbnail da mídia */}
      <View style={styles.mediaThumbnail}>
        <Image
          source={data.media ?? {}}
          style={styles.mediaImage}
          resizeMode="cover"
        />
        <Pressable style={styles.playButton}>
          <Ionicons name="play" size={30} color={Colors.white} />
        </Pressable>
      </View>

      {/* Ação de curtir */}
      <Pressable
        style={styles.likeButton}
        onPress={() => setLiked((prev) => !prev)}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={20}
          color={liked ? "#ef4444" : Colors.icon}
        />
        <Text style={[styles.likeText, liked && styles.likeTextActive]}>
          Curtir
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
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
    backgroundColor: Colors.indigo,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontFamily: Fonts.body.bold,
    color: Colors.text,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    fontFamily: Fonts.body.regular,
    color: Colors.icon,
  },
  dot: {
    fontSize: 12,
    color: Colors.icon,
  },
  mediaThumbnail: {
    height: 220,
    backgroundColor: "#2d3748",
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
    color: Colors.icon,
  },
  likeTextActive: {
    color: "#ef4444",
  },
});
