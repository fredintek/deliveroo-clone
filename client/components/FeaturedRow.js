import { View, Text, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import sanityClient, { urlFor } from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(async () => {
    const data = await sanityClient.fetch(
      `*[ _type == "featured" && _id == $id ]{
      ...,
      restaurants[]-> {
        ...,
        type->{
        name,
      },
      dishes[]->{
        ...
      }
      }
    }[0]`,
      { id }
    );

    setRestaurants(data?.restaurants);
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-3">
        <Text className="font-bold text-xl">{title}</Text>
        <AntDesign name="arrowright" size={24} color="#00ccbb" />
      </View>

      <Text className="px-3 text-xs text-gray-500">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_desc={restaurant.short_description}
            dishes={restaurant.dishes}
            lng={restaurant.lng}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
