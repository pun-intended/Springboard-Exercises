
const cupcake_list = document.querySelector('ul[name="cupcake_list"]')
const URL = "http://127.0.0.1:5000"

console.log(cupcake_list)



async function get_cupcakes(){
    let cupcakes = await axios.get(`${URL}/api/cupcakes`);
    let cupcake_list = cupcakes.data
    console.log(cupcake_list)
    return cupcake_list;
}


async function add_cupcakes(){
    console.log("ADDING CUPCAKES")
    let all_cupcakes = await get_cupcakes();
    for(cupcake of all_cupcakes.cupcakes){
        cupcake_list.innerHTML += `<li>${cupcake.flavor}</li><br>`
    }
}




document.addEventListener('DOMContentLoaded', add_cupcakes)