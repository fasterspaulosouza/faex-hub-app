import { ActivityCard, ActivityCardData } from "@/components/ActivityCard";
import { PostCreator } from "@/components/PostCreator";
import { ProfileBanner } from "@/components/ProfileBanner";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { api } from "@/services/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ThemeColors } from "@/constants/theme";

type ApiPublicacao = {
  id: number;
  autorId: number;
  autor: {
    id: number;
    nome: string;
    foto?: string | null;
    avatarUrl?: string | null;
  } | null;
  conteudo: string;
  createdAt: string;
  midia: string | null;
  tipo: string;
  visibilidade: "PUBLICO" | "AMIGOS" | "PRIVADO";
  ativo: boolean;
};

type ApiAmizade = {
  id: number;
  solicitanteId: number;
  receptorId: number;
  status: string;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mapPublicacao(p: ApiPublicacao): ActivityCardData {
  const avatarUri = p.autor?.foto ?? p.autor?.avatarUrl;
  return {
    id: String(p.id),
    userName: p.autor?.nome ?? "Usuário",
    date: formatDate(p.createdAt),
    content: p.conteudo,
    isPrivate: p.visibilidade !== "PUBLICO",
    userAvatar: avatarUri ? { uri: avatarUri } : undefined,
    media: p.midia ? { uri: p.midia } : undefined,
  };
}

export default function InicioScreen() {
  const { usuario } = useAuth();
  const { colors } = useTheme();
  const usuarioId = usuario?.id;
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [publicacoes, setPublicacoes] = useState<ActivityCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    if (!usuarioId) return;
    try {
      setLoading(true);
      setErro(null);

      const [pubsRes, amizadesRes] = await Promise.all([
        api.get("/publicacoes?limite=30"),
        api.get("/amizades?limite=100"),
      ]);

      const todasPublicacoes: ApiPublicacao[] = Array.isArray(pubsRes.data)
        ? pubsRes.data
        : (pubsRes.data.dados ?? []);

      const amizadesData: ApiAmizade[] = Array.isArray(amizadesRes.data)
        ? amizadesRes.data
        : (amizadesRes.data.dados ?? []);

      const friendIds = new Set<number>();
      for (const a of amizadesData) {
        if (a.solicitanteId === usuarioId) friendIds.add(a.receptorId);
        else if (a.receptorId === usuarioId) friendIds.add(a.solicitanteId);
      }

      const feed = todasPublicacoes
        .filter((p) => p.autorId === usuarioId || friendIds.has(p.autorId))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      setPublicacoes(feed.map(mapPublicacao));
    } catch (err) {
      console.error("[InicioScreen] Erro ao buscar feed:", err);
      setErro("Não foi possível carregar o feed.");
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileBanner />

        <PostCreator />

        <Text style={styles.sectionTitle}>Feed</Text>

        {loading && (
          <ActivityIndicator
            style={styles.loader}
            color={colors.primary}
            size="large"
          />
        )}

        {!loading && erro && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{erro}</Text>
            <Pressable style={styles.retryButton} onPress={fetchFeed}>
              <Text style={styles.retryText}>Tentar novamente</Text>
            </Pressable>
          </View>
        )}

        {!loading && !erro && publicacoes.length === 0 && (
          <Text style={styles.feedbackText}>
            Nenhuma publicação encontrada.{"\n"}Adicione amigos para ver o feed deles!
          </Text>
        )}

        {!loading &&
          !erro &&
          publicacoes.map((item) => <ActivityCard key={item.id} data={item} />)}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: Fonts.title.bold,
      color: colors.text,
      marginHorizontal: 16,
      marginTop: 8,
      marginBottom: 14,
    },
    loader: {
      marginTop: 24,
    },
    feedbackContainer: {
      alignItems: "center",
      marginTop: 24,
      gap: 12,
    },
    feedbackText: {
      textAlign: "center",
      color: colors.icon,
      fontFamily: Fonts.body.regular,
      fontSize: 14,
      marginTop: 24,
      marginHorizontal: 16,
      lineHeight: 22,
    },
    retryButton: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    retryText: {
      color: colors.primary,
      fontFamily: Fonts.title.bold,
      fontSize: 13,
    },
    bottomSpacing: {
      height: 20,
    },
  });
}
