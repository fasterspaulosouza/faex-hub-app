import { Colors, Fonts } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SEXO_OPTIONS = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
];

export default function RadioGroup({ value, onChange }: Props) {
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

const styles = StyleSheet.create({
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
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.body.regular,
    color: Colors.text,
  },
});
