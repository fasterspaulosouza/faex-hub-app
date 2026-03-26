import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link } from "expo-router";
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

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    console.log(email, senha);
  }

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
          <Image source={require("@/assets/person1.png")} style={styles.logo} />
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>
            Acesse sua conta utilizando e-mail e senha.
          </Text>

          <View style={styles.form}>
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={setSenha}
            />
            <Button label="Entrar" onPress={() => handleLogin()} />
            <Text style={styles.register}>
              Não tem conta? <Link href="/cadastro">Cadastre-se</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  logo: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    // textAlign: "center",
  },
  subtitle: {},
  form: {
    flex: 1,
    gap: 16,
    marginTop: 32,
  },
  register: {
    textAlign: "center",
  },
});
