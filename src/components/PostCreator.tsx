import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  onVideoPress?: () => void;
  onPhotoPress?: () => void;
  onSubmit?: (text: string) => void;
};

export function PostCreator({ onVideoPress, onPhotoPress, onSubmit }: Props) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Comece uma publicação"
          placeholderTextColor={Colors.icon}
          value={text}
          onChangeText={setText}
          multiline={false}
        />
        <Pressable onPress={() => onSubmit?.(text)}>
          <Ionicons name="paper-plane-outline" size={20} color={Colors.icon} />
        </Pressable>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={onVideoPress}>
          <Ionicons name="videocam-outline" size={16} color={Colors.text} />
          <Text style={styles.actionLabel}>Video</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={onPhotoPress}>
          <Ionicons name="image-outline" size={16} color={Colors.text} />
          <Text style={styles.actionLabel}>Foto</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: "hidden",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.body.regular,
    color: Colors.text,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionLabel: {
    fontSize: 13,
    fontFamily: Fonts.body.regular,
    color: Colors.text,
  },
});
