// ============================================
// Fonction de recherche par ID
// ============================================

/**
 * Recherche un objet dans un tableau par son ID
 * @param {Array} tableau - Le tableau d'objets à parcourir
 * @param {number} id - L'ID de l'objet à rechercher
 * @returns {Object|undefined} - L'objet trouvé ou undefined si non trouvé
 */
const Search = (tableau, id) => {
  return tableau.find((element) => element.ID === id);
};

// Export de la fonction
export { Search };

// ============================================
// Utilisation de la fonction Search avec Tab
// ============================================

// Import du tableau Tab depuis exercices.js
import { Tab } from "./exercices.js";

// Tests de recherche
console.log("\n========== Tests de la fonction Search ==========");

// Recherche d'un élément existant
console.log("\nRecherche de l'élément avec ID 1 :");
console.log(Search(Tab, 1));

console.log("\nRecherche de l'élément avec ID 3 :");
console.log(Search(Tab, 3));

// Recherche d'un élément inexistant
console.log("\nRecherche de l'élément avec ID 999 (inexistant) :");
console.log(Search(Tab, 999));

// Affichage de tous les IDs disponibles
console.log("\nIDs disponibles dans le tableau :");
console.log(Tab.map((element) => element.ID));
