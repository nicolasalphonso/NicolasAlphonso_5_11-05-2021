// Fonction de calcul du nombre d'articles dans le panier
function CalculNombreArticlesPanier(panier) {
  let quantite = 0;
  for (i in panier) {
    quantite += panier[i];
  }
  return quantite;
}

// Fonction pour extraire le prix du produit
function GetPrixProduit(id, produitsPanier) {
  var furnitureJSON = localStorage.getItem(id);
  furniture = JSON.parse(furnitureJSON);
  return furniture.price;
}

// Fonction pour calculer la somme totale du panier
function CalculSommePanier(panier) {
  let somme = 0;
  for (id in panier) {
    prixProduit = GetPrixProduit(id, produitsPanier);
    somme += panier[id] * prixProduit;
  }
  return somme;
}

// fonction pour ajouter un article au panier
function ajoutArticle() {
  var panier = {};
  // si le panier n'existe pas, il faut le créer
  if (localStorage.getItem("Panier") === null) {
    panier[id] = 1;
  }
  // si le panier existe
  else {
    //on transforme le panier en objet
    panier = JSON.parse(localStorage.getItem("Panier"));
    // si l'entrée existe ajouter 1 à la quantité
    // sinon on la crée et on lui assigne une quantité de 1
    if (panier[id] > 0) {
      panier[id] += 1;
    } else {
      panier[id] = 1;
    }
  }
  localStorage.setItem("Panier", JSON.stringify(panier));
}
// Fonction d'affichage de la quantité totale de produits en dessous des articles du panier
function AffichageQuantiteTotalePanier(panier) {
  let quantiteTotale = CalculNombreArticlesPanier(panier);
  let elementsQuantiteTotale = document.getElementsByClassName(
    "affichageQuantiteTotale"
  );
  for (let i = 0; i < elementsQuantiteTotale.length; i++) {
    elementsQuantiteTotale[i].innerHTML = quantiteTotale;
  }
}

//Fonction d'affichage de la somme totale du panier
function AffichageSommeTotalePanier(pan) {
  let sommeTotale = (CalculSommePanier(pan) / 100).toFixed(2).replace(".", ",");
  localStorage.setItem("SommeTotale", sommeTotale);
  let elementsSommeTotale = document.getElementsByClassName(
    "affichageSommeTotale"
  );
  for (let i = 0; i < elementsSommeTotale.length; i++) {
    elementsSommeTotale[i].innerHTML = sommeTotale;
  }
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

// Fonction de contrôle de saisie des quantités
// Pour les inputs, les incrémentations et les décrémentations
function ControleSaisie(saisie, element) {
  // on vérifie qu'un nombre est entré
  // si non, on retourne une valeur de 1

  // valeur que l'on ne veut pas dépasser
  let maximum = 10;

  // si la saisie est inférieure à 0, l'utilisateur veut-il supprimer l'article sinon on met 1
  // ou si la saisie est supérieure à Max,
  if (saisie > maximum) {
    alert(
      "Vous ne pouvez pas commander plus de 10 quantités de chaque article"
    );
    saisie = 10;
    element.value = saisie;
  } else if (saisie < 1) {
    if (confirm("Voulez-vous supprimer l'article ?")) {
      delete panier[element.getAttribute("data-id")];
      localStorage.setItem("Panier", JSON.stringify(panier));
      AffichagePanier();
      saisie = null;
    } else {
      saisie = 1;
    }
  }

  return saisie;
}

//fontion d'affichage des produits du panier
function AffichagePanier() {
  //On efface la zone d'affichage
  zoneAffichagePanier.innerHTML = "";
  console.log(panier);
  if (panier != null && panier != {}) {
    produitsPanier = Object.keys(panier);
    for (let produit in produitsPanier) {
      furniture = JSON.parse(localStorage.getItem(produitsPanier[produit]));
      zoneAffichagePanier.innerHTML += `<div class="row articlePanier">
          <hr />
          <div class="col-3">
            <img src="${furniture.imageUrl}" class="imagePanier" />
          </div>
          <div class="col-7">
            <div class="row">
              <h3>${furniture.name}</h3>
              <p class="text-success">En stock</p>
              <p>Style : unique</p>
              <!--<p>Vernis : Oak</p>-->
            </div>
            <div class="row">
              <p>
                <label for="quantitéArticle">Qté:</label>
                <i class="bi bi-dash-circle" data-id="${furniture._id}"></i>
                <input
                  type="number"
                  id="input${furniture._id}"
                  data-id="${furniture._id}"
                  class="inputQuantite"
                  min="1"
                  max="10"
                  value=${panier[produitsPanier[produit]]}
                />
                <i class="bi bi-plus-circle" data-id="${furniture._id}"></i>
                <button type="button" class="btn btn-danger" data-id="${
                  furniture._id
                }">Supprimer</button>
              </p>
            </div>
          </div>
          <div class="col-2 text-right">
            <p>${(furniture.price / 100).toFixed(2).replace(".", ",")} €</p>
          </div>
        </div>`;
    }

    // on cache le bouton "poursuivre vos achats"
    document.getElementById("retourPanierVide").style.display = "none";

    // Codage des boutons supprimer
    boutonsSupprimer = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < boutonsSupprimer.length; i++) {
      boutonsSupprimer[i].addEventListener("click", function () {
        delete panier[this.getAttribute("data-id")];
        localStorage.setItem("Panier", JSON.stringify(panier));
        AffichagePanier();
      });
    }

    // Codage des boutons +
    let boutonsPlus = document.getElementsByClassName("bi-plus-circle");
    for (let i = 0; i < boutonsPlus.length; i++) {
      boutonsPlus[i].addEventListener("click", function () {
        let nouvelleQuantite = (panier[this.getAttribute("data-id")] += 1);
        nouvelleQuantite = ControleSaisie(nouvelleQuantite, this);
        panier[this.getAttribute("data-id")] = nouvelleQuantite;
        localStorage.setItem("Panier", JSON.stringify(panier));
        document
          .getElementById("input" + this.getAttribute("data-id"))
          .setAttribute("value", nouvelleQuantite);
        AffichagePanier(panier);
      });
    }

    // Codage des boutons -
    let boutonsMoins = document.getElementsByClassName("bi-dash-circle");
    for (let i = 0; i < boutonsPlus.length; i++) {
      boutonsMoins[i].addEventListener("click", function () {
        let nouvelleQuantite = panier[this.getAttribute("data-id")] - 1;
        nouvelleQuantite = ControleSaisie(nouvelleQuantite, this);
        if (nouvelleQuantite != null) {
          document
            .getElementById("input" + this.getAttribute("data-id"))
            .setAttribute("value", nouvelleQuantite);
          panier[this.getAttribute("data-id")] = nouvelleQuantite;
        }
        localStorage.setItem("Panier", JSON.stringify(panier));
        AffichagePanier(panier);
      });
    }

    // Codage de la mise à jour directe de l'input
    let inputsQuantite = document.getElementsByClassName("inputQuantite");
    for (let i = 0; i < inputsQuantite.length; i++) {
      inputsQuantite[i].addEventListener("change", function () {
        let nouvelleQuantite = ControleSaisie(parseInt(this.value), this);
        if (nouvelleQuantite != null) {
          panier[this.getAttribute("data-id")] = nouvelleQuantite;
        }
        this.value = nouvelleQuantite;
        localStorage.setItem("Panier", JSON.stringify(panier));
        AffichageQuantiteTotalePanier(panier);
        AffichageSommeTotalePanier(panier);
        AffichageIconePanier(panier);
      });
    }
  } else {
    // Afficher que le panier est vide
    document.getElementById("votrePanier").innerHTML += " est vide";

    //cacher le formulaire
    document.getElementById("formulaireContact").style.display = "none";
  }

  AffichageQuantiteTotalePanier(panier);

  AffichageSommeTotalePanier(panier);

  AffichageIconePanier(panier);
}

// fonction de création de l'objet contact
function creationObjetContact() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  var contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };

  localStorage.setItem("ObjetContact", JSON.stringify(contact));

  return contact;
}

// fonction de validation de formulaire
// source site officiel de Boostrap
function ValidationFormulaire() {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      let forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              EnvoiDonneesAPI();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
}

// fonction d'envoi de l'objet contact et du tableau products à l'API
function EnvoiDonneesAPI() {
  let contact = creationObjetContact();
  if (Array.isArray(products) && typeof contact === "object") {
    let donnees = {
      contact: contact,
      products: products,
    };
    fetch("http://localhost:3000/api/furniture/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donnees),
    })
      .then((response) => response.json())
      .then((resultat) => {
        localStorage.setItem("ReponseServeur", JSON.stringify(resultat));
        setTimeout((document.location.href = "confirmation.html"), 300);
      })
      .catch((error) => {
        console.error("Erreur de fetch POST:", error);
      });
  } else {
    console.log("Erreur de types de données fournies à l'API");
    alert(
      "Nous rencontrons un problème avec votre commande. Veuillez réessayer ou contacter notre service client."
    );
  }
}

class Furniture {
  constructor(jsonFurniture) {
    jsonFurniture && Object.assign(this, jsonFurniture);
  }
}

// CODE PRINCIPAL //

let furniture = "";
let products = [];
let panier = JSON.parse(localStorage.getItem("Panier"));
if (panier != null) {
  products = Object.keys(panier);
}

let zoneAffichagePanier = document.getElementById("affichageProduitPanier");

AffichagePanier(zoneAffichagePanier);

ValidationFormulaire();
