import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import sanityClient from "../sanity";
import { urlFor } from "../sanity";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [category, setCategory] = useState([]);

  useEffect(async () => {
    const data = await sanityClient.fetch(`*[ _type == "category"]{
      ...,
    }
    `);

    setCategory(data);
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {/* Category Card */}
      {category?.map((item) => (
        <CategoryCard
          key={item._id}
          title={item.name}
          imgUrl={urlFor(item.image).width(200).url()}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
