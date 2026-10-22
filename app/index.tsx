import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import Svg, { Image as SvgImage, G, Circle, Path, Text as SvgText } from 'react-native-svg';
import { Image } from 'expo-image';
import { STORES, Store } from '../src/data/mockData';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 1000 1000" style={StyleSheet.absoluteFill}>
        {/* Mapa base */}
        <SvgImage
          href={require('../assets/images/city-map.png')}
          width="1000"
          height="1000"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Lojas e Pins */}
        {STORES.map((store) => (
          <G key={store.id} onPress={() => setSelectedStore(store)}>
            {/* Bolinha de status */}
            <Circle
              cx={store.x}
              cy={store.y}
              r="12"
              fill={store.isOpen ? '#00ff88' : '#ff4466'}
              stroke="#0a1220"
              strokeWidth="3"
            />

            {/* Pin de promoção */}
            {store.hasPromotion && (
              <G>
                <Path
                  d={`M ${store.x} ${store.y - 10} L ${store.x - 20} ${store.y - 50} A 20 20 0 1 1 ${store.x + 20} ${store.y - 50} Z`}
                  fill="#ff0044"
                />
                <Circle cx={store.x} cy={store.y - 50} r="12" fill="#fff" />
                <SvgText
                  x={store.x}
                  y={store.y - 46}
                  fontSize="16"
                  fontWeight="bold"
                  fill="#ff0044"
                  textAnchor="middle"
                >
                  %
                </SvgText>
              </G>
            )}
          </G>
        ))}
      </Svg>

      {/* Balão de promoção */}
      {selectedStore?.hasPromotion && (
        <View style={[styles.promoBalloon, { top: (selectedStore.y / 1000) * height - 150 }]}>
          <View style={styles.promoArrow} />
          <Text style={styles.promoTitle}>PROMOÇÃO ATIVA</Text>
          <View style={styles.promoContent}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{selectedStore.promotion?.discount}</Text>
            </View>
            <Text style={styles.promoDescription}>{selectedStore.promotion?.description}</Text>
          </View>
          <Pressable style={styles.closeBtn} onPress={() => setSelectedStore(null)}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
          </Pressable>
        </View>
      )}

      {/* Card normal da loja */}
      {selectedStore && !selectedStore.hasPromotion && (
        <View style={styles.bottomCard}>
          <Image source={selectedStore.gifImage} style={styles.gif} contentFit="contain" />
          <View style={{ flex: 1 }}>
            <Text style={styles.storeName}>{selectedStore.name}</Text>
            <Text style={{ color: selectedStore.isOpen ? '#00ff88' : '#ff4466' }}>
              {selectedStore.isOpen ? 'Aberto' : 'Fechado'}
            </Text>
          </View>
          <Pressable style={styles.closeBtnDark} onPress={() => setSelectedStore(null)}>
            <Text style={{ color: '#fff' }}>X</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1220' },
  promoBalloon: {
    position: 'absolute',
    left: width / 2 - 120,
    width: 240,
    backgroundColor: '#ffeeba',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#ffcc00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  promoArrow: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffcc00',
  },
  promoTitle: {
    color: '#8a6d00',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
  promoContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  discountBadge: {
    backgroundColor: '#ffcc00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  promoDescription: { color: '#5c4a00', fontSize: 13, flex: 1 },
  closeBtn: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff0044',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#0a1220',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00c8ff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  closeBtnDark: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: '#1a2538',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#1a2538' },
  storeName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
