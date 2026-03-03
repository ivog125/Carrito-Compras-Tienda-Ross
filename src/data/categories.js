// categories.js - Metadatos de las categorías del e-commerce

export const categories = [
  {
    id: 'prama',
    name: 'Prama',
    slug: 'prama',
    description: 'Extractos líquidos, hierbas y suplementos naturales para el bienestar.',
    image: 'prama-category.jpg', // Opcional: imagen representativa
    productCount: 20, // Podemos calcularlo dinámicamente después
    featured: true // Para destacar en home
  },
  {
    id: 'vital-mar',
    name: 'Vital Mar',
    slug: 'vital-mar',
    description: 'Productos derivados del mar: agua de mar, sales, algas y minerales marinos.',
    image: 'vital-mar-category.jpg',
    productCount: 6,
    featured: true
  },
  {
    id: 'productos-varios',
    name: 'Productos Varios',
    slug: 'productos-varios',
    description: 'Alimentos, cosmética natural y artículos para un estilo de vida orgánico.',
    image: 'productos-varios-category.jpg',
    productCount: 7,
    featured: true
  }
];

// Función auxiliar para obtener una categoría por su ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Función auxiliar para obtener una categoría por su slug
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

// Función para obtener solo categorías destacadas (para la home)
export const getFeaturedCategories = () => {
  return categories.filter(category => category.featured);
};