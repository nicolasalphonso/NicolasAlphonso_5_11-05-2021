class Furniture {
    constructor(jsonFurniture) {
        jsonFurniture && Object.assign(this, jsonFurniture);
    }
}


fetch("http://localhost:3000/api/furniture")
.then ( data => data.json())
.then( jsonListFurniture => {
    for (let jsonFurniture of jsonListFurniture) {
        let furniture = new Furniture(jsonFurniture);
        document.getElementById("affichageElements").innerHTML += ""
    }
});