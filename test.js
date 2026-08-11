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
        return (`${seconds} s`);
    }
    else if(minutes<60){
        return (minutes==1)? (`${minutes} min`):(`${minutes} mins`);
    }
    else if(hours<24){
        return (`${hours} h`);
    }
    else{
        return (days==1)? (`${days} day`):(`${days} days`);
    }
}


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




