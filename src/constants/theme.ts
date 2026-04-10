export type ThemeColors = {
  primary: string;
  text: string;
  border: string;
  background: string;
  card: string;
  white: string;
  black: string;
  icon: string;
  indigo: string;
  muted: string;
};

export const lightColors: ThemeColors = {
  primary: "#1e2533",
  text: "#101828",
  border: "#D0D5DD",
  background: "#F8FAFC",
  card: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000",
  icon: "#9CA3AF",
  indigo: "#eef2ff",
  muted: "#e5e7eb",
};

export const darkColors: ThemeColors = {
  primary: "#4a7cff",
  text: "#f1f5f9",
  border: "#334155",
  background: "#0f172a",
  card: "#1e293b",
  white: "#FFFFFF",
  black: "#000000",
  icon: "#94a3b8",
  indigo: "#1e3a5f",
  muted: "#334155",
};

// Alias mantido para compatibilidade (aponta para tema claro)
export const Colors = lightColors;

export const Fonts = {
  title: {
    regular: "LexendDeca_400Regular",
    semiBold: "LexendDeca_500SemiBold",
    bold: "LexendDeca_700Bold",
  },
  body: {
    regular: "Inter_400Regular",
    semiBold: "Inter_500SemiBold",
    bold: "Inter_700Bold",
  },
} as const;
