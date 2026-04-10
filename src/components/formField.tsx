import { useMemo } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { Input } from "./Input";
import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeColors } from "@/constants/theme";

type Props = TextInputProps & {
  label: string;
  showToggle?: boolean;
};

export function FormField({ label, showToggle, ...rest }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input showToggle={showToggle} {...rest} />
    </View>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      gap: 6,
    },
    label: {
      fontSize: 14,
      fontFamily: Fonts.body.semiBold,
      color: colors.text,
    },
  });
}
