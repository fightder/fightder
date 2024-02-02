import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { Image, ImageSourcePropType } from "react-native";

export function ProfileImage({
  size = 100,
  radius = 35,
  source,
}: {
  size?: number;
  radius?: number;
  source: ImageSourcePropType;
}) {
  const [show, setShow] = useState(true);
  return (
    <Skeleton show={show} height={size} width={size} radius={radius}>
      <Image
        onLoad={() => {
          setShow(false);
        }}
        source={source}
        style={{ width: size, height: size, borderRadius: radius }}
      />
    </Skeleton>
  );
}
