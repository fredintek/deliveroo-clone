import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../redux/slices/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_desc,
      dishes,
      lng,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_desc,
        dishes,
        lng,
        lat,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView className="pb-1">
        <StatusBar backgroundColor="#00ccbb" />
        <View className="relative">
          <Image
            className="w-full h-56 p-4 bg-gray-400"
            source={{ uri: urlFor(imgUrl).url() }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute justify-center items-center top-10 left-5 bg-white h-10 w-10 rounded-full"
          >
            <AntDesign name="arrowleft" size={24} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-medium">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-3">
                <Entypo name="star" size={22} color="#00ccbb" />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-400">
                    {rating} . {genre}
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <Entypo name="location-pin" size={22} color="#00ccbb" />
                <Text className="text-xs text-gray-500">
                  Nearby . {address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{short_desc}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <AntDesign name="questioncircle" size={22} color="gray" />
            <Text className="pt-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <Entypo name="chevron-right" size={24} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 font-bold text-xl">Menu</Text>

          {/* Dishes Rows */}

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              desc={dish.short_description}
              price={dish.price}
              img={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
