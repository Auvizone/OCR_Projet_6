// TODO Afficher vidéo dans lightbox
// TODO aria-hidden marche pas quand lightbox est ouverte


//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
let photographer = '';
let photographerPictures = [];
let totalLikes = 0;
let photographerName = '';
let photographerPrice = 0;
let photographsArray = [];
let x = 1;
let sortMode = '';
let lightboxOpened = false;

// Fonction permettant de récupérer les infos du photographe
async function getPhotographer(id) {
    const response = await fetch('../../data/photographers.json');
    const photographers = await response.json();
    findId(photographers, id);
    photographerName = photographer.name;
    photographerPrice = photographer.price;
    return(photographer)
}

// Fonction permettant de récupérer l'id du photographe 
function findId(photographers, id) {
    let data = photographers.photographers;
    for (const element of data) {
        if (element.id == id) {
            photographer = element
        }
    }
}

// Fonction permettant d'ouvrir la lightbox
function openModale(data) {
    console.log("🚀 ~ file: photographer.js ~ line 36 ~ openModale ~ data", data)
    lightboxOpened = true;
    document.querySelector('.modal-background').style.display="flex";
    x = data.position;
    keyPress();
    const link = `assets/images/Sample Photos/${photographerName}/${photographsArray[x].image}`
    document.getElementById('selectedImage').setAttribute('src', link)
    document.getElementById('selectedImageName').innerHTML = data.title;
    document.getElementById('main').setAttribute('aria-hidden', true);
    document.getElementById('lightbox').setAttribute('aria-hidden', false);
    let btnClose = document.getElementById('close-modal');
    btnClose.focus();
}

//Fonction permettant de fermer la lightbox
function closeModale() {
    document.querySelector('.modal-background').style.display="none";
    lightboxOpened = false;
    keyPress();
}

// Fonction pour récupérer toutes les images
async function getAllPictures(data, name) {
    const response = await fetch(`../../data/photographers.json`)
    const pictures = await response.json();
    getPhotographerPictures(pictures.media, name)
    return(response)
}

// Fonction pour récupérer les photos du photographe choisi et de les trier
async function getPhotographerPictures(data, name) {
    let pos = 0
    const pictureSection = document.getElementById('picture-box');
    pictureSection.textContent = '';
    if(sortMode == '') {
        sortPicturesLikes(data)
    }
    if(sortMode == 'popularite') {
        sortPicturesLikes(data)
    }
    if(sortMode == 'date') {

        sortPicturesDate(data)
    }
    if(sortMode == 'titre') {

        sortPicturesTitre(data)
    }
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

// Fonction permettant de trier par titre
function sortPicturesTitre(data) {
    data.sort(function (a,b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    })
    return data;
}

// Fonction permettant de trier par likes
function sortPicturesLikes(data) {
    data.sort(function (a,b) {
        return b.likes - a.likes
    })
}
// Fonction permettant de trier par date
function sortPicturesDate(data) {
    data.sort(function (a,b) {
        return new Date(b.date) - new Date(a.date)
    })
}

// Fonction permettant de récupérer les données du formulaire de contact
function getContactData() {
    const prenom = document.getElementById('prenom');
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    console.log('Prenom:', prenom.value)
    console.log('Nom:', nom.value)
    console.log('Email:', email.value)
    console.log('Message:', message.value)
}

// Fonction permettant d'ajouter ou enlever un like sur une photo/vidéo
function addLikes(data) {
    if(data.updated) {
        data.likes--;
        totalLikes--;
        document.getElementById(`${data.id}`).innerHTML = data.likes + ' ' + `<i class="fa-regular fa-heart"></i>`;
        data.updated = false;
        document.querySelector('.text-info').innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
    } else if(!data.updated) {
        data.likes++;
        totalLikes++;
        document.getElementById(`${data.id}`).innerHTML = data.likes + ' ' + `<i class="fa-solid fa-heart"></i>`;
        data.updated = true;
        document.querySelector('.text-info').innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
    }
}

// Fonction permettant de générer les infos du photographe
async function displayData(data) {
    getAllPictures(data, data.name)
    
    const picture = `assets/photographers/${data.portrait}`;
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('location').innerHTML = data.city + ',' + ' ' + data.country
    document.getElementById('tag').innerHTML = data.tagline;
    document.getElementById('photo').setAttribute('src', picture)
    document.getElementById('photo').setAttribute('alt', photographerName)
}

// Fonction d'initiation de la page
async function init() {
    const photographer = await getPhotographer(id);
    displayData(photographer);
    document.getElementById('close-modal').addEventListener('click', closeModale);
    document.getElementById('next').addEventListener('click', nextArray)
    document.getElementById('prev').addEventListener('click', previousArray)
    document.getElementById('contact-button').addEventListener('click', getContactData)
}

//Fonction d'initiation du select
async function initSelect() {
    const popularite = document.getElementById('option-popularite')
    popularite.addEventListener('click', choosePopularite)
    const date = document.getElementById('option-date')
    date.addEventListener('click', chooseDate)
    const titre = document.getElementById('option-titre')
    titre.addEventListener('click', chooseTitre)

}

// Fonction pour régénérer le contenu après avoir filtré par likes
function choosePopularite() {
    sortMode = 'popularite';
    init();
}

// Fonction pour régénérer le contenu après avoir filtré par date
function chooseDate() {
    sortMode = 'date';
    init();
}

// Fonction pour régénérer le contenu après avoir filtré par titre
function chooseTitre() {
    sortMode = 'titre';
    init();
}

// Fonction pour afficher l'image suivante dans la lightbox
function nextArray() {
    if (x == photographsArray.length) {
        return;
    }
    if ( x < (photographsArray.length - 1)) {
        x = x + 1;
        const link = `assets/images/Sample Photos/${photographerName}/${photographsArray[x].image}`
    document.getElementById('selectedImage').setAttribute('src', link)
    document.getElementById('selectedImageName').innerHTML = photographsArray[x].title;

    } 
}

// Fonction pour afficher l'image précédente dans la lightbox
function previousArray() {
    if (x == 0 ) {
        return;
    } else {
        x = x - 1;
        const link = `assets/images/Sample Photos/${photographerName}/${photographsArray[x].image}`
    document.getElementById('selectedImage').setAttribute('src', link)
    document.getElementById('selectedImageName').innerHTML = photographsArray[x].title;

    }
}

function keyPress() {
    if(lightboxOpened) {
        document.onkeydown = function (event) {
            if(event.keyCode == 37) {
                previousArray()
            }
            if(event.keyCode == 39) {
                nextArray()
            }
            else {
                return;
            }
        }
    }
    if (!lightboxOpened) {
        document.onkeydown = null;
    }
    }

// Initiation de la page
init();
initSelect();

