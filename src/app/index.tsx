import { Button } from "@/components/Button";
import { FormField } from "@/components/formField";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const LOGO = require("@/assets/logo.png");

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image style={styles.logo} source={LOGO} />

          <View style={styles.divider} />

          <Text style={styles.title}>Entre na sua Conta</Text>

          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite o seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormField
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite a sua senha"
            showToggle
          />

          <Button label="Entrar" variant="primary" />
          <Button label="Cadastra-se" variant="outline" />
          <Button label="Esqueceu sua senha?" variant="ghost" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    gap: 24,
    backgroundColor: "#FFF",
  },
  logo: {
    width: 145,
    height: 33,
    marginHorizontal: "auto",
    resizeMode: "contain",
  },
  divider: {
    height: 1,
    backgroundColor: "#D0D5DD",
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#101828",
    fontSize: 31,
    fontFamily: "LexendDeca_700Bold",
    lineHeight: 36,
  },
});
