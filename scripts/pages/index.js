    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json

        const response = await fetch('../../data/photographers.json');
        const photographers = await response.json();

        console.log(photographers)

        // et bien retourner le tableau photographers seulement une fois
        return (photographers)
    }

    async function displayData(data) {
        const photographersSection = document.querySelector(".photographer_section");

        data.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    