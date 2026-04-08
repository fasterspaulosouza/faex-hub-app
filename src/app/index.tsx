import { Button } from "@/components/Button";
import { FormField } from "@/components/formField";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "@/assets/logo_black.svg";
import { Colors, Fonts } from "@/constants/theme";
import { Href, router } from "expo-router";

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
          <Logo width={165} height={53} style={styles.logo} />

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

          <Button
            label="Entrar"
            variant="primary"
            onPress={() => router.push("/(tabs)/inicio" as Href)}
          />
          <Button
            label="Cadastra-se"
            variant="outline"
            onPress={() => router.push("/cadastro" as Href)}
          />
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
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: Colors.text,
    fontSize: 31,
    fontFamily: Fonts.title.bold,
    lineHeight: 36,
  },
});
