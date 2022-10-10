// TODO Fermer modale contact quand on appuie sur le bouton envoyer
// TODO aria-hidden marche pas quand lightbox est ouverte

//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
let photographer = '';
let photographerPictures = [];
let totalLikes = 0;
let namePhotographer = '';
let photographerPrice = 0;
let photographsArray = [];
let x = 1;
let sortMode = '';
let lightboxOpened = false;

let selectedImage = document.getElementById('selectedImage');
let selectedImageName = document.getElementById('selectedImageName');
let main = document.getElementById('main');
let tri = document.querySelector('.tri');
let pictureBox = document.getElementById('picture-box');
let infoPhotographes = document.querySelector('.infos-photographe');
let lightbox = document.getElementById('lightbox');
let btnClose = document.getElementById('close-modal');
let modalBackground = document.querySelector('.modal-background');
let textInfo = document.querySelector('.text-info');
let textPrice = document.querySelector('.text-price');
let photographerName = document.getElementById('photographer-name');
let prenom = document.getElementById('prenom');
let nom = document.getElementById('nom');
let email = document.getElementById('email');
let message = document.getElementById('message');
let name = document.getElementById('name');
let locationId = document.getElementById('location');
let photo = document.getElementById('photo');
let tag = document.getElementById('tag');
let closeModalId = document.getElementById('close-modal');
let popularite = document.getElementById('option-popularite')
let date = document.getElementById('option-date')
let titre = document.getElementById('option-titre')


// Fonction permettant de récupérer les infos du photographe
async function getPhotographer(id) {
    const response = await fetch('../../data/photographers.json');
    const photographers = await response.json();
    findId(photographers, id);
    namePhotographer = photographer.name;
    photographerPrice = photographer.price;
    return (photographer)
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
    lightboxOpened = true;
    document.querySelector('.modal-background').style.display = "flex";
    x = data.position;
    keyPress();
    const link = `assets/images/Sample Photos/${namePhotographer}/${photographsArray[x].image}`
    selectedImage.setAttribute('src', link)
    selectedImageName.innerHTML = data.title;
    main.setAttribute('aria-hidden', true);
    tri.setAttribute('aria-hidden', true);
    pictureBox.setAttribute('aria-hidden', true);
    infoPhotographes.setAttribute('aria-hidden', true);
    lightbox.setAttribute('aria-hidden', false);
    btnClose.focus();
}

//Fonction permettant de fermer la lightbox
function closeModale() {
    modalBackground.style.display = "none";
    lightboxOpened = false;
    keyPress();
}

// Fonction pour récupérer toutes les images
async function getAllPictures(data, name) {
    const response = await fetch(`../../data/photographers.json`)
    const pictures = await response.json();
    getPhotographerPictures(pictures.media, name)
    return (response)
}

// Fonction pour récupérer les photos du photographe choisi et de les trier
async function getPhotographerPictures(data, name) {
    let pos = 0
    pictureBox.textContent = '';
    if (sortMode == '') {
        sortPicturesLikes(data)
    }
    if (sortMode == 'popularite') {
        sortPicturesLikes(data)
    }
    if (sortMode == 'date') {

        sortPicturesDate(data)
    }
    if (sortMode == 'titre') {

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
            pictureBox.appendChild(userCardDom)
        } else {
            return;
        }
        // document.querySelector('.text-info').textContent = `${totalLikes} <i class="fa-solid fa-heart"></i> // ${photographerPrice} € /h`
        textInfo.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
        textPrice.innerHTML = `${photographerPrice}€ / jour`
        photographerName.innerHTML = `${namePhotographer}`;
    });
}

// Fonction permettant de trier par titre
function sortPicturesTitre(data) {
    data.sort(function (a, b) {
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
    data.sort(function (a, b) {
        return b.likes - a.likes
    })
}
// Fonction permettant de trier par date
function sortPicturesDate(data) {
    data.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
    })
}

// Fonction permettant de récupérer les données du formulaire de contact
function getContactData() {
    console.log('Prenom:', prenom.value)
    console.log('Nom:', nom.value)
    console.log('Email:', email.value)
    console.log('Message:', message.value)
}

// Fonction permettant d'ajouter ou enlever un like sur une photo/vidéo
function addLikes(data) {
    if (data.updated) {
        data.likes--;
        totalLikes--;
        document.getElementById(`${data.id}`).innerHTML = data.likes + ' ' + `<i class="fa-regular fa-heart"></i>`;
        data.updated = false;
        textInfo.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
    } else if (!data.updated) {
        data.likes++;
        totalLikes++;
        document.getElementById(`${data.id}`).innerHTML = data.likes + ' ' + `<i class="fa-solid fa-heart"></i>`;
        data.updated = true;
        textInfo.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
    }
}

// Fonction permettant de générer les infos du photographe
async function displayData(data) {
    getAllPictures(data, data.name)

    const picture = `assets/photographers/${data.portrait}`;
    name.innerHTML = data.name;
    locationId.innerHTML = data.city + ',' + ' ' + data.country
    tag.innerHTML = data.tagline;
    photo.setAttribute('src', picture)
    photo.setAttribute('alt', namePhotographer)
}

let next = document.getElementById('next');
let prev = document.getElementById('prev');
let contactButton = document.getElementById('contact-button');

// Fonction d'initiation de la page
async function init() {
    const photographer = await getPhotographer(id);
    displayData(photographer);
    closeModalId.addEventListener('click', closeModale);
    next.addEventListener('click', nextArray)
    prev.addEventListener('click', previousArray)
    contactButton.addEventListener('click', getContactData)
}


//Fonction d'initiation du select
async function initSelect() {
    popularite.addEventListener('click', choosePopularite)
    date.addEventListener('click', chooseDate)
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
        console.log('test')
        return;
    }
    if (x < (photographsArray.length - 1)) {
        x = x + 1;
        if (photographsArray[x].image) {
            const image = document.getElementById('selectedImage');
            if(!image) {
                const newImage = document.createElement('img');
                newImage.setAttribute('id', 'selectedImage');
                const title = document.getElementById('selectedImageName')
                document.querySelector('.modal-box').insertBefore(newImage, title)
            }
            console.log('image')
            const link = `assets/images/Sample Photos/${namePhotographer}/${photographsArray[x].image}`
            document.getElementById('selectedImage').setAttribute('src', link)
            document.getElementById('selectedImageName').innerHTML = photographsArray[x].title;
            const video = document.getElementById('video-lightbox');
            if(video) {
                document.querySelector('.modal-box').removeChild(video)
            }
        } else if (photographsArray[x].video) {
            console.log('video')
            const link = `assets/images/Sample Photos/${namePhotographer}/${photographsArray[x].video}`;
            const video = document.createElement('video');
            const image = document.getElementById('selectedImage');
            console.log("🚀 ~ file: photographer.js ~ line 237 ~ nextArray ~ image", image)
            if(image) {
                document.querySelector('.modal-box').removeChild(image)
            }
            video.setAttribute('id', 'video-lightbox')
            video.setAttribute('controls', true);
            const source = document.createElement('source')
            source.setAttribute('src', link)
            source.setAttribute('type', 'video/mp4')
            video.appendChild(source)
            const title = document.getElementById('selectedImageName')
            document.querySelector('.modal-box').insertBefore(video, title)
        }
    }
}

// Fonction pour afficher l'image précédente dans la lightbox
function previousArray() {
    if (x == 0) {
        return;
    } else {
        x = x - 1;
        if (photographsArray[x].image) {
            const image = document.getElementById('selectedImage');
            if(!image) {
                const newImage = document.createElement('img');
                const title = document.getElementById('selectedImageName')
                newImage.setAttribute('id', 'selectedImage');
                document.querySelector('.modal-box').insertBefore(newImage, title)
            }
            console.log('image')
            const link = `assets/images/Sample Photos/${namePhotographer}/${photographsArray[x].image}`
            document.getElementById('selectedImage').setAttribute('src', link)
            document.getElementById('selectedImageName').innerHTML = photographsArray[x].title;
            const video = document.getElementById('video-lightbox');
            if(video) {
                document.querySelector('.modal-box').removeChild(video)
            }
        } else if (photographsArray[x].video) {
            console.log('video')
            const link = `assets/images/Sample Photos/${namePhotographer}/${photographsArray[x].video}`;
            const video = document.createElement('video');
            const image = document.getElementById('selectedImage');
            console.log("🚀 ~ file: photographer.js ~ line 237 ~ nextArray ~ image", image)
            if(image) {
                document.querySelector('.modal-box').removeChild(image)
            }
            video.setAttribute('id', 'video-lightbox')
            video.setAttribute('controls', true);
            const source = document.createElement('source')
            source.setAttribute('src', link)
            source.setAttribute('type', 'video/mp4')
            video.appendChild(source)
            const title = document.getElementById('selectedImageName')
            document.querySelector('.modal-box').insertBefore(video, title)
        }

    }
}

function keyPress() {
    if (lightboxOpened) {
        document.onkeydown = function (event) {
            if (event.keyCode == 37) {
                previousArray()
            }
            if (event.keyCode == 39) {
                nextArray()
            }
            if (event.keyCode == 27) {
                closeModale();
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

