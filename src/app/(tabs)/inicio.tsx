import { ActivityCard, ActivityCardData } from "@/components/ActivityCard";
import { PostCreator } from "@/components/PostCreator";
import { ProfileBanner } from "@/components/ProfileBanner";
import { Colors, Fonts } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ApiPublicacao = {
  id: number;
  autor: {
    id: number;
    nome: string;
    foto?: string;
    avatarUrl?: string;
  } | null;
  autorId: number;
  conteudo: string;
  createdAt: string;
  midia: string | null;
  tipo: string;
  visibilidade: "PUBLICO" | "AMIGOS" | "PRIVADO";
  ativo: boolean;
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
  const usuarioId = usuario?.id;

  const [atividades, setAtividades] = useState<ActivityCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchAtividades = useCallback(async () => {
    if (!usuarioId) return;
    try {
      setLoading(true);
      setErro(null);
      const { data } = await api.get("/publicacoes/minhas");
      console.log(data);
      const lista = Array.isArray(data)
        ? data
        : Array.isArray(data.dados)
          ? data.dados
          : [];
      setAtividades(lista.map(mapPublicacao));
    } catch (err) {
      console.error("[InicioScreen] Erro ao buscar atividades:", err);
      setErro("Não foi possível carregar as atividades.");
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  // Só re-busca quando o ID do usuário muda (não a cada refresh de dados do usuário)
  useEffect(() => {
    fetchAtividades();
  }, [fetchAtividades]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileBanner />

        <PostCreator />

        <Text style={styles.sectionTitle}>Atividades</Text>

        {loading && (
          <ActivityIndicator
            style={styles.loader}
            color={Colors.primary}
            size="large"
          />
        )}

        {!loading && erro && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{erro}</Text>
            <Pressable style={styles.retryButton} onPress={fetchAtividades}>
              <Text style={styles.retryText}>Tentar novamente</Text>
            </Pressable>
          </View>
        )}

        {!loading && !erro && atividades.length === 0 && (
          <Text style={styles.feedbackText}>Nenhuma atividade encontrada.</Text>
        )}

        {!loading &&
          !erro &&
          atividades.map((item) => <ActivityCard key={item.id} data={item} />)}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.title.bold,
    color: Colors.text,
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
    color: Colors.icon,
    fontFamily: Fonts.body.regular,
    fontSize: 14,
    marginHorizontal: 16,
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  retryText: {
    color: Colors.primary,
    fontFamily: Fonts.title.bold,
    fontSize: 13,
  },
  bottomSpacing: {
    height: 20,
  },
});
