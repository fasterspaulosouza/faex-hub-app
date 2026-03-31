import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

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
          style={[styles.input, styles.inputFlex, style]}
          secureTextEntry={!visible}
          autoCapitalize="none"
          {...rest}
        />
        <Pressable
          style={styles.eyeButton}
          onPress={() => setVisible((v) => !v)}
        >
          <Text style={styles.eyeText}>{visible ? "🙈" : "👁️"}</Text>
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
    borderColor: "#D0D5DD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Inter_400Regular",
    color: "#101828",
  },
  inputFlex: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  eyeButton: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  eyeText: {
    fontSize: 16,
  },
});
