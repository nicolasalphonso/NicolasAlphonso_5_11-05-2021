// Fonction de calcul du nombre d'articles dans le panier
function CalculNombreArticlesPanier(panier) {
  let quantite = 0;
  for (i in panier) {
    quantite += panier[i];
  }
  return quantite;
}

// Fonction pour extraire le prix du produit
function GetPrixProduit(id) {
  var furnitureJSON = localStorage.getItem(id);
  furniture = JSON.parse(furnitureJSON);
  return furniture.price;
}

// Fonction pour calculer la somme totale du panier
function CalculSommePanier(panier) {
  let somme = 0;
  for (id in panier) {
    prixProduit = GetPrixProduit(id);
    somme += panier[id] * prixProduit;
  }
  return somme;
}

//Fonction d'affichage de la somme totale du panier
function AffichageSommeTotalePanier(pan) {
  // récupération de la somme totale et formatage
  let sommeTotale = (CalculSommePanier(pan) / 100).toFixed(2).replace(".", ",");
  // enregistrement de la somme totale dans le local storage
  localStorage.setItem("SommeTotale", sommeTotale);
  // affichage de la somme
  document.getElementById("affichageSommeTotale").innerHTML = sommeTotale;
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
  if (typeof saisie === "number" && !isNaN(saisie)) {
    // valeur que l'on ne veut pas dépasser
    let maximum = 10;

    // si la saisie est supérieure à maximum, on inscrit maximum
    // ou si la saisie est inférieure à 0, "l'utilisateur veut-il supprimer l'article": si non on met 1
    if (saisie > maximum) {
      alert(
        "Vous ne pouvez pas commander plus de 10 quantités de chaque article"
      );
      saisie = maximum;
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
  } else {
    saisie = 1;
  }
  return saisie;
}

// la fonction code l'action des boutons supprimer
function BoutonsSupprimer() {
  let boutonsSupprimer = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < boutonsSupprimer.length; i++) {
    boutonsSupprimer[i].addEventListener("click", function () {
      //on efface l'entrée concernée du panier
      delete panier[this.getAttribute("data-id")];

      //on met le local storage à jour
      localStorage.setItem("Panier", JSON.stringify(panier));

      AffichagePanier();
    });
  }
}

// la fonction code l'action des boutons +
function BoutonsPlus() {
  let boutonsPlus = document.getElementsByClassName("bi-plus-circle");
  for (let i = 0; i < boutonsPlus.length; i++) {
    boutonsPlus[i].addEventListener("click", function () {
      let nouvelleQuantite = (panier[this.getAttribute("data-id")] += 1);

      // on corrige la saisie si besoin
      nouvelleQuantite = ControleSaisie(nouvelleQuantite, this);

      // on met à jour le panier
      panier[this.getAttribute("data-id")] = nouvelleQuantite;
      localStorage.setItem("Panier", JSON.stringify(panier));
      document
        .getElementById("input" + this.getAttribute("data-id"))
        .setAttribute("value", nouvelleQuantite);

      AffichagePanier();
    });
  }
}

// la fonction code l'action des boutons -
function BoutonsMoins() {
  let boutonsMoins = document.getElementsByClassName("bi-dash-circle");
  for (let i = 0; i < boutonsMoins.length; i++) {
    boutonsMoins[i].addEventListener("click", function () {
      let nouvelleQuantite = panier[this.getAttribute("data-id")] - 1;
      // on contrôle la nouvelle quantité
      nouvelleQuantite = ControleSaisie(nouvelleQuantite, this);
      //si la quantité corrigée n'est pas "null", on met à jour "panier"
      if (nouvelleQuantite != null) {
        document
          .getElementById("input" + this.getAttribute("data-id"))
          .setAttribute("value", nouvelleQuantite);
        panier[this.getAttribute("data-id")] = nouvelleQuantite;
      }
      // on met à jour le local storage
      localStorage.setItem("Panier", JSON.stringify(panier));

      AffichagePanier(panier);
    });
  }
}

// la fonction met à jour les quantités du panier lors de la saisie directe dans les inputs texts
function UpdateInputs() {
  let inputsQuantite = document.getElementsByClassName("inputQuantite");
  for (let i = 0; i < inputsQuantite.length; i++) {
    inputsQuantite[i].addEventListener("change", function () {
      // on contrôle et corrige la saisie, si besoin
      let nouvelleQuantite = ControleSaisie(parseInt(this.value), this);
      // on met à jour le panier
      if (nouvelleQuantite) {
        panier[this.getAttribute("data-id")] = nouvelleQuantite;
      }
      localStorage.setItem("Panier", JSON.stringify(panier));

      AffichageSommeTotalePanier(panier);

      AffichageIconePanier(panier);
    });
  }
}

//fontion d'affichage des produits du panier
function AffichagePanier() {
  //On efface la zone d'affichage
  zoneAffichagePanier.innerHTML = "";
  // si le panier n'est pas vide ou inexistant
  if (panier != null && Object.keys(panier).length != 0) {
    produitsPanier = Object.keys(panier);
    for (let produit in produitsPanier) {
      furniture = JSON.parse(localStorage.getItem(produitsPanier[produit]));
      zoneAffichagePanier.innerHTML += `<div class="row articlePanier d-flex">
          <hr />
          <div class="col-8 col-lg-3 order-0">
            <img src="${furniture.imageUrl}" class="imagePanier" />
          </div>
          <div class="col-12 col-lg-7 order-2 order-lg-1">
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
                  class="inputQuantite col-4"
                  min="1"
                  max="10"
                  value=${panier[produitsPanier[produit]]}
                />
                <i class="bi bi-plus-circle" data-id="${furniture._id}"></i>
              </p>
              
            </div>
          </div>
          <div class="col-4 col-lg-2 order-1 order-lg-2 text-right">
            <p>${(furniture.price / 100).toFixed(2).replace(".", ",")} €</p>
          </div>
          <div class="text-center col-12 order-3">
              <button class="btn btn-danger " data-id="${
                furniture._id
              }">Supprimer</button>
              </div>
        </div>`;
    }

    // on cache le bouton "poursuivre vos achats"
    document.getElementById("retourPanierVide").style.display = "none";

    // Codage des boutons supprimer
    BoutonsSupprimer();

    // Codage des boutons +
    BoutonsPlus();

    // Codage des boutons -
    BoutonsMoins();

    // Codage de la mise à jour directe de l'input
    UpdateInputs();
  } else {
    //si le panier est vide ou inexistant
    // Afficher que le panier est vide
    document.getElementById("votrePanier").innerHTML += " est vide";

    // cacher le formulaire
    document.getElementById("formulaireContact").style.display = "none";
  }

  // affichage de la quantité totale
  document.getElementById("affichageQuantiteTotale").innerHTML =
    CalculNombreArticlesPanier(panier);

  AffichageSommeTotalePanier(panier);

  AffichageIconePanier(panier);
}

// La fonction crée l'objet contact qui sera envoyé à l'API

function CreationObjetContact() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  //création de l'objet contact
  var contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };

  //enregistrement de contact dans le local storage
  localStorage.setItem("ObjetContact", JSON.stringify(contact));

  return contact;
}

// fonction de validation de formulaire
// source site officiel de Boostrap - adapté
function ValidationFormulaire() {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      let form = document.getElementById("formulaireContact");
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            // on désactive l'action normale du bouton tant que le formulaire n'est pas correctement rempli
            event.preventDefault();
            event.stopPropagation();
          } else {
            // sinon on envoie les données
            event.preventDefault();
            EnvoiDonneesAPI();
          }
          // après une première tentative du client, on fait apparaître les indications visuelles des champs incorrectement remplis
          // bootstrap permettra une intéraction visuelle à chaque frappe de l'utilisateur
          form.classList.add("was-validated");
        },
        false
      );
    },
    false
  );
}

// fonction d'envoi de l'objet contact et du tableau products à l'API
function EnvoiDonneesAPI() {
  let contact = CreationObjetContact();

  // si products est bien un tableau et contact un objet, on crée les données
  if (Array.isArray(products) && typeof contact === "object") {
    let donnees = {
      contact: contact,
      products: products,
    };

    // on envoie les données à l'API puis on récupère la réponse que l'on stocke dans le local storage pour le message de confirmation
    // s'il y a une erreur, une popup apparait pour informer le client
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
        alert(
          "Nous rencontrons un problème avec votre commande. Veuillez réessayer ou contacter notre service client."
        );
        console.error("Erreur de fetch POST:", error);
      });
  } else {
    console.log("Erreur de types de données fournies à l'API");
    alert(
      "Nous rencontrons un problème avec votre commande. Veuillez réessayer ou contacter notre service client."
    );
  }
}

// fontion qui vérifie que les quantités de chaque article sont valables
function VerificationQuantites() {
  let inputsQuantite = document.getElementsByClassName("inputQuantite");

  let maximum = 10;

  // boucle sur chaque input et mise à jour
  for (let i = 0; i < inputsQuantite.length; i++) {

    var changement = false;

    let nouvelleQuantite = parseInt(inputsQuantite[i].value);

    if (nouvelleQuantite > maximum) {
      panier[inputsQuantite[i].getAttribute("data-id")] = maximum;
      changement = true;
    } else if (nouvelleQuantite < 1 || typeof nouvelleQuantite == null) {
      panier[inputsQuantite[i].getAttribute("data-id")] = 1;
      changement = true;
    }
  }

  // s'il y a eu un changement
  if (changement) {
    // avertissement à l'utilisateur
    alert ("Votre panier comportait des erreurs, veuillez vérifer les quantités");
    //mise à jour du panier et réaffichage, si besoin
    localStorage.setItem("Panier", JSON.stringify(panier));
    setTimeout(AffichagePanier, 300);
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

AffichagePanier();

VerificationQuantites();

ValidationFormulaire();
