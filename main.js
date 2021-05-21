class Furniture {
    constructor(jsonFurniture) {
        jsonFurniture && Object.assign(this, jsonFurniture);
    }
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function choixProduit(id) {

}

fetch("http://localhost:3000/api/furniture")
.then ( data => data.json())
.then( jsonListFurniture => {
    for (let jsonFurniture of jsonListFurniture) {
        let furniture = new Furniture(jsonFurniture);
        document.getElementById("affichageDesFurnitures").innerHTML +=
                    `<div class="col-3" >
                    <div class="card cardProduit">
                    <img class="cardImg" src="${furniture.imageUrl}" alt="Photo du modèle ${furniture.name}"/>
                    <div class="card-body">
                            <h4 class="card-title">${furniture.name}</h4>
                            <p class="card-text">${furniture.description}</p>
                            <p class="card-text">${(furniture.price/100).toFixed(2).replace( ".", "," )} €</p>
                            <a href="produit.html?id=${furniture._id}" class="btn btn-primary selecteurProduit" data-id=${furniture._id}>Voir la fiche produit</a>
                    </div>
                </div>
                </div>
                    `;
    }
});