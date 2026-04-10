import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { ThemeColors } from "@/constants/theme";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SEXO_OPTIONS = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
];

export default function RadioGroup({ value, onChange }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      {SEXO_OPTIONS.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            style={styles.option}
            onPress={() => onChange(option.value)}
          >
            <View style={[styles.radio, isSelected && styles.radioSelected]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.label}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 24,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 20 / 2,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    radioSelected: {
      borderColor: colors.primary,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 10 / 2,
      backgroundColor: colors.primary,
    },
    label: {
      fontSize: 14,
      fontFamily: Fonts.body.regular,
      color: colors.text,
    },
  });
}
