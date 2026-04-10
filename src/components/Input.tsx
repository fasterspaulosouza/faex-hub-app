import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ThemeColors } from "@/constants/theme";

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
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  if (showToggle) {
    return (
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputWithIcon, style]}
          secureTextEntry={!visible}
          autoCapitalize="none"
          placeholderTextColor={colors.icon}
          {...rest}
        />
        <Pressable
          style={styles.eyeButton}
          onPress={() => setVisible((v) => !v)}
        >
          <Ionicons
            name={visible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.icon}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <TextInput
      style={[styles.input, style]}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={colors.icon}
      {...rest}
    />
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontFamily: Fonts.body.regular,
      color: colors.text,
      backgroundColor: colors.background,
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
}
