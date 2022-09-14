//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
let photographer = '';
let photographerPictures = [];

async function getPhotographer(id) {
    const response = await fetch('../../data/photographers.json');
    const photographers = await response.json();
    findId(photographers, id);
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

async function getPictures(data, name) {
    const response = await fetch(`../../data/photographers.json`)
    const pictures = await response.json();
    sortPictures(pictures.media, name)
    return(response)
}

async function sortPictures(data, name) {
    console.log(data)
    console.log(id)

    const pictureSection = document.getElementById('picture-box');
    data.forEach(element => {
        if (element.photographerId == id) {
            const photographPictures = photographerPageFactory(element, name)
            const userCardDom = photographPictures.getUserCardDOMPictures();
            pictureSection.appendChild(userCardDom)
        } else {
            return;
        }
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
}

init();

