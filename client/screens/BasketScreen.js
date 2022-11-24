import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../redux/slices/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../redux/slices/basketSlice";
import { useDispatch } from "react-redux";
import { currencyFormat, groupByKey } from "../utils";
import { AntDesign } from "@expo/vector-icons";
import { urlFor } from "./../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    const data = groupByKey(items, "id");
    setGroupedItems(data);
  }, [items]);

  // console.log(groupedItems);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <AntDesign name="closecircle" size={30} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            source={{ uri: "https://links.papareact.com/wru" }}
          />
          <Text className="flex-1">Delivery in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-400">
          {Object.entries(groupedItems).map(([key, val]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00ccbb]">{val.length}</Text>
              <Image
                source={{ uri: urlFor(val[0]?.img).url() }}
                className="w-12 h-12 rounded-full"
              />
              <Text className="flex-1">{val[0]?.name}</Text>
              <Text className="text-gray-600">
                {currencyFormat(val[0]?.price * val?.length)}
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">SubTotal</Text>
            <Text className="text-gray-600">{currencyFormat(basketTotal)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-600">Delivery fee</Text>
            <Text className="text-gray-600">{currencyFormat(3.5)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-600">Order Total</Text>
            <Text className="font-extrabold">
              {currencyFormat(basketTotal + 3.5)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className={`rounded-lg ${
              items.length > 0 ? "bg-[#00ccbb]" : "bg-gray-500"
            } p-4`}
            disabled={!items.length > 0}
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
