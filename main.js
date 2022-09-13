const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=6';
const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?limit=6&api_key=live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm';
const API_KEY = '&api_key=live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm';

const spanError = document.getElementById('error');

const button = document.querySelector('button');

async function renoveRandomPhoto(){
    
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log(data);

    const img1 = document.getElementById("randomDog1");
    const img2 = document.getElementById("randomDog2");
    const img3 = document.getElementById("randomDog3");
    const img4 = document.getElementById("randomDog4");
    const img5 = document.getElementById("randomDog5");
    const img6 = document.getElementById("randomDog6");

    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error " + res.status + data.message;
    }else{
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        img5.src = data[4].url;
        img6.src = data[5].url;
    }

    //CODIGO MAS DINAMICO (NO ME TERMINO DE FUNCIONAR Y NO LO PUDE ARREGLAR)
    // const imagesArray = [... images];
    

    // if(res.status !== 200){
    //     spanError.innerHTML = "Hubo un error " + res.status
    // }else{
    //     imagesArray.forEach((image, item) =>{
    //         image.src = data[item].url;
    //         console.log(data[item].url);
    //     })
    // }
    
}

async function loadFavouritesPhotos(){

    console.log('Entre a la func de favoritos!');
    const res = await fetch(API_URL_FAVOURITES);

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error " + res.status;
    }else{
        const data = await res.json();
    }
    
    console.log('Favourites');
    console.log(res.status);

    
}

async function saveFavouritePhotos(){
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {  //Con el headers le aclaramos al metodo post que estamos trabajando en JSON (Se hace en el 99% de los casos)
            'Content-Type':'application/json',
        },
        body: JSON.stringify({          //Es la informacion que vamos a enviarle al backend.
        image_id: '_zy2OcyhQ'                 //Este objeto se le manda como tipo string ya que el lenguaje en el que este escrito
                                        //el API al que se lo vamos a mandar no sabemos en que lenguaje de programacion va a estar
                                        //realizado.

        }),
    });
    
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error " + res.status;
    }else{
        const data = await res.json();
    }
}

renoveRandomPhoto();
loadFavouritesPhotos();

