class Furniture {
    constructor(jsonFurniture) {
        jsonFurniture && Object.assign(this, jsonFurniture);
    }
}

// code principal - affichage de l'ensemble des produits
fetch("http://localhost:3000/api/furniture")  // requête à l'API
.then ( data => data.json())  // lit le stream Response et retourne une promesse qui s'auto-résout et retourne corps requête au format JSON
.then( jsonListFurniture => { // on récupère chaque élément et on en fait un Objet furniture
    for (let jsonFurniture of jsonListFurniture) {
        let furniture = new Furniture(jsonFurniture);
        //on affiche chaque produit
        document.getElementById("affichageDesFurnitures").innerHTML += 
                    `<div class="col-12 col-md-6 col-lg-3" >
                    <div class="card cardProduit">
                    <img class="cardImg" src="${furniture.imageUrl}" alt="Photo du modèle ${furniture.name}"/>
                    <div class="card-body">
                            <h4 class="card-title">${furniture.name}</h4>
                            <p class="card-text">${furniture.description}</p>
                            <p class="card-text">${(furniture.price/100).toFixed(2).replace( ".", "," )} €</p>
                            <div class="text-center">
                            <a href="produit.html?id=${furniture._id}" class="btn btn-primary selecteurProduit" data-id=${furniture._id}>Voir la fiche produit</a>
                            </div>
                    </div>
                </div>
                </div>
                    `;
        // je stocke les produits dans le local storage
        localStorage.setItem(`${furniture._id}`, JSON.stringify(furniture));
    }
});