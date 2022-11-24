import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Categories from "./../components/Categories";
import FeaturedRow from "./../components/FeaturedRow";
import sanityClient from "./../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(async () => {
    // fetch data from backend
    const data = await sanityClient.fetch(`*[ _type == "featured" ]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->{
          ...
        },
        type->{
          name
        }
      }
    }`);
    setFeaturedCategories(data);
  }, []);

  return (
    <SafeAreaView className="bg-white" style={styles.container}>
      <StatusBar backgroundColor="#00ccbb" />
      {/* HEADER */}
      <View className="flex-row pb-3 items-center mx-2 space-x-2 justify-between mt-4">
        <View className="flex-row items-end gap-2">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="inline-block h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View>
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <View className="flex-row gap-1 items-end">
              <Text className="font-bold text-xl ">Current Location</Text>
              <Ionicons name="md-chevron-down" size={20} color="#00ccbb" />
            </View>
          </View>
        </View>

        <AntDesign name="user" size={35} color="#00ccbb" />
      </View>

      {/* SEARCH */}
      <View className="flex-row items-center space-x-2 m-2">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <Ionicons name="search" size={24} color="#00ccbb" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Ionicons name="filter-outline" size={24} color="#00ccbb" />
      </View>

      {/* BODY */}
      <ScrollView
        className="bg-gray-200"
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}
        {featuredCategories.map((item) => (
          <FeaturedRow
            key={item._id}
            id={item._id}
            title={item.name}
            description={item.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
  },
});

export default HomeScreen;
