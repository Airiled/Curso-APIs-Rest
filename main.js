const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=6';
const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?&api_key=live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm';
const API_KEY = '&api_key=live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?&api_key=live_ZCdyMjS3RJoTkiNr3xS4v5IzT94LFZg8QKZyyiCN5eR5hDiw2FsU9RD2KDoumUlm`;

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

    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");
    const btn5 = document.getElementById("btn5");
    const btn6 = document.getElementById("btn6");

    if(res.status !== 200)
    {
        spanError.innerHTML = "Hubo un error " + res.status + data.message;
    }else{
        console.log('Random');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        img5.src = data[4].url;
        img6.src = data[5].url;

        btn1.onclick = () => saveFavouritePhoto(data[0].id);
        btn2.onclick = () => saveFavouritePhoto(data[1].id);
        btn3.onclick = () => saveFavouritePhoto(data[2].id);
        btn4.onclick = () => saveFavouritePhoto(data[3].id);
        btn5.onclick = () => saveFavouritePhoto(data[4].id);
        btn6.onclick = () => saveFavouritePhoto(data[5].id);
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

    
    const res = await fetch(API_URL_FAVOURITES);

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error " + res.status;
    }else{
        console.log('Favourites!');
        const data = await res.json();
        console.log(data);

        const favouriteSection = document.querySelector('.favouriteSection'); 
        favouriteSection.innerHTML = ""; //Eliminamos todo lo que haya en la seccion de <section>
        const h2 = document.createElement('h2');
        h2.innerText = "Favourites dogs"; //Volvemos a crear el titulo de la seccion de favoritos.
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

            console.log('HOLAS');
        });

    }
    
    console.log('Favourites');
    console.log(res.status);

    
}

async function saveFavouritePhoto(id){
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {  //Con el headers le aclaramos al metodo post que estamos trabajando en JSON (Se hace en el 99% de los casos)
            'Content-Type':'application/json',
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
    });
    
    
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error " + res.status;
    }else{
        const data = await res.json();
        console.log('Eliminado con exito!');
        loadFavouritesPhotos();
    }
}

renoveRandomPhoto();
loadFavouritesPhotos();

