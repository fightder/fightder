import { Text } from "./Text";
import { View } from "./View";

export const JsonViewer = ({ json, ...props }) => {
  function beautifyJson(jsonString: string): string {
    try {
      const jsonObject = JSON.parse(jsonString);
      const beautifiedJson = JSON.stringify(jsonObject, null, 2).replace(
        /\n/g,
        "\n  "
      );
      return beautifiedJson;
    } catch (error) {
      // Handle JSON parsing errors
      // console.error("Error parsing JSON:", error.message);
      return JSON.stringify(jsonString); // Return the original string if there's an error
    }
  }

  console.log(beautifyJson(json));
  return (
    <View p={5} r={10} bg={2}>
      <Text>{beautifyJson(json)}</Text>
    </View>
  );
};
