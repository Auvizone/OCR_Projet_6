function photographerPageFactory(data, photographerName) {
    console.log(data)
    const { name, portrait, city, country, price, tagline, id } = data;
    
    const pictureLink = `assets/images/Sample Photos/${photographerName}/${data.image}`;
    console.log(pictureLink)

    function getUserCardDOMPictures() {
        const article = document.createElement('article');
        article.classList.add('picture-box');
        const img = document.createElement('img');
        img.setAttribute('src', pictureLink)
        img.classList.add('picture')
        article.appendChild(img)
        return (article);
    }
    return {  name, portrait, city, country, price, tagline, id, getUserCardDOMPictures }
}