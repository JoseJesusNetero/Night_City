import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { STORES } from '../src/data/mockData';

const CATEGORIES = ['Todos', 'Restaurantes', 'Serviços'];

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filtered = STORES.filter(
    (s) => selectedCategory === 'Todos' || s.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore o Bairro</Text>

      {/* Busca */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Buscar loja..."
          placeholderTextColor="#666"
          style={styles.searchInput}
        />
      </View>

      {/* Categorias */}
      <View style={styles.categoriesRow}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Lista */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={item.gifImage} style={styles.gif} contentFit="contain" />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: item.isOpen ? '#00ff88' : '#ff4466' },
                  ]}
                />
                <Text style={{ color: item.isOpen ? '#00ff88' : '#ff4466' }}>
                  {item.isOpen ? 'Aberto' : 'Fechado'}
                </Text>
              </View>
            </View>
            {item.hasPromotion && (
              <View style={styles.promoBadge}>
                <Text style={styles.promoBadgeText}>%</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1220', paddingTop: 50 },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2538',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
    gap: 10,
  },
  searchInput: { flex: 1, color: '#fff' },
  categoriesRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a2538',
  },
  categoryActive: { backgroundColor: '#00c8ff' },
  categoryText: { color: '#888', fontSize: 13, fontWeight: '600' },
  categoryTextActive: { color: '#0a1220' },
  card: {
    backgroundColor: '#1a2538',
    borderRadius: 16,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 255, 0.2)',
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#0a1220',
    borderRadius: 12,
    padding: 5,
  },
  gif: { width: '100%', height: '100%' },
  info: { flex: 1, marginLeft: 15 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  promoBadge: {
    backgroundColor: '#ff0044',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  promoBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
