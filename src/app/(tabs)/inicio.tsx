import { ActivityCard, ActivityCardData } from "@/components/ActivityCard";
import { PostCreator } from "@/components/PostCreator";
import { ProfileBanner } from "@/components/ProfileBanner";
import { Colors, Fonts } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ApiAtividade = {
  id: number;
  usuario: {
    id: number;
    nome: string;
    avatarUrl?: string;
  };
  criadaEm: string;
  privada?: boolean;
  midiaUrl?: string;
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

function mapAtividade(a: ApiAtividade): ActivityCardData {
  return {
    id: String(a.id),
    userName: a.usuario.nome,
    date: formatDate(a.criadaEm),
    isPrivate: a.privada,
    userAvatar: a.usuario.avatarUrl ? { uri: a.usuario.avatarUrl } : undefined,
    media: a.midiaUrl ? { uri: a.midiaUrl } : undefined,
  };
}

export default function InicioScreen() {
  const { usuario } = useAuth();
  const [atividades, setAtividades] = useState<ActivityCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  console.log(usuario?.foto);

  useEffect(() => {
    if (!usuario) return;
    const usuarioId = usuario.id;

    async function fetchAtividades() {
      try {
        setLoading(true);
        setErro(null);
        const { data } = await api.get(`/atividades?usuarioId=${usuarioId}`);
        console.log(data);
        setAtividades((data.atividades ?? []).map(mapAtividade));
      } catch {
        setErro("Não foi possível carregar as atividades.");
      } finally {
        setLoading(false);
      }
    }

    fetchAtividades();
  }, [usuario]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de perfil com dados do usuário autenticado */}
        <ProfileBanner />

        {/* Criador de publicação */}
        <PostCreator />

        {/* Seção de atividades */}
        <Text style={styles.sectionTitle}>Atividades</Text>

        {loading && (
          <ActivityIndicator
            style={styles.loader}
            color={Colors.primary}
            size="large"
          />
        )}

        {!loading && erro && <Text style={styles.feedbackText}>{erro}</Text>}

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
  feedbackText: {
    textAlign: "center",
    color: Colors.icon,
    fontFamily: Fonts.body.regular,
    fontSize: 14,
    marginTop: 24,
    marginHorizontal: 16,
  },
  bottomSpacing: {
    height: 20,
  },
});
