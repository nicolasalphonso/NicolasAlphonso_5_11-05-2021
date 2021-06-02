//Fonction pour calculer le nombre d'articles dans le panier
// l'existence du panier est vérifié dans la fonction appelante
function CalculNombreArticlesPanier (pan) {
    let quantite = 0;
    for (i in pan) {
        quantite += panier[i];
    }
    return quantite
}

// Fonction d'affichage du nombre d'articles sur l'icône de panier dans le header
function AffichageIconePanier(pan) {
    let chiffreIconePanier = document.getElementById("nombreArticlesPanier");
    // si le panier n'existe pas, afficher 0
    if (pan === null) {
        chiffreIconePanier.innerHTML = 0;
    } else {
        // sinon, afficher le nombre d'articles
        chiffreIconePanier.innerHTML = CalculNombreArticlesPanier(pan);
    }
}

let panier = JSON.parse(localStorage.getItem("Panier"));

AffichageIconePanier(panier);

// Exemple de test
/*
let valeurTest = {1:"val1",2:"val2",52:"val4"};
console.log(AffichageIconePanier(valeurTest));
*/