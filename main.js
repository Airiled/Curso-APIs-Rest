const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=6';
const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';
const API_KEY = '&api_key=live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error');

const input = document.getElementById('file');

async function renoveRandomPhoto(){
    
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    if(res.status !== 200)
    {
        spanError.innerHTML = `Hubo un error ${res.status} ${data.message}`;
    }else{

        console.log('Random!');

        const randomSection = document.querySelector('.randomSection');
        randomSection.innerText = "";
        const randomH2 = document.createElement('h2');
        randomH2.innerText = "¡Select your Dog!";
        const randomDiv = document.createElement('div');
        randomDiv.classList.add('randomDiv');

        //Boton para reloguear perros
        const divReloadDogs = document.createElement('div');
        divReloadDogs.classList.add('repeat');

        const buttonReloadDogs = document.createElement('button');
        buttonReloadDogs.classList.add('renewButton');

        const randomIconImg = document.createElement('img');
        randomIconImg.classList.add('faceDog');
        randomIconImg.src = './assets/favicon-32x32.png';

        buttonReloadDogs.append(randomIconImg);
        divReloadDogs.append(buttonReloadDogs);

        //Creamos los elementos para almacenar las fotos de perros randoms
        data.forEach(dog =>{ 
                const randomArticle = document.createElement('article');
                randomArticle.classList.add('randomClass');
    
                const randomImg = document.createElement('img');
                randomImg.classList.add('randomImage');
                randomImg.src = dog.url;
    
                const randomBtn = document.createElement('button');
                randomBtn.classList.add('randomButton');
                randomBtn.onclick = () => saveFavouritePhoto(dog.id); //funcion para guardar foto random en favoritos
                buttonReloadDogs.onclick = () => renoveRandomPhoto();
    
                const btnRandomText = document.createTextNode('Add to favourite');
    
                randomBtn.append(btnRandomText);
                randomArticle.append(randomImg, randomBtn);
                randomDiv.append(randomArticle);
                randomSection.append(randomH2, randomDiv, divReloadDogs);
        });
    }    
}

async function loadFavouritesPhotos(){

    
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY' : 'live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm',
        }
    });

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error " + res.status;
    }else{
        console.log('Favourites!');
        const data = await res.json();
        console.log(data);

        const favouriteSection = document.querySelector('.favouriteSection'); 
        favouriteSection.innerHTML = ""; //Eliminamos todo lo que haya en la seccion de <section>
        const h2 = document.createElement('h2');
        h2.innerText = "¡Your favourites dogs!"; //Volvemos a crear el titulo de la seccion de favoritos.
        const favouriteDiv = document.createElement('div');
        favouriteDiv.classList.add('favouriteDiv');
        favouriteSection.append(h2, favouriteDiv);

        //Volvemos a crear la seccion de favoritos pero ahora con el ultimo elemento ya agregado
        //Esto se realiza para no tener que estar actualizando la pagina cada vez que se agrega un nuevo elemento

        data.forEach(dog =>{ //dog hace referencia al elemento favorito actual (por eso luego se utiliza el dog.id para poder eliminar ese x elemento)
            
            const articleFavourite = document.createElement('article');
            articleFavourite.classList.add('favouriteClass');

            const imageFavourite = document.createElement('img');
            imageFavourite.classList.add('favouriteImage');
            imageFavourite.src = dog.image.url;
            imageFavourite.width = 400;
            imageFavourite.height = 350;

            const btnFavourite = document.createElement('button');
            btnFavourite.classList.add('favouriteButton');
            btnFavourite.onclick = () => deleteFavouritePhoto(dog.id);

            const btnFavouriteText = document.createTextNode('Remove dog from favourites');

            btnFavourite.append(btnFavouriteText);
            articleFavourite.append(imageFavourite, btnFavourite);
            favouriteDiv.append(articleFavourite);
            favouriteSection.append(favouriteDiv);
        });

    }
    console.log(res.status);   
}

async function saveFavouritePhoto(id){
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {  //Con el headers le aclaramos al metodo post que estamos trabajando en JSON (Se hace en el 99% de los casos)
            'Content-Type':'application/json',
            'X-API-KEY' : 'live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm',
        },
        body: JSON.stringify({          //Es la informacion que vamos a enviarle al backend.
        image_id: id                    //Este objeto se le manda como tipo string ya que el lenguaje en el que este escrito
                                        //el API al que se lo vamos a mandar no sabemos en que lenguaje de programacion va a estar
                                        //realizado.

        }),
    });
    
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error " + res.status;
    }else{
        const data = await res.json();
        console.log(data);
        console.log('Agregado con exito!');
        loadFavouritesPhotos();  //Al agregarse la imagen que deseamos a favorito volvemos a recargar esta funcion para que nos muestre
                                // de vuelta la seccion de fotos favoritas con el ultimo elemento ya agregado
    }
}

async function deleteFavouritePhoto(id){
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY' : 'live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm',
        }
    });
    
    
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error " + res.status;
    }else{
        const data = await res.json();
        console.log('Eliminado con exito!');
        loadFavouritesPhotos();
    }
}

async function uploadDogPhoto(){
    // const uploadingButton = document.getElementById('input');
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form); //Creamos una instancia de tipo FormData y le asignamos el valor de nuestro formulario creado
                                        //Con esto esta instancia toma todos los valores de los inputs que tenemos en nuestro formulario
    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers:{
            //No le mandamos el content type porque esta API en esta seccion si le mandamos eso nos pide mas informacion sobre la imagen
            //sobre lo que le podamos dar asi que por default, ya le envia esos datos.
            'X-API-KEY': 'live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm',
        },
        body: formData,
    });

    const data = await res.json();
    console.log(data);
    console.log('Fue enviado con exito');
    saveFavouritePhoto(data.id);
}

async function miniDogLoaded(url){
    const imgLoaded = document.getElementById('imagePreview');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener('load', ()=>{
        imgLoaded.src = reader.result;
    })

    if(file){
        reader.readAsDataURL(file);
    }
}





renoveRandomPhoto();
loadFavouritesPhotos();

