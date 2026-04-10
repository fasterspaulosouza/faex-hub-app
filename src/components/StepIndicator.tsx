import { Fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ThemeColors } from "@/constants/theme";

type Props = {
  currentStep: number;
};

const CIRCLE_SIZE = 32;
const STEPS = [{ label: "Perfil" }, { label: "Meu Endereço" }];

export function StepIndicator({ currentStep }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.circlesRow}>
        {STEPS.flatMap((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          const elements = [];

          if (index > 0) {
            elements.push(
              <View
                key={`line-${index}`}
                style={[
                  styles.line,
                  isCompleted ? styles.lineCompleted : styles.lineInactive,
                ]}
              />,
            );
          }

          elements.push(
            <View
              key={`circle-${index}`}
              style={[
                styles.circle,
                isCompleted && styles.circleCompleted,
                isActive && styles.circleActive,
                !isCompleted && !isActive && styles.circleInactive,
              ]}
            >
              {isCompleted ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text
                  style={[
                    styles.circleText,
                    isActive
                      ? styles.circleTextActive
                      : styles.circleTextInactive,
                  ]}
                >
                  {stepNumber}
                </Text>
              )}
            </View>,
          );

          return elements;
        })}
      </View>

      <View style={styles.labelsRow}>
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;

          return (
            <Text
              key={index}
              style={[
                styles.label,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {step.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    wrapper: {
      gap: 6,
      width: 180,
      alignSelf: "center",
    },
    circlesRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    line: {
      flex: 1,
      height: 1,
    },
    lineCompleted: {
      backgroundColor: colors.primary,
    },
    lineInactive: {
      backgroundColor: colors.border,
    },
    circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    circleCompleted: {
      backgroundColor: colors.primary,
    },
    circleActive: {
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.card,
    },
    circleInactive: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    circleText: {
      fontSize: 14,
      fontFamily: Fonts.body.semiBold,
    },
    circleTextActive: {
      color: colors.primary,
    },
    circleTextInactive: {
      color: colors.icon,
    },
    labelsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    label: {
      fontSize: 12,
      fontFamily: Fonts.body.semiBold,
    },
    labelActive: {
      color: colors.text,
    },
    labelInactive: {
      color: colors.icon,
    },
  });
}
