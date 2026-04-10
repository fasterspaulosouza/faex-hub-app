import { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { maskDate } from "@/utils/masks";
import type { ThemeColors } from "@/constants/theme";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function parseDate(str: string): Date {
  const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const d = new Date(+match[3], +match[2] - 1, +match[1]);
    if (!isNaN(d.getTime())) return d;
  }
  return new Date(2000, 0, 1);
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

export function DateInputField({ label, value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  function handlePickerChange(_: DateTimePickerEvent, date?: Date) {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (date) {
      onChange(formatDate(date));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => onChange(maskDate(text))}
          placeholder="dd/mm/aaaa"
          placeholderTextColor={colors.icon}
          keyboardType="numeric"
          maxLength={10}
        />
        <Pressable
          style={styles.iconButton}
          onPress={() => setShowPicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color={colors.icon} />
        </Pressable>
      </View>

      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={parseDate(value)}
          mode="date"
          display="calendar"
          onChange={handlePickerChange}
          maximumDate={new Date()}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={showPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setShowPicker(false)}>
                  <Text style={styles.modalDone}>Confirmar</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={parseDate(value)}
                mode="date"
                display="spinner"
                onChange={handlePickerChange}
                maximumDate={new Date()}
                locale="pt-BR"
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      gap: 6,
    },
    label: {
      fontSize: 14,
      fontFamily: Fonts.body.semiBold,
      color: colors.text,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      paddingRight: 44,
      fontFamily: Fonts.body.regular,
      color: colors.text,
      backgroundColor: colors.background,
    },
    iconButton: {
      position: "absolute",
      right: 12,
      padding: 4,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalContent: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingBottom: 24,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalDone: {
      fontSize: 16,
      fontFamily: Fonts.body.semiBold,
      color: colors.primary,
    },
  });
}
