import { useState } from "react";
import { Text, View } from "react-native";

export type ActivityCardData = {
  id: string;
  userName: string;
  date: string;
  isPrivate?: boolean;
  userAvatarUri?: string;
  mediaUri?: string;
};

type Props = {
  data: ActivityCardData;
};

export function ActivityCard({ data }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <View>
      <Text>{data.userName}</Text>
    </View>
  );
}
