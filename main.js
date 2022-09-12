const API_URL = 
'https://api.thedogapi.com/v1/images/search?limit=6&api_key=live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm';
const button = document.querySelector('button');

async function renovarFotoPerro(){
    console.log('Estamos adentro de la funcion');
    const response = await fetch(API_URL);
    const data = await response.json();
    const images = document.getElementsByTagName("img")
    const imagesArray = [... images];
    imagesArray.forEach((image, item) =>{
        console.log(image); // image toma el valor de la etiqueta img 
        console.log(item); // item toma el valor de la posicion del array
        image.src = data[item].url;
    })
}


renovarFotoPerro();

