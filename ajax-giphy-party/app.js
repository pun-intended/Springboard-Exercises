console.log("Let's get this party started!");



const api_key = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
const searchBtn = document.querySelector("#searchBtn");
const removeBtn = document.querySelector("#removeBtn");
const searchText = document.querySelector('#query');
const gallery = document.querySelector('#gifGallery');

searchBtn.addEventListener('click', addImage);
removeBtn.addEventListener('click', () => {
    gallery.innerHTML = "";
})


async function retrieveGif(q) {
    let res = await axios.get(
        'http://api.giphy.com/v1/gifs/search', 
        {params: { q, api_key }});
    console.log(res.data)
    return res;
}

async function addImage(){
    
    const searchQuery = searchText.value;
    const results = await retrieveGif(searchQuery);
    const num = Math.floor(Math.random()*results.data.data.length);
    const url = results.data.data[num].images.original.url
    let img = createImg(url);
    gallery.append(img);

}

function createImg(url) {
    let newImg = document.createElement("img");
    newImg.classList.add('result');
    newImg.setAttribute('src', url);
    return newImg;
}