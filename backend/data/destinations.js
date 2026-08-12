// Objective 4 (support data): a small seeded dataset used by the Phase 1
// rule-based itinerary engine. In Phase 2 the BTech team will replace/extend
// this with a real recommendation algorithm (content-based / collaborative
// filtering) — this file gives them a concrete data shape to build against.

const destinations = [
  {
    name: "Goa",
    type: "beach",
    budgetLevel: "medium",
    tags: ["nightlife", "food", "relaxation"],
    activities: [
      { title: "Baga Beach walk & water sports", cost: 1200 },
      { title: "Fort Aguada sunset visit", cost: 300 },
      { title: "Anjuna flea market", cost: 800 },
      { title: "Beach shack seafood dinner", cost: 900 },
      { title: "Dudhsagar Falls day trip", cost: 1500 },
    ],
  },
  {
    name: "Manali",
    type: "mountains",
    budgetLevel: "medium",
    tags: ["trekking", "adventure", "nature"],
    activities: [
      { title: "Solang Valley adventure sports", cost: 1500 },
      { title: "Hadimba Temple & Old Manali walk", cost: 200 },
      { title: "Rohtang Pass excursion", cost: 2000 },
      { title: "Local cafe hopping in Old Manali", cost: 700 },
      { title: "River Beas camping night", cost: 1800 },
    ],
  },
  {
    name: "Jaipur",
    type: "heritage",
    budgetLevel: "low",
    tags: ["museums", "food", "history"],
    activities: [
      { title: "Amber Fort guided tour", cost: 600 },
      { title: "City Palace & Jantar Mantar", cost: 500 },
      { title: "Hawa Mahal photo stop", cost: 100 },
      { title: "Johari Bazaar shopping", cost: 1000 },
      { title: "Rajasthani thali dinner", cost: 600 },
    ],
  },
  {
    name: "Bengaluru",
    type: "city",
    budgetLevel: "high",
    tags: ["nightlife", "food", "shopping"],
    activities: [
      { title: "Lalbagh Botanical Garden", cost: 100 },
      { title: "MG Road & Brigade Road shopping", cost: 1500 },
      { title: "Craft brewery hopping", cost: 2000 },
      { title: "Nandi Hills sunrise trip", cost: 1000 },
      { title: "Fine-dining tasting menu", cost: 3000 },
    ],
  },
  {
    name: "Jim Corbett",
    type: "wildlife",
    budgetLevel: "high",
    tags: ["nature", "trekking"],
    activities: [
      { title: "Jeep safari in the core zone", cost: 3500 },
      { title: "Corbett Waterfall trek", cost: 300 },
      { title: "Riverside nature walk", cost: 200 },
      { title: "Bird-watching morning trail", cost: 500 },
      { title: "Bonfire evening at the resort", cost: 800 },
    ],
  },
  {
    name: "Rishikesh",
    type: "adventure",
    budgetLevel: "low",
    tags: ["trekking", "adventure", "relaxation"],
    activities: [
      { title: "White-water rafting on the Ganges", cost: 1000 },
      { title: "Laxman Jhula & Ram Jhula walk", cost: 100 },
      { title: "Evening Ganga Aarti at Triveni Ghat", cost: 0 },
      { title: "Bungee jumping at Jumpin Heights", cost: 3500 },
      { title: "Beatles Ashram visit", cost: 150 },
    ],
  },
];

export default destinations;
