import React, { useEffect } from "react";
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useUser } from "contexts/user.context";
import { View } from "components/View";
import { Text } from "components/Text";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { IconButton } from "components/IconButton";
import { Input } from "components/Input";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, useColorScheme } from "react-native";
import { ScrollView } from "components/ScrollView";
import { Button } from "components/Button";
import axios from "axios";
import endpoints from "constants/endpoints";
import { JsonViewer } from "components/JsonViewer";
import { useSession } from "contexts/auth.context";
import { Skeleton } from "moti/skeleton";
import { UserCard } from "components/UserCard";
import { MotiView } from "moti";

const Add = () => {
  const { user } = useUser();
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  const [search, setSearch] = React.useState("");
  const [searchActive, setSearchActice] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { session } = useSession();
  const colorMode = useColorScheme();

  const getUsers = async (search: string) => {
    // get user from api
    setLoading(true);
    try {
      const res = await axios.get(
        endpoints.fync.search.user.url + "?q=" + search,
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );
      console.log(res.data);
      setSearchResult(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (search.length > 0) getUsers(search);
  }, [search]);
  console.log(session, "session");

  return (
    <View bg={1} flex>
      <SafeTop back title={"Add Friend"} />
      {/* <ScrollView p={10} style={{ flex: 1 }}> */}
      <View p={10} col flex>
        <View row style={{ width: "100%", maxWidth: "100%" }}>
          <Input
            leftItem={
              <Ionicons
                name="person"
                size={24}
                color={colorMode == "dark" ? "#fff" : "black"}
              />
            }
            placeholder="Find your friend"
            bg={2}
            m={10}
            r={20}
            p={5}
            // variant="subtitle"
            value={search}
            onChangeText={(t) => {
              console.log(t, "fsdf");
              setSearch(t);
            }}
            onFocus={() => {
              setSearchActice(true);
            }}
            onPressIn={() => {
              setSearchActice(true);
            }}
            rightItem={
              searchActive ? (
                <Button mx={5} onPress={() => setSearchActice(false)}>
                  <Text variant="subtitle" color="primary">
                    Cancel
                  </Text>
                </Button>
              ) : null
            }
          />
        </View>
        {searchActive ? (
          <View flex>
            {loading ? (
              <MotiView
                transition={{
                  type: "timing",
                }}
                style={[styles.container, styles.padded]}
              >
                <View m={8} />
                <Skeleton height={100} colorMode={colorMode} width={"100%"} />
                <View m={8} />
                <Skeleton height={100} colorMode={colorMode} width={"100%"} />
                <View m={8} />
                <Skeleton height={100} colorMode={colorMode} width={"100%"} />
              </MotiView>
            ) : (
              <FlatList
                data={searchResult}
                renderItem={({ item }) => {
                  return <UserCard user={item} />;
                }}
              />
            )}
          </View>
        ) : (
          <View row>
            <IconButton name="qr-code" />
            <IconButton name="search" />
          </View>
        )}
      </View>
      <SafeBottom />
      {/* </ScrollView> */}
    </View>
  );
};
export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
});
