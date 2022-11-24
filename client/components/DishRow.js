import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { currencyFormat } from "./../utils";
import { urlFor } from "../sanity";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsId,
} from "./../redux/slices/basketSlice";

const DishRow = ({ id, name, desc, price, img }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsId(state, id));

  const handlePressed = (type) => {
    if (type === "add") {
      dispatch(addToBasket({ id, name, desc, price, img }));
    }

    if (type === "remove") {
      if (!items.length > 0) return;
      dispatch(removeFromBasket({ id }));
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`flex-row bg-white p-4 border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-1">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{desc}</Text>
          <Text className="text-gray-400 mt-2">{currencyFormat(price)}</Text>
        </View>
        <View>
          <Image
            source={{ uri: urlFor(img).url() }}
            className="h-20 w-20 bg-gray-300 p-4 border-2 border-gray-100"
          />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white">
          <View className="flex-row items-center space-x-2 pb-3 mx-4">
            <TouchableOpacity
              disabled={!items.length}
              onPress={() => handlePressed("remove")}
            >
              <AntDesign
                name="minuscircle"
                size={24}
                color={`${items.length > 0 ? "#00ccbb" : "gray"}`}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={() => handlePressed("add")}>
              <AntDesign name="pluscircle" size={24} color="#00ccbb" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
