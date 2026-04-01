import { Colors, Fonts } from "@/constants/theme";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type Variant = "primary" | "outline" | "ghost";

type Props = PressableProps & {
  label: string;
  variant?: Variant;
};

export function Button({ label, variant = "primary", style, ...rest }: Props) {
  return (
    <Pressable style={[styles.base, styles[variant], style]} {...rest}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ghost: {},
  text: {
    fontSize: 16,
    fontFamily: Fonts.body.semiBold,
  },
  primaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  ghostText: {
    color: Colors.primary,
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
