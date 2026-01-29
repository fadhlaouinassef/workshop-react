// Fonction fléchée qui trouve le mot le plus long dans un tableau
const findLongestWord = (words) => {
  // Affectation par décomposition
  const [...mots] = words;

  // Utilisation de .map() pour créer un tableau d'objets {mot, longueur}
  const motsAvecLongueur = mots.map((mot) => ({
    mot: mot,
    longueur: mot.length,
  }));

  // Utilisation de .reduce() pour trouver l'objet avec la plus grande longueur
  const motLePlusLong = motsAvecLongueur.reduce((max, current) => {
    return current.longueur > max.longueur ? current : max;
  });

  return motLePlusLong;
};

// Test de la fonction
const tableauMots = ["JavaScript", "ES6", "ECMAScript", "programmation", "web"];
console.log("Exercice 1 - Le mot le plus long :");
console.log(findLongestWord(tableauMots));

// ============================================
// Exercice 2 : Compteur d'occurrences
// ============================================

const compterOccurrences = (tableau) => {
  // Utilisation de .flat() pour aplatir le tableau et .reduce() pour compter
  const resultat = tableau.flat().reduce((acc, element) => {
    // Si l'élément existe déjà, on incrémente, sinon on initialise à 1
    acc[element] = (acc[element] || 0) + 1;
    return acc;
  }, {});

  return resultat;
};

// Test de la fonction
const input = [
  ["a", "b", "c"],
  ["c", "d", "f"],
  ["d", "f", "g"],
];
console.log("\nExercice 2 - Comptage des occurrences :");
console.log(compterOccurrences(input));
// Output attendu: { a: 1, b: 1, c: 2, d: 2, f: 2, g: 1 }

// ============================================
// Exercice 3 : Total des notes avec bonus
// ============================================

const calculerTotalNotes = (notes) => {
  // .map() pour ajouter 15 points aux notes < 50
  const notesAvecBonus = notes.map((note) => (note < 50 ? note + 15 : note));

  // .filter() pour garder seulement les notes > 50
  const notesSupA50 = notesAvecBonus.filter((note) => note > 50);

  // .reduce() pour calculer le total
  const total = notesSupA50.reduce((somme, note) => somme + note, 0);

  return total;
};

// Test de la fonction
const notesEleves = [45, 55, 30, 60, 70, 40, 80, 35];
console.log("\nExercice 3 - Total des notes après bonus :");
console.log("Notes initiales :", notesEleves);
console.log("Total des notes > 50 après bonus :", calculerTotalNotes(notesEleves));

// ============================================
// Exercice 4 : Tableau d'objets avec ID
// ============================================

// Variable globale pour stocker le dernier ID utilisé
let dernierID = 0;

// Fonction pour ajouter un ID à un objet
const ajouterID = (objet) => {
  dernierID++;
  return { ...objet, ID: dernierID };
};

// Création du tableau d'objets
let Tab = [
  { nom: "Alice", age: 25, ville: "Paris" },
  { nom: "Bob", age: 30, ville: "Lyon" },
  { nom: "Charlie", age: 28, ville: "Marseille" },
];

// Ajout des IDs aux objets existants
Tab = Tab.map((objet) => ajouterID(objet));

console.log("\nExercice 4 - Tableau initial avec IDs :");
console.log(Tab);

// Ajout de nouvelles entrées avec push
Tab.push(ajouterID({ nom: "David", age: 35, ville: "Toulouse" }));

// Ajout de nouvelles entrées avec unshift
Tab.unshift(ajouterID({ nom: "Eve", age: 22, ville: "Nice" }));

console.log("\nTableau après ajout de nouveaux éléments :");
console.log(Tab);

// Export du tableau pour utilisation dans fonction.js
export { Tab };
