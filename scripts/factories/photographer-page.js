/** Fonction pour générer et afficher les images du photographe sur sa page
 * 
 * @param {*} data - Données de toutes les photos du photographe
 * @param {*} photographerName - Nom du photographe
 * @returns 
 */
function photographerPageFactory(data, photographerName) {
    const { name, portrait, city, country, price, date, tagline, id } = data;
    const pictureLink = `assets/images/Sample Photos/${photographerName}/${data.image}`;
    const videoLink = `assets/images/Sample Photos/${photographerName}/${data.video}`;
    
    function getUserCardDOMPictures() {
        let content;
        const article = document.createElement('article');
        article.classList.add('picture-box');
        if(data.image !== undefined) {
            const img = document.createElement('img');
            img.setAttribute('src', pictureLink)
            img.setAttribute('alt', data.title)
            img.setAttribute('tabindex', 0)
            img.classList.add('picture')
            img.addEventListener('keypress', function passData() {
                if(event.key == "Enter")
                openModale(data)
            })
            img.addEventListener('click', function passData() {
                openModale(data)
            })
            content = img;
        } 
        if(data.video !== undefined) {
            const video = document.createElement('video');
            video.classList.add('picture')
            video.setAttribute('alt', data.title)
            video.setAttribute('controls', true)
            const source = document.createElement('source')
            source.setAttribute('src', videoLink)
            source.setAttribute('type', 'video/mp4')
            video.appendChild(source);
            content = video;
        }
        
        const div = document.createElement('div')
        div.classList.add('bottom-picture');
        const title = document.createElement('p')
        title.classList.add('title')
        title.textContent = data.title;

        const divLike = document.createElement('div');
        divLike.classList.add('like-box');
        
        const likes = document.createElement('p');
        likes.setAttribute('id', data.id)
        div.classList.add('likes');
        likes.innerHTML = data.likes + ' ' + `<i class="fa-regular fa-heart"></i>`;
        likes.addEventListener('click', function passLikes() {
            addLikes(data)
        })

        divLike.appendChild(likes);
        div.appendChild(title)
        div.appendChild(divLike)
        article.appendChild(content)
        article.appendChild(div)
        return (article);
    }
    return { name, portrait, city, country, price, date, tagline, id, getUserCardDOMPictures }
}