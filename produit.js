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

class Furniture {
    constructor(jsonFurniture) {
        jsonFurniture && Object.assign(this, jsonFurniture);
    }
}

var id = $_GET('id');

var url = ("http://localhost:3000/api/furniture/" + id);

fetch(url)
.then ( data => data.json())
.then( jsonFurniture => {
    let furniture = new Furniture(jsonFurniture);
    document.getElementById("affichageDuProduit").innerHTML +=
                    `<h2>${furniture.name}</h2>
                    <div class="row">
                        <div class="col">
                            <img src="${furniture.imageUrl}" alt="Photo du modèle ${furniture.name}"/>
                        </div>
                        <div class="col">
                            <p>${furniture.description}</p>
                            <p>${(furniture.price/100).toFixed(2).replace( ".", "," )} €</p>
                            <a href="#" class="btn btn-primary commandeProduit" data-id=${furniture._id}>Commander</a>
                        </div>
                    </div>
                    `;
    });