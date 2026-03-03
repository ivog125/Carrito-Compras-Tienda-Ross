const BASE_URL = import.meta.env.BASE_URL || '/';

export const getImageUrl = (imageName) => {
  if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
    return imageName;
  }
  
  const cleanName = imageName.replace(/^\//, '');
  return `${BASE_URL}${cleanName}`;
};