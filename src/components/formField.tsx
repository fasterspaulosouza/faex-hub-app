import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { Input } from "./Input";

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
    fontWeight: 500,
    color: "#101828",
  },
});
