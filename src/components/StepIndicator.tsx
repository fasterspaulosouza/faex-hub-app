import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  currentStep: number; // 1 ou 2
};

const CIRCLE_SIZE = 32;
const STEPS = [{ label: "Perfil" }, { label: "Meu Endereço" }];

export function StepIndicator({ currentStep }: Props) {
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
                <Ionicons name="checkmark" size={16} color={Colors.white} />
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

const styles = StyleSheet.create({
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
    backgroundColor: Colors.primary,
  },
  lineInactive: {
    backgroundColor: Colors.border,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleCompleted: {
    backgroundColor: Colors.primary,
  },
  circleActive: {
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  circleInactive: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  circleText: {
    fontSize: 14,
    fontFamily: Fonts.body.semiBold,
  },
  circleTextActive: {
    color: Colors.primary,
  },
  circleTextInactive: {
    color: Colors.icon,
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
    color: Colors.text,
  },
  labelInactive: {
    color: Colors.icon,
  },
});
