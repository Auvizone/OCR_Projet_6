//Mettre le code JavaScript lié à la page photographer.html
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    console.log(id)

    getPhotographers(id);
    
    async function getPhotographers(id) {
        const response = await fetch('../../data/photographers.json');
        const photographers = await response.json();
        console.log(photographers)
        findId(photographers, id);
        return(photographers)
    }

    function findId(photographers, id) {
        var data = photographers.photographers;
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                console.log('photographe trouvé', data[i])
                return(data[i])
            }
        }
    }

