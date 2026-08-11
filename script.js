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

const url = `https://noozra.com/api/articles?category=${category}&limit=50`; //Use for internet only
// const url=`ap.json`; //for local use only!
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
    description_data.innerHTML = news.articles[0].description;
    img_data.style.backgroundImage= `url("${news.articles[0].image_url}")`;
    link = news.articles[0].url;
    
    

}
loading();

let C = document.body.children;
let sound = C[C.length - 2];
let date_data = document.querySelector('#date');
let head_data = document.querySelector('.head');
let src_data = document.querySelector('.src');
let img_data=document.querySelector('.n_box');
let description_data=document.querySelector('.n_des')
let index = 0;
//button event
btn.addEventListener('click', () => {
    sound.currentTime = 0;
    sound.play();
    date_data.innerHTML = `${modernDate(news.articles[index].published_at)} ago`;
    head_data.innerHTML = news.articles[index].headline;
    src_data.innerHTML = news.articles[index].source;
    description_data.innerHTML = news.articles[index].description;
    img_data.style.backgroundImage=`url("${news.articles[index].image_url}")`;
    link = news.articles[index].url;
    
    index += 1;
    if ((index) >= (news.articles.length)) {
        index = 0
        console.log('newsRepeatingNow..')
    };
    
});


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
