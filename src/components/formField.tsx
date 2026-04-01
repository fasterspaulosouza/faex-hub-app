import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { Input } from "./Input";
import { Colors, Fonts } from "@/constants/theme";

type Props = TextInputProps & {
  label: string;
  showToggle?: boolean;
};

export function FormField({ label, showToggle, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input showToggle={showToggle} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.body.semiBold,
    color: Colors.text,
  },
});
