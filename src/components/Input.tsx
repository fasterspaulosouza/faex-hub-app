import { Colors, Fonts } from "@/constants/theme";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Props = TextInputProps & {
  showToggle?: boolean;
};

export function Input({
  showToggle = false,
  secureTextEntry,
  style,
  ...rest
}: Props) {
  const [visible, setVisible] = useState(false);

  if (showToggle) {
    return (
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputWithIcon, style]}
          secureTextEntry={!visible}
          autoCapitalize="none"
          {...rest}
        />
        <Pressable
          style={styles.eyeButton}
          onPress={() => setVisible((v) => !v)}
        >
          <Ionicons
            name={visible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={Colors.icon}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <TextInput
      style={[styles.input, style]}
      secureTextEntry={secureTextEntry}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.body.regular,
    color: Colors.text,
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  eyeButton: {
    position: "absolute",
    padding: 4,
    right: 12,
  },
});
