import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const LOGO = require("@/assets/logo.png");

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

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

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite o seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite a sua senha"
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setMostrarSenha((v) => !v)}
              >
                <Text style={styles.eyeText}>{mostrarSenha ? "🙈" : "👁️"}</Text>
              </Pressable>
            </View>
          </View>

          <Input placeholder="Digite o seu e-mail" />
          <Input placeholder="Digite a sua senha" showToggle={true} />

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
    fontWeight: 600,
    lineHeight: 36,
  },
  fieldGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "#101828",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#101828",
  },
  inputFlex: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
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
