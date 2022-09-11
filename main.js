const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=3';
const button = document.querySelector('button');
// button.onclick = renovarFotoPerro;

async function renovarFotoPerro(){
    console.log('hola');
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

window.renovarFotoPerro();

