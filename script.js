// Configuration initiale
let nbTentatives = 0;
const lettresSaisies = [];
const motADeviner = "essai";
let nombreEchec = 0;

// Affichage du clavier
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

updateAffichageMot();
updateAffichageClavier();
updateAffichageDessin();
// updateAffichageResultat();

function updateAffichageMot() {
  let affichageMot = "";

  motADeviner.split("").forEach(lettre => {
    affichageMot += lettresSaisies.includes(lettre) ? lettre : " _ ";
  });

  const mot = document.querySelector("#mot");
  mot.innerHTML = affichageMot;
}

function updateAffichageClavier() {
  let affichageClavier = "";
  alphabet.forEach(lettre => {
    if (lettresSaisies.includes(lettre)) {
      affichageClavier +=
        '<button class="lettre" disabled value=' +
        lettre +
        ">" +
        lettre +
        "</button>";
    } else {
      affichageClavier +=
        '<button class="lettre" value=' + lettre + ">" + lettre + "</button>";
    }
  });

  const clavier = document.querySelector("#clavier");
  clavier.innerHTML = affichageClavier;
}

function updateAffichageDessin() {
  const numeroImage = 7 - nombreEchec;
  const affichageDessin = '<img src="pendu' + numeroImage + '.jpg" />';

  const dessin = document.querySelector("#dessin");
  dessin.innerHTML = affichageDessin;
}

// Fonction de vérification de la lettre
let verifierLettre = function(e) {
  nbTentatives++;
  const lettreChoisie = e.currentTarget.value;
  console.log(lettreChoisie);
  lettresSaisies.push(lettreChoisie);

  if (!motADeviner.split("").includes(lettreChoisie)) {
    nombreEchec++;
  }

  updateAffichageMot();
  updateAffichageClavier();
  updateAffichageDessin();
  // updateAffichageResultat();
};

// On écoute les boutons
const boutons = Array.from(document.querySelectorAll(".lettre"));
boutons.forEach(bouton => {
  bouton.addEventListener("click", verifierLettre);
});
