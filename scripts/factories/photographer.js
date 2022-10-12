    /** Factory pour générer le bloc de chaque photographe sur la page d'accueil
     * 
     * @param data - Données de tous les photographes
     * @returns - Articles photographes
     * 
     */
function photographerFactory(data) {
    console.log(data)
    const { name, portrait, city, country, price, tagline, id } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add('photographer')
        const a = document.createElement('a');
        a.setAttribute('href', `http://127.0.0.1:5500/photographer.html?id=${id}`)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        a.appendChild(img)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city + ',' + ' ' + country;
        location.classList.add('location')
        const tag = document.createElement('p');
        tag.textContent = tagline
        tag.classList.add('tag')
        const priceTag = document.createElement('p');
        priceTag.textContent = price + '€/jour';
        priceTag.classList.add('priceTag')
        article.appendChild(a);
        article.appendChild(h2);
        article.appendChild(location)
        article.appendChild(tag)
        article.appendChild(priceTag)
        // article.addEventListener('click', () => {
        //     window.location.href = `http://127.0.0.1:5500/photographer.html?id=${id}`
        // })
        return (article);
    }
    return { name, picture, city, price, tagline, getUserCardDOM }
}