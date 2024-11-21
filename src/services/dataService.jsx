export const sellers = [
    { 
      id: 1, 
      name: 'Lavender Lane Florals', 
      description: 'Specializing in elegant floral arrangements for every occasion, from weddings to celebrations of life.',
      location: '123 Blossom St, Roseville, CA',
      image: './fs1.jpg' 
    },
    { 
      id: 2, 
      name: 'Sunshine Flowers & Gifts', 
      description: 'Crafting handmade flower arrangements that brighten up any event or gift-giving moment.',
      location: '456 Petal Ave, Springdale, TX',
      image: './fs2.jpg' 
    },
    { 
      id: 3, 
      name: 'Floral Harmony', 
      description: 'Offering tasteful floral designs for funerals, memorials, and celebrations of life, with a focus on peace and remembrance.',
      location: '789 Serenity Ln, Bloomtown, FL',
      image: './fs3.jpg' 
    },
  ];
  
  
export const products = {
    1: [
      { id: 1, name: 'Sunflower Bouquet', price: 800, image: '/sunflowerb.jpg' },
      { id: 2, name: 'Orchid Delight', price: 1500, image: '/orchid.jpg' },
      { id: 3, name: 'Lavender Basket', price: 950, image: '/lavb.jpg' },
      { id: 4, name: 'Mixed Roses', price: 1300, image: '/mr.jpg' },
      { id: 5, name: 'Tulip Bouquet', price: 1200, image: '/tulipb.jpg' },
    ],
    2: [
      { id: 1, name: 'Handmade Wreath', price: 1500, image: '/handw.jpg' },
      { id: 2, name: 'Floral Arrangement in Vase', price: 1600, image: '/va.jpg' },
      { id: 3, name: 'Peony Bouquet', price: 1100, image: '/peonyb.jpg' },
      { id: 4, name: 'Freesia Bouquet', price: 850, image: '/freesia.jpg' },
      { id: 5, name: 'Sweet Pea Basket', price: 950, image: '/sweetpea.jpg' },
    ],
    3: [
      { id: 1, name: 'Poppy Arrangement', price: 1300, image: '/poppy.jpg' },
      { id: 2, name: 'Gerbera Daisy Bouquet', price: 1100, image: '/gerbera.jpg' },
      { id: 3, name: 'Iris Arrangement', price: 1200, image: '/iris.jpg' },
      { id: 4, name: 'Jasmine Bouquet', price: 950, image: '/jasmine.jpg' },
      { id: 5, name: 'Chrysanthemum Arrangement', price: 1000, image: '/chrysanthemum.jpg' },
    ],
  };
  

export const flowerAddOns = {
  // Core add-ons for all shops
  coreAddOns: [
    { id: 1, name: 'Glass Vase', price: 150, image: '/gv.jpg' },
    { id: 2, name: 'Greeting Card', price: 50, image: '/gc.jpg' },
    { id: 3, name: 'Flower Food', price: 30, image: '/ff.jpg' },
    { id: 4, name: 'Teddy Bear', price: 250, image: '/tedy.jpg' },
    { id: 5, name: 'Helium Balloon', price: 100, image: '/hb.jpg' },
    { id: 6, name: 'Chocolate Box', price: 300, image: '/cb.jpg' },
    { id: 7, name: 'Scented Candle', price: 200, image: '/sc.jpg' },
    { id: 8, name: 'Floral Ribbon', price: 70, image: '/fr.jpg' },
    { id: 9, name: 'Flower Crown', price: 350, image: '/fc.jpg' },
    { id: 10, name: 'Custom Wrapping', price: 120, image: '/cw.jpg' },
  ],
  // Add-ons for each shop, extending the core add-ons
  sellerAddOns: {
    1: [
      { id: 1, name: 'Glass Vase', price: 150, image: '/gv.jpg' },
      { id: 3, name: 'Flower Food', price: 30, image: '/ff.jpg' },
      { id: 7, name: 'Scented Candle', price: 200, image: '/sc.jpg' },
    ],
    2: [
      { id: 5, name: 'Helium Balloon', price: 100, image: '/hb.jpg' },
      { id: 6, name: 'Chocolate Box', price: 300, image: '/cb.jpg' },
      { id: 9, name: 'Flower Crown', price: 350, image: '/fc.jpg' },
    ],
    3: [
      { id: 3, name: 'Flower Food', price: 30, image: '/ff.jpg' },
      { id: 7, name: 'Scented Candle', price: 200, image: '/sc.jpg' },
      { id: 6, name: 'Chocolate Box', price: 300, image: '/cb.jpg' },
    ],
  },
};
