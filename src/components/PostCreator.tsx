import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import type { ThemeColors } from "@/constants/theme";

type Props = {
  onVideoPress?: () => void;
  onPhotoPress?: () => void;
  onSubmit?: (text: string) => void;
};

export function PostCreator({ onVideoPress, onPhotoPress, onSubmit }: Props) {
  const [text, setText] = useState("");
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Comece uma publicação"
            placeholderTextColor={colors.icon}
            value={text}
            onChangeText={setText}
            multiline={false}
          />
          <Pressable onPress={() => onSubmit?.(text)}>
            <Ionicons
              name="paper-plane-outline"
              size={20}
              color={colors.icon}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={onVideoPress}>
          <Ionicons name="play-circle-outline" size={18} color={colors.text} />
          <Text style={styles.actionLabel}>Video</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={onPhotoPress}>
          <Ionicons name="image-outline" size={18} color={colors.text} />
          <Text style={styles.actionLabel}>Foto</Text>
        </Pressable>
      </View>
    </View>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: 16,
      marginBottom: 20,
      overflow: "hidden",
    },
    inputRow: {
      paddingHorizontal: 14,
      paddingVertical: 14,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 10,
      backgroundColor: colors.background,
    },
    input: {
      flex: 1,
      fontSize: 14,
      fontFamily: Fonts.body.regular,
      color: colors.text,
    },
    actions: {
      flexDirection: "row",
      paddingHorizontal: 14,
      paddingBottom: 12,
      gap: 10,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 7,
      paddingHorizontal: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionLabel: {
      fontSize: 13,
      fontFamily: Fonts.body.regular,
      color: colors.text,
    },
  });
}
