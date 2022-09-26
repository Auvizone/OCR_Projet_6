function photographerPageFactory(data, photographerName) {
    const { name, portrait, city, country, price, tagline, id } = data;
    
    const pictureLink = `assets/images/Sample Photos/${photographerName}/${data.image}`;

    function getUserCardDOMPictures() {
        const article = document.createElement('article');
        article.classList.add('picture-box');
        const img = document.createElement('img');
        img.setAttribute('src', pictureLink)
        img.classList.add('picture')
        img.addEventListener('click', function passData() {
            openModale(data)
        })

        const div = document.createElement('div')
        div.classList.add('bottom-picture');
        const title = document.createElement('p')
        title.classList.add('title')
        title.textContent = data.title;

        const divLike = document.createElement('div');
        divLike.classList.add('like-box');

        const likes = document.createElement('p');
        div.classList.add('likes');
        likes.textContent = "Likes " +  data.likes;

        const icon = document.createElement('p');
        div.classList.add('heart-icon');
        icon.textContent = "<3"
        
        divLike.appendChild(likes);
        divLike.appendChild(icon)
        div.appendChild(title)
        div.appendChild(divLike)
        article.appendChild(img)
        article.appendChild(div)
        return (article);
    }
    return { name, portrait, city, country, price, tagline, id, getUserCardDOMPictures }
}