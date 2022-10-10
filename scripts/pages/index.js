    
    // Fonction permettant de récupérer les données pour afficher les photographes
    async function getPhotographers() {

        const response = await fetch('../../data/photographers.json');
        const photographers = await response.json();

        return (photographers)
    }

    /** Fonction pour afficher les données recues
     * 
     * @param data- Les données de tous les photographes
     */ 
        function displayData(data) {
        const photographersSection = document.querySelector(".photographer_section");

        data.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    // Fonction pour initier la page et executer les fonctions ci-dessus
    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    // Initiation
    init();
    