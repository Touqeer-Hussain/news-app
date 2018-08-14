var stories = document.querySelector('#stories');
var api = '4523ce389261406a84e5e0b523425900';
var channel = document.querySelector('#channel')
var cate


channel.addEventListener('change', (event) =>{
    cate = channel.value;
    stories.innerHTML = "";
    feth();
})



cates()
async function cates(){
    
    let response = await fetch(`https://newsapi.org/v2/sources?apiKey=${api}`)
    let json = await response.json();
    channel.innerHTML += json.sources.map(sources => `<option value=${sources.id}>${sources.name}</option>`)
    cate = channel.value;
    feth();

}

async function feth(){

    let response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${cate}&apiKey=${api}`);
    let news = await response.json();
    stories.innerHTML += elements(news)
    

}






function elements(json){

    return json.articles.map(articles => `
    <div class="chuncks" id="${articles.source.id}">
    <div class="content" id="thumbnail">
        <img src="${articles.urlToImage}">
    </div>
    <div class="content" id="detail">
        <div class="title"><p>${articles.title}</p></div>
        <div class="descrip"><p>${articles.description}</p></div>
        <div class="author"><p>${articles.author}</p></div>
    </div>
    </div>`);
}



if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').then(function(){
        console.log('yes')
    })
}