import { Colors, Fonts } from "@/constants/theme";
import {
  ActivityIndicator,
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
import { maskCEP, maskCPF, maskDate, maskPhone } from "@/utils/masks";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { StepIndicator } from "@/components/StepIndicator";
import RadioGroup from "@/components/RadioGroup";
import { DateInputField } from "@/components/DateInputField";
import { Select, SelectOption } from "@/components/Select";

// const SEXO_OPTIONS = ["Masculino", "Feminino"];
const UF_OPTIONS: SelectOption[] = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
];

export default function CadastroScreen() {
  const [step, setStep] = useState(1);

  // Passo 01
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [documento, setDocumento] = useState("");

  // Passo 02
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  async function fetchEnderecoPorCep(maskedCep: string) {
    const digits = maskedCep.replace(/\D/g, "");
    setLoadingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await response.json();

      console.log(data);

      if (data.erro) {
        console.log("CEP não encontrado");
        return;
      }

      setBairro(data.bairro ?? "");
      setCidade(data.localidade ?? "");
      setUf(data.uf ?? "");
      setEndereco(data.logradouro ?? "");
    } catch {
      console.log("Erro ao buscar CEP.");
    } finally {
      setLoadingCep(false);
    }
  }

  function handleCepChange(text: string) {
    const masked = maskCEP(text);
    setCep(masked);

    if (masked.length === 9) {
      fetchEnderecoPorCep(masked);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Logo width={165} height={53} style={styles.logo} />
          <View style={styles.divider} />
          <Text style={styles.title}>Novo Cadastro</Text>
          <StepIndicator currentStep={step} />

          {step === 1 && (
            <>
              <FormField
                label="Nome"
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o seu completo"
              />

              {/* Provisório */}
              {/* <View style={styles.sexoRow}>
                // {SEXO_OPTIONS.map((opc) => (
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
              </View> */}

              <View style={styles.field}>
                <Text style={styles.label}>Sexo</Text>
                <RadioGroup value={sexo} onChange={setSexo} />
              </View>

              {/* <FormField
                label="Data de Nascimento"
                value={dataNascimento}
                onChangeText={(data) => setDataNascimento(maskDate(data))}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
              /> */}

              <DateInputField
                label="Data de nascimento"
                value={dataNascimento}
                onChange={setDataNascimento}
              />

              <FormField
                label="Telefone"
                value={telefone}
                onChangeText={(data) => setTelefone(maskPhone(data))}
                placeholder="(11) 90000-0000"
                keyboardType="phone-pad"
                maxLength={18}
              />

              <FormField
                label="CPF"
                value={documento}
                onChangeText={(data) => setDocumento(maskCPF(data))}
                placeholder="000.000.000-00"
                keyboardType="numeric"
                maxLength={14}
              />

              <FormField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Digite o seu e-mail"
                keyboardType="email-address"
              />

              <FormField
                label="Senha"
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                secureTextEntry
              />

              <FormField
                label="Confirmar senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholder="Confirme sua senha"
                secureTextEntry
              />

              <Button label="Próximo" onPress={() => setStep(2)} />
            </>
          )}

          {step === 2 && (
            <>
              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>CEP</Text>
                  {loadingCep && (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  )}
                </View>
                <Input
                  value={cep}
                  onChangeText={handleCepChange}
                  placeholder="00000-000"
                  keyboardType="numeric"
                  maxLength={9}
                  editable={!loadingCep}
                />
              </View>

              <FormField
                label="Bairro"
                value={bairro}
                onChangeText={setBairro}
                placeholder="Digite seu Bairro"
                editable={!loadingCep}
              />

              <FormField
                label="Numero"
                value={numero}
                onChangeText={setNumero}
                placeholder="Digite seu Numero"
                keyboardType="numeric"
                editable={!loadingCep}
              />

              <FormField
                label="Cidade"
                value={cidade}
                onChangeText={setCidade}
                placeholder="Digite sua Cidade"
                editable={!loadingCep}
              />

              {/* <FormField
                label="UF"
                value={uf}
                onChangeText={setUf}
                placeholder="Digite seu Estado"
                editable={!loadingCep}
              /> */}

              <View style={styles.ufField}>
                <Text style={styles.label}>UF</Text>
                <Select
                  options={UF_OPTIONS}
                  value={uf}
                  onChange={setUf}
                  placeholder="Selecione..."
                />
              </View>

              <FormField
                label="Endereço"
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Digite seu Endereço"
                editable={!loadingCep}
              />

              <FormField
                label="Complemento"
                value={complemento}
                onChangeText={setComplemento}
                placeholder="Ex: Ao lado da FAEX"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={styles.textArea}
              />

              <Button label="Voltar" onPress={() => setStep(1)} />
              <Button label="Finalizar" />
            </>
          )}
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
    gap: 16,
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
  // sexoRow: {
  //   flexDirection: "row",
  //   gap: 8,
  // },
  // sexoOption: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: Colors.border,
  //   borderRadius: 8,
  //   paddingVertical: 8,
  //   alignItems: "center",
  // },
  // sexoOptionActive: {
  //   borderColor: Colors.primary,
  //   backgroundColor: Colors.indigo,
  // },
  // sexoText: {
  //   fontSize: 13,
  //   color: Colors.text,
  //   fontFamily: Fonts.body.regular,
  // },
  // sexoTextActive: {
  //   fontFamily: Fonts.body.bold,
  // },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.body.semiBold,
    color: Colors.text,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textArea: {
    fontSize: 12,
    fontFamily: Fonts.body.regular,
    color: Colors.text,
  },
  ufField: {
    gap: 6,
  },
});
