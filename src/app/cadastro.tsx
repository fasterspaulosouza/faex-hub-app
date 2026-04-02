import { Colors, Fonts } from "@/constants/theme";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "@/assets/logo_black.svg";
import { FormField } from "@/components/formField";
import { useState } from "react";

const SEXO_OPTIONS = ["Masculino", "Feminino"];

export default function CadastroScreen() {
  const [step, setStep] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [erro, setError] = useState("");

  // Passo 01
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [documento, setDocumento] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Logo width={165} height={53} style={styles.logo} />
          <View style={styles.divider} />
          <Text style={styles.title}>Novo Cadastro</Text>

          <FormField
            label="Nome"
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o seu completo"
          />

          {/* Provisório */}
          <View style={styles.sexoRow}>
            {SEXO_OPTIONS.map((opc) => (
              <Pressable
                key={opc}
                style={[
                  styles.sexoOption,
                  sexo === opc && styles.sexoOptionActive,
                ]}
                onPress={() => setSexo(opc)}
              >
                <Text
                  style={[
                    styles.sexoText,
                    sexo === opc && styles.sexoTextActive,
                  ]}
                >
                  {opc}
                </Text>
              </Pressable>
            ))}
          </View>

          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite o seu e-mail"
            keyboardType="email-address"
          />

          <FormField
            label="Data de Nascimento"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            placeholder="DD/MM/AAA"
            keyboardType="numeric"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    padding: 32,
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
  sexoRow: {
    flexDirection: "row",
    gap: 8,
  },
  sexoOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  sexoOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.indigo,
  },
  sexoText: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: Fonts.body.regular,
  },
  sexoTextActive: {
    fontFamily: Fonts.body.bold,
  },
});
