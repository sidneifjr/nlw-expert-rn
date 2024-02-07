import { FlatList, View } from 'react-native';
import { CATEGORIES } from '../utils/data/products';

import { useState } from 'react';
import { CategoryButton } from '../components/category-button';
import { Header } from '../components/header';

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);
  }

  console.log(category);

  return (
    <View className="flex-1 pt-20">
      <Header
        title="Faça seu pedido"
        cartQuantityItems={5}
      />

      {/* in keyExtractor, I'm using item title as key */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
    </View>
  );
}
