const FALLBACK = "/images/fallback.svg";

// Real photographs hosted by Wikimedia Commons. The map also repairs older
// database records that still contain the previous local SVG placeholder path.
const REAL_DESTINATION_IMAGES = {
  goa: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Colva_Beach%2C_Goa%2C_India.jpg/1280px-Colva_Beach%2C_Goa%2C_India.jpg",
  manali: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/The_Himalayan_mountains_in_Manali%2C_Himachal_Pradesh.jpg/1280px-The_Himalayan_mountains_in_Manali%2C_Himachal_Pradesh.jpg",
  jaipur: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Hawa_Mahal_in_Jaipur%2C_Rajasthan.jpg/1280px-Hawa_Mahal_in_Jaipur%2C_Rajasthan.jpg",
  bengaluru: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vidhansoudha.jpg/1280px-Vidhansoudha.jpg",
  "jim-corbett": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Images_of_Tiger_at_Jim_Corbett_National_Park.jpg/1180px-Images_of_Tiger_at_Jim_Corbett_National_Park.jpg",
  rishikesh: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Ganga_at_Rishikesh.jpg/1280px-The_Ganga_at_Rishikesh.jpg",
  udaipur: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Lake_Palace%2CUdaipur.jpg/1280px-Lake_Palace%2CUdaipur.jpg",
  ladakh: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Ladakh%2C_pangong_lake.jpg/1280px-Ladakh%2C_pangong_lake.jpg",
};

const keyFor = (value = "") => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function getDestinationImage(destination) {
  if (!destination) return FALLBACK;
  const key = keyFor(destination.name || destination.destinationName || "");
  if (REAL_DESTINATION_IMAGES[key]) return REAL_DESTINATION_IMAGES[key];

  const image = destination.image || destination.destinationImage || "";
  if (image && !image.toLowerCase().endsWith(".svg")) return image;
  return FALLBACK;
}

export { FALLBACK, REAL_DESTINATION_IMAGES };
