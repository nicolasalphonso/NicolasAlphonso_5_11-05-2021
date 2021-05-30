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
    somme += (panier[id] * prixProduit);
  }
  return somme;
}

// Fonction d'affichage de la quantité totale de produits en dessous des articles du panier
function AffichageQuantiteTotalePanier(panier) {
  let quantiteTotale = CalculNombreArticlesPanier(panier);
  let elementsQuantiteTotale = document.getElementsByClassName("affichageQuantiteTotale");
  for (let i = 0; i < elementsQuantiteTotale.length; i++) {
    elementsQuantiteTotale[i].innerHTML = quantiteTotale;
  }
  
}

//Fonction d'affichage de la somme totale du panier
function AffichageSommeTotalePanier(pan) {
  let sommeTotale = (CalculSommePanier(pan) / 100).toFixed(2).replace(".", ",");
  let elementsSommeTotale = document.getElementsByClassName("affichageSommeTotale");
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

//fontion d'affichage des produits du panier
function AffichagePanier() {
  //On efface la zone d'affichage
  zoneAffichagePanier.innerHTML = "";
  if ((panier != null) && (panier != {})) {
    produitsPanier = Object.keys(panier);
    for (let produit in produitsPanier) {
      furniture = JSON.parse(localStorage.getItem(produitsPanier[produit]));
      zoneAffichagePanier.innerHTML +=
        `<div class="row articlePanier">
          <hr />
          <div class="col-2">
            <img src="${furniture.imageUrl
        }" class="imageCommande" />
          </div>
          <div class="col-7">
            <div class="row">
              <div class="col">
              <h3>${furniture.name}</h3>
              <p class="text-success">En stock</p>
              </div>
              <div class="col">
              <p>Style : unique</p>
              <!--<p>Vernis : Oak</p>-->
              
              <p>
                <label for="quantitéArticle">Qté:</label>
                <input
                  type="number"
                  id="input${furniture._id}"
                  data-id="${furniture._id}"
                  class="inputQuantite"
                  min="1"
                  max="10"
                  value=${panier[produitsPanier[produit]]}
                  disabled="disabled"
                />
              </p>
              </div>
            </div>
          </div>
          <div class="col-2 text-right">
            <p>${(furniture.price / 100)
          .toFixed(2)
          .replace(".", ",")} €</p>
          </div>
        </div>`;

    }
    // Codage des boutons supprimer
    boutonsSupprimer = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < boutonsSupprimer.length; i++) {
      boutonsSupprimer[i].addEventListener("click", function () {
        delete panier[this.getAttribute("data-id")];
        localStorage.setItem("Panier", JSON.stringify(panier));
        AffichagePanier();

      })
    }

    // Codage des boutons +
    let boutonsPlus = document.getElementsByClassName("bi-plus-circle");
    for (let i = 0; i < boutonsPlus.length; i++) {
      boutonsPlus[i].addEventListener("click", function () {
        let nouvelleQuantite = panier[this.getAttribute("data-id")] += 1;
        nouvelleQuantite = ControleSaisie(nouvelleQuantite, this);
        panier[this.getAttribute("data-id")] = nouvelleQuantite;
        localStorage.setItem("Panier", JSON.stringify(panier));
        document.getElementById("input" + this.getAttribute("data-id")).setAttribute("value", nouvelleQuantite);
        AffichagePanier(panier);
      })

    }

    // Codage des boutons -
    let boutonsMoins = document.getElementsByClassName("bi-dash-circle");
    for (let i = 0; i < boutonsPlus.length; i++) {
      boutonsMoins[i].addEventListener("click", function () {
        let nouvelleQuantite = panier[this.getAttribute("data-id")] - 1;
        nouvelleQuantite = ControleSaisie(nouvelleQuantite, this);
        if (nouvelleQuantite != null) {
          document.getElementById("input" + this.getAttribute("data-id")).setAttribute("value", nouvelleQuantite);
          panier[this.getAttribute("data-id")] = nouvelleQuantite;
        }
        localStorage.setItem("Panier", JSON.stringify(panier));
        AffichagePanier(panier);
      })

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
      })

    }


  } else {
    // Afficher que le panier est vide
    document.getElementById("votrePanier").innerHTML += " est vide";
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
    "firstName": firstName,
    "lastName": lastName,
    "address": address,
    "city": city,
    "email": email,
  };

  localStorage.setItem("Objet contact", JSON.stringify(contact));

  return contact;
}

// fonction de validation de formulaire
// source site officiel de Boostrap
function ValidationFormulaire() {
  'use strict';
  window.addEventListener('load', function() {
    let forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          EnvoiDonneesAPI();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
 
  
}

// fonction d'envoi de l'objet contact et du tableau products à l'API
function EnvoiDonneesAPI() {
    let contact = creationObjetContact();
    let products = ["5beaadda1c9d440000a57d98", "5beaaf2e1c9d440000a57d9a"];
    let donnees = {
      "contact": contact,
      "products": products
  }
  fetch("http://localhost:3000/api/furniture/order", {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json",
      },
    body: JSON.stringify(donnees)
  })
    .then(response => response.json())
    .then(resultat => {
      localStorage.setItem("ReponseServeur", JSON.stringify(resultat));
      setTimeout(document.location.href="confirmation.html", 300);

    })
    .catch((error) => {
      console.error('Erreur:', error);
    });
  }



class Furniture {
  constructor(jsonFurniture) {
    jsonFurniture && Object.assign(this, jsonFurniture);
  }
}

// CODE PRINCIPAL //

let furniture = "";
let produitsPanier = [];
let zoneAffichagePanier = document.getElementById("affichageProduitPanier");
let panier = JSON.parse(localStorage.getItem("Panier"));
if (panier != null) {
  produitsPanier = Object.keys(panier);
}

AffichagePanier(zoneAffichagePanier);

ValidationFormulaire();











