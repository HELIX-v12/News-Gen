// let apiURL = 'https://noozra.com/api/categories'; //Direct API call
let apiURL = '../categoryData.json'; //Local Data
let data;
let icons={};
async function getIcon(iconName){
    let icon_svg = await fetch(`../icons/${iconName}.svg`)
    let icon = await icon_svg.text();
    icon=icon.replace('width="16" height="16"' , 'width="40" height="40" class="categoryIcons"')
    icons[iconName]=icon;
    // console.log(icon)
   
}
async function getData() {
    let apiRequest = await fetch(apiURL);
    data = await apiRequest.json();
    if(!data.categories){
        console.log('Out of Tokens!!')
        alert(`Sorry! We are out of API tokens today
               Try again Tomorrow`)
    }
    for (catIndex in data.categories){
        await getIcon(data.categories[catIndex]);
    }
    
    console.log('HI THERE!');
    console.log(data);
    console.log(icons);
}
async function process() {
    await getData();
    let html_data = document.querySelector('.temp_area').innerHTML;
    for (key in icons) {
        let formatted_key = key[0].toUpperCase() +key.slice(1)
        html_data += `
            <a href="../index.html?category=${key}" class="linker">
            <div class="template">
            ${icons[key]}
            ${formatted_key}
            </div>
            </a>`;
             
    };
    document.querySelector('.temp_area').innerHTML = html_data;

}
process();

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




