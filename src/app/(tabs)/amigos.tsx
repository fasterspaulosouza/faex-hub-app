import { ProfileBanner } from "@/components/ProfileBanner";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ThemeColors } from "@/constants/theme";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type UsuarioSimples = {
  id: number;
  nome: string;
  email: string;
  foto?: string | null;
};

type AmizadeRaw = {
  id: number;
  solicitanteId: number;
  receptorId: number;
  status: "PENDENTE" | "ACEITO" | "REJEITADO";
  solicitante?: UsuarioSimples;
  receptor?: UsuarioSimples;
};

type StatusRelacao =
  | "ACEITO"
  | "PENDENTE_ENVIADO"
  | "PENDENTE_RECEBIDO"
  | null;

type UsuarioCard = UsuarioSimples & {
  amizadeId?: number;
  statusRelacao: StatusRelacao;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Avatar({
  uri,
  size = 44,
  colors,
}: {
  uri?: string | null;
  size?: number;
  colors: ThemeColors;
}) {
  return uri ? (
    <Image
      source={{ uri }}
      style={[
        { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.indigo },
      ]}
    />
  ) : (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.indigo,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Ionicons name="person" size={size * 0.5} color={colors.white} />
    </View>
  );
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function CardPendente({
  item,
  onAceitar,
  onRejeitar,
  colors,
  styles,
}: {
  item: AmizadeRaw;
  onAceitar: (id: number) => void;
  onRejeitar: (id: number) => void;
  colors: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
}) {
  const user = item.solicitante!;
  return (
    <View style={styles.pendenteCard}>
      <Avatar uri={user.foto} size={52} colors={colors} />
      <View style={styles.pendenteInfo}>
        <Text style={styles.pendenteNome}>{user.nome}</Text>
        <Text style={styles.pendenteEmail} numberOfLines={1}>
          {user.email}
        </Text>
        <View style={styles.pendenteAcoes}>
          <Pressable
            style={styles.btnConfirmar}
            onPress={() => onAceitar(item.id)}
          >
            <Text style={styles.btnConfirmarText}>Confirmar</Text>
          </Pressable>
          <Pressable
            style={styles.btnExcluir}
            onPress={() => onRejeitar(item.id)}
          >
            <Text style={styles.btnExcluirText}>Excluir</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function CardSugestao({
  item,
  onAdicionar,
  colors,
  styles,
}: {
  item: UsuarioCard;
  onAdicionar: (id: number) => void;
  colors: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
}) {
  const isEnviado = item.statusRelacao === "PENDENTE_ENVIADO";
  const isAceito = item.statusRelacao === "ACEITO";

  return (
    <View style={styles.sugestaoCard}>
      <Avatar uri={item.foto} size={72} colors={colors} />
      <Text style={styles.sugestaoNome} numberOfLines={1}>
        {item.nome}
      </Text>
      <Text style={styles.sugestaoEmail} numberOfLines={1}>
        {item.email}
      </Text>
      <Pressable
        style={[
          styles.btnAdicionar,
          (isEnviado || isAceito) && styles.btnAdicionadoGray,
        ]}
        onPress={() => !isEnviado && !isAceito && onAdicionar(item.id)}
        disabled={isEnviado || isAceito}
      >
        {isAceito ? (
          <Text style={styles.btnAdicionadoText}>Amigos</Text>
        ) : isEnviado ? (
          <Text style={styles.btnAdicionadoText}>Solicitado</Text>
        ) : (
          <Text style={styles.btnAdicionarText}>+ Adicionar</Text>
        )}
      </Pressable>
    </View>
  );
}

function CardAmigo({
  item,
  colors,
  styles,
}: {
  item: UsuarioCard;
  colors: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
}) {
  return (
    <View style={styles.amigoRow}>
      <Avatar uri={item.foto} size={48} colors={colors} />
      <View style={styles.amigoInfo}>
        <Text style={styles.amigoNome}>{item.nome}</Text>
        <Text style={styles.amigoEmail} numberOfLines={1}>
          {item.email}
        </Text>
      </View>
      <View style={styles.btnAmigos}>
        <Text style={styles.btnAmigosText}>Amigos</Text>
      </View>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function AmigosScreen() {
  const { usuario } = useAuth();
  const { colors } = useTheme();
  const meuId = usuario?.id;
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [pendentes, setPendentes] = useState<AmizadeRaw[]>([]);
  const [amigos, setAmigos] = useState<UsuarioCard[]>([]);
  const [sugestoes, setSugestoes] = useState<UsuarioCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDados = useCallback(
    async (isRefresh = false) => {
      if (!meuId) return;
      try {
        if (!isRefresh) setLoading(true);

        const [pendentesRes, amizadesRes, enviadasRes, pubsRes] =
          await Promise.all([
            api.get("/amizades/pendentes"),
            api.get("/amizades?limite=100"),
            api.get("/amizades/enviadas"),
            api.get("/publicacoes?limite=50"),
          ]);

        const pendentesData: AmizadeRaw[] = Array.isArray(pendentesRes.data)
          ? pendentesRes.data
          : (pendentesRes.data.dados ?? []);
        setPendentes(pendentesData);

        const amizadesData: AmizadeRaw[] = Array.isArray(amizadesRes.data)
          ? amizadesRes.data
          : (amizadesRes.data.dados ?? []);

        const amigosCards: UsuarioCard[] = amizadesData.map((a) => {
          const amigo =
            a.solicitanteId === meuId ? a.receptor! : a.solicitante!;
          return { ...amigo, amizadeId: a.id, statusRelacao: "ACEITO" };
        });
        setAmigos(amigosCards);

        const amigoIds = new Set(amigosCards.map((a) => a.id));

        const enviadasData: AmizadeRaw[] = Array.isArray(enviadasRes.data)
          ? enviadasRes.data
          : (enviadasRes.data.dados ?? []);
        const enviadoIds = new Set(enviadasData.map((e) => e.receptorId));

        const pendenteRecebidoIds = new Set(
          pendentesData.map((p) => p.solicitanteId)
        );

        const pubsData = Array.isArray(pubsRes.data)
          ? pubsRes.data
          : (pubsRes.data.dados ?? []);

        const vistos = new Set<number>();
        const sugestoesCards: UsuarioCard[] = [];

        for (const pub of pubsData) {
          const autor: UsuarioSimples | null = pub.autor ?? null;
          if (!autor || autor.id === meuId || vistos.has(autor.id)) continue;
          vistos.add(autor.id);

          let statusRelacao: StatusRelacao = null;
          if (amigoIds.has(autor.id)) statusRelacao = "ACEITO";
          else if (enviadoIds.has(autor.id)) statusRelacao = "PENDENTE_ENVIADO";
          else if (pendenteRecebidoIds.has(autor.id))
            statusRelacao = "PENDENTE_RECEBIDO";

          if (statusRelacao !== "PENDENTE_RECEBIDO") {
            sugestoesCards.push({ ...autor, statusRelacao });
          }
        }

        setSugestoes(sugestoesCards);
      } catch (err) {
        console.error("[AmigosScreen] Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [meuId]
  );

  useEffect(() => {
    fetchDados();
  }, [fetchDados]);

  async function handleAceitar(amizadeId: number) {
    try {
      await api.patch(`/amizades/${amizadeId}/aceitar`);
      fetchDados(true);
    } catch (err) {
      console.error("[AmigosScreen] Erro ao aceitar:", err);
    }
  }

  async function handleRejeitar(amizadeId: number) {
    try {
      await api.patch(`/amizades/${amizadeId}/rejeitar`);
      setPendentes((prev) => prev.filter((p) => p.id !== amizadeId));
    } catch (err) {
      console.error("[AmigosScreen] Erro ao rejeitar:", err);
    }
  }

  async function handleEnviar(receptorId: number) {
    setSugestoes((prev) =>
      prev.map((s) =>
        s.id === receptorId ? { ...s, statusRelacao: "PENDENTE_ENVIADO" } : s
      )
    );
    try {
      await api.post("/amizades", { receptorId });
    } catch (err) {
      console.error("[AmigosScreen] Erro ao enviar solicitação:", err);
      setSugestoes((prev) =>
        prev.map((s) =>
          s.id === receptorId ? { ...s, statusRelacao: null } : s
        )
      );
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchDados(true);
            }}
            colors={[colors.primary]}
          />
        }
      >
        <ProfileBanner />

        {/* ── Solicitações recebidas ─────────────────────────────── */}
        {pendentes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Solicitações de amizade{" "}
              <Text style={styles.sectionCount}>{pendentes.length}</Text>
            </Text>
            {pendentes.map((item) => (
              <CardPendente
                key={item.id}
                item={item}
                onAceitar={handleAceitar}
                onRejeitar={handleRejeitar}
                colors={colors}
                styles={styles}
              />
            ))}
          </View>
        )}

        {/* ── Sugestões para você ────────────────────────────────── */}
        {sugestoes.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sugestões para você</Text>
              <Pressable>
                <Text style={styles.verTudo}>Ver tudo</Text>
              </Pressable>
            </View>
            <FlatList
              data={sugestoes}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sugestoesList}
              renderItem={({ item }) => (
                <CardSugestao
                  item={item}
                  onAdicionar={handleEnviar}
                  colors={colors}
                  styles={styles}
                />
              )}
            />
          </View>
        )}

        {/* ── Meus amigos ────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Amigos{" "}
            {amigos.length > 0 && (
              <Text style={styles.sectionCount}>{amigos.length}</Text>
            )}
          </Text>
          {amigos.length === 0 ? (
            <Text style={styles.emptyText}>
              Você ainda não tem amigos adicionados.
            </Text>
          ) : (
            amigos.map((item) => (
              <CardAmigo key={item.id} item={item} colors={colors} styles={styles} />
            ))
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    section: {
      paddingTop: 20,
      paddingHorizontal: 16,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: 17,
      fontFamily: Fonts.title.bold,
      color: colors.text,
      marginBottom: 12,
    },
    sectionCount: {
      color: colors.icon,
      fontFamily: Fonts.body.regular,
      fontSize: 15,
    },
    verTudo: {
      fontSize: 13,
      fontFamily: Fonts.body.bold,
      color: colors.primary,
      marginBottom: 12,
    },
    emptyText: {
      fontSize: 14,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
      textAlign: "center",
      paddingVertical: 16,
    },
    bottomSpacing: {
      height: 24,
    },

    // Card pendente
    pendenteCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      marginBottom: 16,
    },
    pendenteInfo: {
      flex: 1,
    },
    pendenteNome: {
      fontSize: 14,
      fontFamily: Fonts.body.bold,
      color: colors.text,
    },
    pendenteEmail: {
      fontSize: 12,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
      marginTop: 2,
      marginBottom: 8,
    },
    pendenteAcoes: {
      flexDirection: "row",
      gap: 8,
    },
    btnConfirmar: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 7,
      alignItems: "center",
    },
    btnConfirmarText: {
      color: "#fff",
      fontFamily: Fonts.body.bold,
      fontSize: 13,
    },
    btnExcluir: {
      flex: 1,
      backgroundColor: colors.muted,
      borderRadius: 8,
      paddingVertical: 7,
      alignItems: "center",
    },
    btnExcluirText: {
      color: colors.text,
      fontFamily: Fonts.body.bold,
      fontSize: 13,
    },

    // Card sugestão (horizontal)
    sugestoesList: {
      gap: 10,
      paddingBottom: 4,
    },
    sugestaoCard: {
      width: 140,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 12,
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.card,
    },
    sugestaoNome: {
      fontSize: 13,
      fontFamily: Fonts.body.bold,
      color: colors.text,
      textAlign: "center",
    },
    sugestaoEmail: {
      fontSize: 11,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
      textAlign: "center",
    },
    btnAdicionar: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 7,
      paddingHorizontal: 14,
      marginTop: 4,
      width: "100%",
      alignItems: "center",
    },
    btnAdicionadoGray: {
      backgroundColor: colors.muted,
    },
    btnAdicionarText: {
      color: "#fff",
      fontFamily: Fonts.body.bold,
      fontSize: 12,
    },
    btnAdicionadoText: {
      color: colors.text,
      fontFamily: Fonts.body.bold,
      fontSize: 12,
    },

    // Row amigos aceitos
    amigoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    amigoInfo: {
      flex: 1,
    },
    amigoNome: {
      fontSize: 14,
      fontFamily: Fonts.body.bold,
      color: colors.text,
    },
    amigoEmail: {
      fontSize: 12,
      fontFamily: Fonts.body.regular,
      color: colors.icon,
      marginTop: 1,
    },
    btnAmigos: {
      backgroundColor: colors.muted,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    btnAmigosText: {
      color: colors.text,
      fontFamily: Fonts.body.bold,
      fontSize: 12,
    },
  });
}
