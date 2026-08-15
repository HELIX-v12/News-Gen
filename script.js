//js
let i = 0;
let link;
let news = {};
const btn = document.getElementById('b_');

//category sets
let category_collection = { "categories": ["ai", "business", "culture", "entertainment", "finance", "general", "health", "lifestyle", "opinion", "politics", "science", "sports", "tech", "weather", "world"] };
let category = category_collection.categories[Math.floor(Math.random() * (category_collection.categories.length))];
console.log(category);

//url pipeline--
const parameters = new URLSearchParams(window.location.search);
if (parameters.get("category")) {
    category = parameters.get('category');
    window.history.replaceState({}, "", "index.html");
}

// const url = `https://noozra.com/api/articles?category=${category}&limit=50`; //Use for internet only
const url=`ap.json`; //for local use only!
//API fetch--
let getNews = async () => {
    let response = await fetch(url);
    let data = await response.json(); //News in JSON format
    news = data;
    console.log(data);
    //API limit error
    if(data.error==='daily free-tier quota exceeded'){
        console.log('Out of Tokens!!')
        alert(`Sorry! We are out of API tokens today
               Try again Tomorrow`)
        head_data.innerHTML = "NO News Available!";
        src_data.innerHTML = "API token limit reached!";
        document.getElementById('r_M').innerHTML='Logging off';
        
    }
    console.log(news);


};
const now = Date.now();
async function loading() {

    setTimeout(() => {


        document.body.querySelector('.screen').classList.remove("l_")
        document.body.querySelector('.screen').classList.add("h_")
    }, 3000)
    await getNews();
    date_data.innerHTML = `${modernDate(news.articles[0].published_at)} ago`;
    head_data.innerHTML = news.articles[0].headline;
    src_data.innerHTML = news.articles[0].source;
    img_data.style.backgroundImage= `url("${news.articles[0].image_url}")`;
    //description must be dumplicated , so we Itrate the descr. 2 times from .des nodeList
    for (tag of description_data){
        tag.innerHTML=news.articles[0].description;
    }
    
    
    

}
loading();

let C = document.body.children;
let sound = C[C.length - 2];
let date_data = document.querySelector('#date');
let head_data = document.querySelector('.head');
let src_data = document.querySelector('.src');
let img_data=document.querySelector('.n_box');
let description_data=document.querySelectorAll('.des');
let index = 1;
//button event
// btn.addEventListener('click', () => {
//     sound.currentTime = 0;
//     sound.play();
//     date_data.innerHTML = `${modernDate(news.articles[index].published_at)} ago`;
//     head_data.innerHTML = news.articles[index].headline;
//     src_data.innerHTML = news.articles[index].source;
//     img_data.style.backgroundImage=`url("${news.articles[index].image_url}")`;
//     //description must be dumplicated , so we Itrate the descr. 2 times from .des nodeList
//     for (tag of description_data){
//         tag.innerHTML=news.articles[index].description;
//     }
//     index += 1;
//     if ((index) == (news.articles.length)) {
//         index = 0
//         console.log('newsRepeatingNow..')
//     };
    
// });


//Hamburger
const menu_button = document.querySelector('.menu')
const menu_area = document.querySelector('.case')
const close_button = document.querySelector('.close_button')
menu_button.addEventListener('click' , ()=>{
    menu_area.classList.toggle('show')
    
})
close_button.addEventListener('click' , ()=>{
    menu_area.classList.remove('show')
})
document.addEventListener('click' , (e)=>{
    if(!(menu_area.contains(e.target)) && !(menu_button.contains(e.target))){
        menu_area.classList.remove('show')
    }
})


//date function
 function modernDate(rawDate) {
    let i = new Date(rawDate);
    let j = new Date();
    const milliseconds = (j-i)
    const seconds =Math.floor(milliseconds/1000)
    const minutes= Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    if (seconds <60){
        return (`${seconds}s`);
    }
    else if(minutes<60){
        return (minutes==1)? (`${minutes}min`):(`${minutes}mins`);
    }
    else if(hours<24){
        return (`${hours}h`);
    }
    else{
        return (days==1)? (`${days}d`):(`${days}d`);
    }
}

//Sleep Function declaration
function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
}


//TypeWriter Display
let messageDisplay = document.querySelector(".message")
let messages= ['Hey there!' , 'How are you?' , 'Good Morning!' , 'Welcome' , 'Greetings!' , 'Voila~']
async function typewrite(arr ,bar_maxHt ,element_obj){
    while(true){
        for(let obj of arr){
            element_obj.style.setProperty("--height", `${bar_maxHt}`);
            for (let char of obj){
                element_obj.textContent += char;
                await sleep(200)
            };
            element_obj.classList.toggle('anim');
            await sleep(4000)
            for (let char of obj){
                element_obj.textContent= element_obj.textContent.slice(0,-1);
                await sleep(100)
                
            };
            element_obj.style.setProperty("--height", "0%");
            await sleep(2000);
            element_obj.classList.toggle('anim');
        }

    };
}
typewrite(messages , '140%' ,messageDisplay);
typewrite(messages , '105%',document.querySelector(".message2"))

//random array obj return function
let arrKeyGenCache=[];
function arrKeyGen(arr, cache='on'){
    let ind =Math.floor(Math.random()*arr.length);
        if(cache=='on'){
                if(arrKeyGenCache.includes(ind)){
                    return arrKeyGen(arr)

                }
                else{
                arrKeyGenCache.push(ind);
                return ind;

                }
            }
        else if(cache=='off'){
            return ind; 
        }
       
    
}


//Capitalize function
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

//Hz Cards
// const card_url='https://noozra.com/api/articles?limit=100'; //for online use only 
const card_url='ap.json';  //Local data
let articlesWithImage;
async function getCardData(){
    let data = await fetch(card_url);
    let card_data = await data.json();
    articlesWithImage = card_data.articles.filter(
            artc => artc.image_url
        );
    let tag=0;
    while (tag<20){
        document.querySelector('.scrollStrip').innerHTML+=`
                    <div class="scrollCard">
                        <div class="card_img"></div>
                        <div class="card_cat"></div>
                        <div class="card_txt"></div>
                        <div class="card_date"></div>
                     </div>`
        tag++;
    }
    let tile=0
    while (tile<20){
        document.querySelector('.tileArea').innerHTML+=`
                    <div class="tile">
                        <div class="tile_img"></div>
                        <div class="tileStat">
                            <div class="tile_source"></div>
                            <div class="tile_txt"></div>
                            <div class="tile_date"></div>
                        </div>
                    </div>`
        tile++;
    }

}
async function cardRender(){
    await getCardData();
    let cards = document.querySelectorAll('.scrollCard');
    for (let card of cards){
        let card_img=card.querySelector('.card_img');
        let card_txt=card.querySelector('.card_txt');
        let card_cat=card.querySelector('.card_cat');
        let card_date=card.querySelector('.card_date');

        let article=articlesWithImage[arrKeyGen(articlesWithImage)];
        let image = new Image();
        image.onload= () =>{
            card_img.style.backgroundImage=`url(${article.image_url})`
        }
        image.src=article.image_url;
        card_txt.textContent=article.headline;
        card_cat.textContent=capitalize(article.category);
        card_date.textContent=modernDate(article.published_at)+' ago';
        card.addEventListener('click' , ()=>{
            window.location.href = article.url;
        })
    
    }
    let tiles = document.querySelectorAll('.tile');
    for (let tile of tiles){
        let tile_img=tile.querySelector('.tile_img');
        let tile_txt=tile.querySelector('.tile_txt');
        let tile_date=tile.querySelector('.tile_date');
        let tile_source=tile.querySelector('.tile_source');
        let article=articlesWithImage[arrKeyGen(articlesWithImage)];
        let image = new Image();
        image.onload= () =>{
            tile_img.style.backgroundImage=`url(${article.image_url})`
        }
        image.src=article.image_url;
        tile_txt.textContent=article.headline;
        tile_date.textContent=article.date;
        tile_source.textContent=article.source;
        
        //title styles
        const colors = [
        '#2563eb',
        '#7c3aed',
        '#db2777',
        '#dc2626',
        '#ea580c',
        '#16a34a',
        '#b20876',
        '#b20808',
        '#128214',
        '#fb9b01',
        '#282e2f',
        '#8807eb',
        '#ea0bdf',
        '#8ab208',
        '#35dc14',
        '#b2a408',
        '#0891b2',
        '#0891b2',
        '#ff0000',
        ];
        tile_source.style.color=colors[arrKeyGen(colors, 'off')]

    }


}
cardRender();