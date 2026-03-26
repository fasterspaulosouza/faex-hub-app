import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Cadastro() {
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
          <Image source={require("@/assets/person2.png")} style={styles.logo} />
          <Text style={styles.title}>Cadastre-se</Text>
          <Text style={styles.subtitle}>
            Preencha o formulário abaixo para se cadastrar.
          </Text>

          <View style={styles.form}>
            <Input placeholder="Nome" />
            <Input placeholder="E-mail" keyboardType="email-address" />
            <Input placeholder="Senha" secureTextEntry />
            <Input placeholder="Confirme sua senha" secureTextEntry />
            <Button label="Cadastrar" onPress={() => console.log("oi")} />
            <Text style={styles.register}>
              Já possui cadastro? <Link href="/">Faça o Login</Link>
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
