const URL = 'https://api.thedogapi.com/v1/images/search';
const button = document.querySelector('button');
button.onclick = renovarFotoPerro;

// button.addEventListener('onClick', renovarFotoPerro);

async function renovarFotoPerro(){
    // console.log('hola');
    // fetch(URL)
    // .then(res => res.json())
    // .then(data => {
    //     const img = document.querySelector('img');
    //     img.src = data[0].url;
    // })
    const response = await fetch(URL);
    const data = await response.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
}

