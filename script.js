let tabMot = ["essai", "absurde", "deviner", "pendu", "jeu", "mot"];
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

// Configuration initiale
let nbTentatives,
  lettresSaisies,
  motADeviner,
  nombreEchec,
  nombreLettresADevinerRestantes;

function initialiserJeu() {
  // Configuration initiale
  nbTentatives = 0;
  lettresSaisies = [];
  motADeviner = tabMot[Math.floor(Math.random() * tabMot.length)];
  nombreEchec = 0;
  nombreLettresADevinerRestantes = 0;

  updateAffichageMot();
  updateAffichageClavier();
  updateAffichageDessin();
  updateAffichageResultat();
}

initialiserJeu();

function updateAffichageMot() {
  let affichageMot = "";
  nombreLettresADevinerRestantes = 0;

  motADeviner.split("").forEach(lettre => {
    if (lettresSaisies.includes(lettre)) {
      affichageMot += lettre;
    } else {
      affichageMot += " _ ";
      nombreLettresADevinerRestantes++;
    }
  });

  console.log(nombreLettresADevinerRestantes);

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

  let boutons = Array.from(document.querySelectorAll(".lettre"));

  // On écoute les boutons
  boutons.forEach(bouton => {
    bouton.addEventListener("click", verifierLettre);
  });
}

function updateAffichageDessin() {
  const numeroImage = nombreEchec + 1;
  const affichageDessin = '<img src="pendu' + numeroImage + '.jpg" />';

  const dessin = document.querySelector("#dessin");
  dessin.innerHTML = affichageDessin;
}

function updateAffichageResultat() {
  let affichageResultat = "";
  const resultat = document.querySelector("#resultat");

  if (nombreEchec === 7 || nombreLettresADevinerRestantes === 0) {
    if (nombreEchec === 7) {
      affichageResultat = "Perdu";
    } else {
      affichageResultat = "Gagné";
    }
    affichageResultat += " <a href='#' id='reset'>reset</a>";
    resultat.innerHTML = affichageResultat;

    const reset = document.querySelector("#reset");
    reset.addEventListener("click", initialiserJeu);
  } else {
    resultat.innerHTML = affichageResultat;
  }
}

// Fonction de vérification de la lettre
function verifierLettre(e) {
  nbTentatives++;
  const lettreChoisie = e.currentTarget.value;
  lettresSaisies.push(lettreChoisie);

  if (!motADeviner.split("").includes(lettreChoisie)) {
    nombreEchec++;
  }

  updateAffichageMot();
  updateAffichageClavier();
  updateAffichageDessin();
  updateAffichageResultat();
}
