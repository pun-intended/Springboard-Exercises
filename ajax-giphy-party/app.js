console.log("Let's get this party started!");



const api_key = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
const searchBtn = document.querySelector("#searchBtn");
const searchText = document.querySelector('#query');
const imgHolder = document.querySelector('#result');

searchBtn.addEventListener('click', changeImage);


async function retrieveGif(q) {
    let res = await axios.get(
        'http://api.giphy.com/v1/gifs/search', 
        {params: { q, api_key }});
    console.log(res.data)
    return res;
}

async function changeImage(){
    
    const searchQuery = searchText.value;
    const results = await retrieveGif(searchQuery);
    const num = Math.floor(Math.random()*results.data.data.length);
    const newUrl = results.data.data[num].images.original.url
    
    imgHolder.setAttribute('src', newUrl)
}


retrieveGif('test')