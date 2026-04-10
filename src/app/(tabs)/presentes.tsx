import { View } from "react-native";

// Stub – esta rota existe apenas para que o Expo Router registre o segmento.
// A tab "Sair" intercepta o tabPress no _layout.tsx e exibe a modal de logout,
// portanto esta tela nunca é renderizada.
export default function SairStub() {
  return <View />;
}
