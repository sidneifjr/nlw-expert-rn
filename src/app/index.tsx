import { FlatList, SectionList, Text, View } from 'react-native';
import { CATEGORIES, MENU } from '../utils/data/products';

import { Link } from 'expo-router';

import { useRef, useState } from 'react';
import { CategoryButton } from '../components/category-button';
import { Header } from '../components/header';
import { Product } from '../components/product';

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  /**
   * In this scenario, useRef is used to save the reference to a list, so we can manipulate it directly.
   */
  const sectionListRef = useRef<SectionList>(null);

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    console.log(sectionIndex);

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sectionIndex,
        itemIndex: 0,
      });
    }
  }

  // console.log(category);

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

      <SectionList
        ref={sectionListRef}
        className="flex-1 p-5"
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link
            href={`/product/${item.id}`}
            asChild
          >
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
