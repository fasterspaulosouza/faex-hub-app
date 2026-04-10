import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useMemo } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import type { ThemeColors } from "@/constants/theme";

type Variant = "primary" | "outline" | "ghost";

type Props = PressableProps & {
  label: string;
  variant?: Variant;
};

export function Button({ label, variant = "primary", style, ...rest }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <Pressable style={[styles.base, styles[variant], style]} {...rest}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    base: {
      borderRadius: 8,
      paddingVertical: 13,
      alignItems: "center",
    },
    primary: {
      backgroundColor: colors.primary,
    },
    outline: {
      borderWidth: 1,
      borderColor: colors.primary,
    },
    ghost: {},
    text: {
      fontSize: 16,
      fontFamily: Fonts.body.semiBold,
    },
    primaryText: {
      color: "#fff",
    },
    outlineText: {
      color: colors.primary,
    },
    ghostText: {
      color: colors.primary,
      fontSize: 13,
      textDecorationLine: "underline",
    },
  });
}
