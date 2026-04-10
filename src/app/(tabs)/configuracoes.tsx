import { ProfileBanner } from "@/components/ProfileBanner";
import { useTheme } from "@/context/ThemeContext";
import { api } from "@/services/api";
import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ThemeColors } from "@/constants/theme";

// ─── Campo de senha ───────────────────────────────────────────────────────────

function SenhaField({
  label,
  value,
  onChangeText,
  colors,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  colors: ThemeColors;
}) {
  const [visivel, setVisivel] = useState(false);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visivel}
          autoCapitalize="none"
          placeholderTextColor={colors.icon}
          placeholder="••••••••"
        />
        <Pressable style={styles.eyeBtn} onPress={() => setVisivel((v) => !v)}>
          <Ionicons
            name={visivel ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function ConfiguracoesScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleAlterarSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert("Atenção", "A nova senha e a confirmação não coincidem.");
      return;
    }
    if (novaSenha.length < 6) {
      Alert.alert("Atenção", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setSalvando(true);
    try {
      await api.patch("/auth/senha", { senhaAtual, novaSenha });
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ?? "Erro ao alterar senha. Tente novamente.";
      Alert.alert("Erro", msg);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: "padding", android: "height" })}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header com perfil ─────────────────────────────────── */}
          <ProfileBanner />

          {/* ── Aparência ─────────────────────────────────────────── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aparência</Text>

            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <Ionicons
                    name={isDark ? "moon" : "sunny-outline"}
                    size={22}
                    color={colors.primary}
                  />
                  <View style={styles.rowText}>
                    <Text style={styles.rowLabel}>Modo escuro</Text>
                    <Text style={styles.rowDesc}>
                      {isDark ? "Tema escuro ativado" : "Tema claro ativado"}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.muted, true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
            </View>
          </View>

          {/* ── Alterar senha ─────────────────────────────────────── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Segurança</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Alterar senha</Text>

              <SenhaField
                label="Senha atual"
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                colors={colors}
              />
              <SenhaField
                label="Nova senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                colors={colors}
              />
              <SenhaField
                label="Confirmar nova senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                colors={colors}
              />

              <Pressable
                style={[styles.saveButton, salvando && styles.saveButtonDisabled]}
                onPress={handleAlterarSenha}
                disabled={salvando}
              >
                <Text style={styles.saveButtonText}>
                  {salvando ? "Salvando..." : "Salvar nova senha"}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 32,
    },

    // Seção
    section: {
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 12,
      fontFamily: Fonts.body.bold,
      color: colors.icon,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 10,
    },

    // Card
    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      gap: 16,
    },
    cardTitle: {
      fontSize: 15,
      fontFamily: Fonts.title.bold,
      color: colors.text,
    },

    // Linha toggle
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
    rowText: {
      flex: 1,
    },
    rowLabel: {
      fontSize: 15,
      fontFamily: Fonts.body.semiBold,
      color: colors.text,
    },
    rowDesc: {
      fontSize: 12,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
      marginTop: 1,
    },

    // Campo senha
    fieldContainer: {
      gap: 6,
    },
    fieldLabel: {
      fontSize: 13,
      fontFamily: Fonts.body.semiBold,
      color: colors.text,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.background,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 11,
      fontFamily: Fonts.body.regular,
      color: colors.text,
      fontSize: 14,
    },
    eyeBtn: {
      padding: 10,
    },

    // Botão salvar
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 13,
      alignItems: "center",
      marginTop: 4,
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveButtonText: {
      color: "#fff",
      fontFamily: Fonts.title.bold,
      fontSize: 15,
    },

    bottomSpacing: {
      height: 20,
    },
  });
}
