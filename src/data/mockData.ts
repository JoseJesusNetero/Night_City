// ============================================================
// 🏙️ DADOS DO BAIRRO
// 📍 src/data/mockData.ts
// ============================================================

export interface Store {
  id: string;
  name: string;
  isOpen: boolean;
  x: number;          // Posição X no mapa (0-1000)
  y: number;          // Posição Y no mapa (0-1000)
  gifImage: any;      // A imagem do personagem (require)
  hasPromotion: boolean;
  promotion?: {
    discount: string;
    description: string;
  };
  category: string;
}

export const STORES: Store[] = [
  {
    id: '1',
    name: 'Padaria do João',
    isOpen: true,
    x: 250,
    y: 400,
    gifImage: require('../../assets/characters/padeiro.png'),
    hasPromotion: true,
    promotion: { discount: '-28%', description: '2x1: Croissant Doce!' },
    category: 'Restaurantes',
  },
  {
    id: '2',
    name: 'Farmácia do Luigi',
    isOpen: true,
    x: 700,
    y: 350,
    gifImage: require('../../assets/characters/farmaceutico.png'),
    hasPromotion: false,
    category: 'Serviços',
  },
  {
    id: '3',
    name: 'Hamburgueria Artesanal',
    isOpen: false,
    x: 550,
    y: 650,
    gifImage: require('../../assets/characters/hamburguer.png'),
    hasPromotion: true,
    promotion: { discount: '-15%', description: 'Combo: Burger + Fritas' },
    category: 'Restaurantes',
  },
];
