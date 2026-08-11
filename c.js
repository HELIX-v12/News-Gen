let txt = document.querySelector('#txt')
let messages = ['Hi there!' , 'How are you doing?', 'All good?']
function sleep(time){return new Promise(resolve=>setTimeout(resolve,time))}
async function typr() {
    while(true){
        for (let m of messages){
            
            for(let char of m){
                txt.textContent+=char;
                await sleep(150);
            }
            await sleep(1400);
            for (let char of m){
                txt.textContent=txt.textContent.slice(0,-1);
                await sleep(50);
            }
        }
     }
}
typr()
// console.log(txt)
// let x='hit'
// for (t in x){
//     console.log(t , x[t])
// }
// console.log(x[1])