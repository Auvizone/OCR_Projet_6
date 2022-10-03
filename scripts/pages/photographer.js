//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
let photographer = '';
let photographerPictures = [];
let totalLikes = 0;
let photographerName = '';
let photographerPrice = 0;
let testArray = ['premier', 'deuxieme', 'troisieme', 'quatrième'];
let photographsArray = [];
let x = 1;

async function getPhotographer(id) {
    const response = await fetch('../../data/photographers.json');
    const photographers = await response.json();
    findId(photographers, id);
    console.log(photographer)
    photographerName = photographer.name;
    photographerPrice = photographer.price;
    return(photographer)
}

function findId(photographers, id) {
    var data = photographers.photographers;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            photographer = data[i]
        }
    }
}

function openModale(data) {
    document.querySelector('.modal-background').style.display="flex";
    const link = `assets/images/Sample Photos/${photographerName}/${photographsArray[data.position].image}`
    document.getElementById('selectedImage').setAttribute('src', link)
}

function closeModale() {
    document.querySelector('.modal-background').style.display="none";
}

async function getPictures(data, name) {
    const response = await fetch(`../../data/photographers.json`)
    const pictures = await response.json();
    sortPictures(pictures.media, name)
    return(response)
}

async function sortPictures(data, name) {
    let pos = 0
    const pictureSection = document.getElementById('picture-box');
    data.forEach(element => {
        if (element.photographerId == id) {
            totalLikes = (totalLikes + element.likes)
            element.position = pos;
            pos++;
            const photographPictures = photographerPageFactory(element, name)
            photographsArray.push(element)
            
            const userCardDom = photographPictures.getUserCardDOMPictures();
            pictureSection.appendChild(userCardDom)
        } else {
            return;
        }
        // document.querySelector('.text-info').textContent = `${totalLikes} <i class="fa-solid fa-heart"></i> // ${photographerPrice} € /h`
        document.querySelector('.text-info').innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
        document.querySelector('.text-price').innerHTML = `${photographerPrice}€ / jour`
        document.getElementById('photographer-name').innerHTML = `${photographerName}`;
    });
}

async function displayData(data) {
    console.log(data)
    getPictures(data, data.name)
    
    const picture = `assets/photographers/${data.portrait}`;
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('location').innerHTML = data.city + ',' + ' ' + data.country
    document.getElementById('tag').innerHTML = data.tagline;
    document.getElementById('photo').setAttribute('src', picture)
}

// async function displayData(data) {
//     const photographersSection = document.querySelector(".photographer_section");
//         const photographerModel = photographerFactory(data);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
// };

async function init() {
    const photographer = await getPhotographer(id);
    displayData(photographer);
    document.getElementById('close-modal').addEventListener('click', closeModale);
    document.getElementById('next').addEventListener('click', nextArray)
    document.getElementById('prev').addEventListener('click', previousArray)

}

function nextArray() {
    if (x == photographsArray.length) {
        console.log('trop loin')
    }
    if ( x < (photographsArray.length - 1)) {
        x = x + 1;
        const link = `assets/images/Sample Photos/${photographerName}/${photographsArray[x].image}`
    document.getElementById('selectedImage').setAttribute('src', link)
        console.log(photographsArray[x])
    } 
}

function previousArray() {
    if (x == 0 ) {
    } else {
        x = x - 1;
        const link = `assets/images/Sample Photos/${photographerName}/${photographsArray[x].image}`
    document.getElementById('selectedImage').setAttribute('src', link)
    }
}

init();

