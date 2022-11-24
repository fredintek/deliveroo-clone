import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../redux/slices/restaurantSlice";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign name="closecircle" size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help?</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-3xl font-bold">45-55 Minutes</Text>
            </View>

            <Image
              source={{ uri: "https://links.papareact.com/wru" }}
              className="h-12 w-12"
            />
          </View>
          <Progress.Bar size={30} indeterminate={true} color="#00ccbb" />

          <Text className="mt-3 text-gray-500">
            Your order at{" "}
            <Text className="text-[#00ccbb]">{restaurant.title}</Text> is being
            prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          longitude: restaurant.lng,
          latitude: restaurant.lat,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 z-0 -mt-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.title}
          description={restaurant.short_desc}
          pinColor="#00ccbb"
          identifier="origin"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="ml-4 h-12 w-12 bg-gray-300 p-4 rounded-full mt-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Alfred Arinze</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>

        <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
