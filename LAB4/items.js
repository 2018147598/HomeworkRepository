let i = 0;

function getItems(){
    fetch("https://2018147598.github.io/HomeworkRepository/LAB4/product.json")
    .then(checkStatus)
    .then(response => {
        return response.json()
    })
    .then(processData)
    .catch(error => {
        console.log(error)
        document.getElementById("more_button").remove()
    })
}

function checkStatus(response){
    if(response.ok){
        return response
    }
    else{
        throw Error("Error in request")
    }
}

function search(){
    document.getElementById("paks").innerHTML = ""
    console_num = document.getElementById("drop_consoles").value
    search_query = document.getElementById("search_box").value
    i = 0;
    data = fetch("https://2018147598.github.io/HomeworkRepository/LAB4/product.json")
    .then(checkStatus)
    .then(async response => { 
            parsed = await response.json()
            return {parsed,console_num,search_query}})
    .then(search_console)
    .then(search_keyword)
    .catch(error => {
        console.log(error)
    }) 
    /*if(console_num == 0 && search_query != ""){
        search_keyword(search_query)
    }*/
}

function search_console(data){
    let j
    products = data.parsed
    console_num = data.console_num
    search_query = data.search_query
    let arr = []
    if(console_num == 0){
        arr = products
        return {arr, console_num, search_query}
    }
    else if(console_num > 5 || console_num < 0){
        throw error
    }
    else{
        for(j = 0; j < products.length; j++){
            if(console_num == products[j].console){
                arr.push(products[j])
            }
        }
        return {arr, console_num, search_query}
    }
}

function search_keyword(data){
    let arr = []
    products = data.arr
    console_num = data.console_num
    search_query = data.search_query
    console.log(console_num)
    console.log(search_query)
    paks = document.getElementById("paks")
    if(console_num == 0 && search_query == ""){
        console.log("test")
        for(j = 0; j < 6; j++){
            let existing = paks.innerHTML
            let newItem = '<div class="item"' +'name="' + products[j].name + '" price='+ products[j].price + '>' + '<img src="./images/' + products[j].image + '">' + '</div>'
            paks.innerHTML = existing + newItem
        }
        if(document.getElementById("more_button") == null){
            let new_button = '<div id="more_button" style="text-align: center; margin: 20px;"><button onclick="getItems()">More</button></div>'
            document.getElementById("more_wrap").innerHTML = new_button
        }
        return;
    }
    if(document.getElementById("more_button") != null){
        document.getElementById("more_button").remove()
    }
    if(search_query != ""){
        for(j = 0; j < products.length; j++){
            let current_name = products[j].name
            if(current_name.toLowerCase().includes(search_query.toLowerCase())){
                arr.push(products[j])
            }
        }
    }
    else{
        arr = products
    }
    let newItem
    console.log(arr)
    if(arr.length == 0){
        let existing = paks.innerHTML
        newItem = '<div class="no_result"><img src="./images/noresult.png" width="200" height="200"><div style="padding: 30px">No Result Found</div></div>'
        paks.innerHTML = existing + newItem
    }
    else{
        for(j = 0; j < arr.length; j++){
            let existing = paks.innerHTML
            newItem = '<div class="item"' +'name="' + arr[j].name + '" price='+ arr[j].price + '>' + '<img src="./images/' + arr[j].image + '">' + '</div>'
            paks.innerHTML = existing + newItem
        }
    }
}


function processData(data){
    let j
    paks = document.getElementById("paks")
    for(j = 0; j < 6; j++){
        let existing = paks.innerHTML
        let newItem = '<div class="item"' +'name="' + data[i].name + '" price='+ data[i].price + '>' + '<img name="test" src="./images/' + data[i].image + '">' + '</div>'
        i++
        paks.innerHTML = existing + newItem;
    }
}

function explanation(){
    let selected = event.target.parentElement
    if(selected.getAttribute("class") != "item"){
        return
    }
    if(selected.getAttribute("selected") == "true"){
        return
    }
    selected.setAttribute("selected","true")
    let price = document.createElement("span")
    let price_text = document.createTextNode("₩ "+ selected.getAttribute("price"))
    price.appendChild(price_text)
    selected.appendChild(price)
    selected.lastChild.setAttribute("class", "price_text")
    let name = document.createElement("span")
    let name_text = document.createTextNode(selected.getAttribute("name"))
    name.appendChild(name_text)
    selected.appendChild(name)
    selected.lastChild.setAttribute("class", "name_text")
    console.log(1)
}
