import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import SearchBer from "@/components/SearchBer";
import PostCreation from "@/components/PostCreation";
import PostCard from "@/components/PostCard";

const index = () => {
  return (
    <ScrollView>
      <View style={{ flex: 0 }}>
        <Stack.Screen
          options={{
            header: () => <SearchBer />,
          }}
        />
        <PostCreation />
        <PostCard />
        <PostCard />
        <PostCard />
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});

// const index = () => {
//   // const queryClient = useQueryClient();

//   const { data, isFetched, isSuccess } = useQuery({
//     queryKey: ["getTodos"],
//     queryFn: async () => {
//       const result = await todosdk.request(readItems("todos"));
//       return result;
//     },
//   });

//   if (isFetched && isSuccess) {
//     console.log(data);
//     return (
//       <FlatList
//         // onRefresh={() => queryClient.invalidateQueries()}
//         data={data}
//         renderItem={({ item }) => <TodoCard info={item} />}
//       />
//     );
//   }
//   // let fakeData = [1, 2, 3, 4, 5];
// };

// export default index;

// const styles = StyleSheet.create({});
