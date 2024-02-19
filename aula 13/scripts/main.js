let cartItemCount=0;

function updateCounter(){
    const counter = document.getElementById("counter");
    counter.textContent = cartItemCount;

}

//funcao que cria o corpo do card
function renderCard(product) { //product==data==json
    const cardDiv = document.createElement("div"); //var que tem metodo para criar elem.
    cardDiv.className = "col-md-3 col-sm-6 mb-3"; // adiciona ao elemt uma classe

    cardDiv.innerHTML = `
    <div class="card" >
        <img src="${product.image}" class="card-img-top object-fit-cover" alt="..." height="270px">
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="rate">Avaliacação: ${creatStarRating(product.rating.rate)}</p>
            <p class="card-text">${product.description}</p>
            <p>R$ ${product.price},00</p>
            <button href="./album.html" class="cart-button btn btn-success" data-action="add">Adicionar carrinho</button>
            <a class=" btn btn-outline-secondary mt-2" href = "./details.html?id=${product.id}" >ver detalhes</a>
        </div>
    </div>`; //conteudo da div

    const cartButton = cardDiv.querySelector(".cart-button"); //retorna o elemt da classe x
    cartButton.addEventListener("click", function (){ //fica de olho no elemt retornado
        toggleCartButton (cardDiv, cartButton);
    });
    return cardDiv;
}


function creatStarRating(rate) {
    const roundedRating = Math.round(rate);

    const filledStar = '★';
    const emptyStar = '☆';

    let starsRating = '';

    for( let i=0; i<5; i++){
        if(i<roundedRating){
            starsRating+= filledStar;
        }else{
            starsRating+= emptyStar;
        }
    }
    return starsRating;
}



// funcao para alternar entre adicionar e remover
function toggleCartButton(cardDiv, cartButton){
    const action = cartButton.getAttribute("data-action");
    //add ou remove
    if(action==="add") {
        cartButton.textContent = " Remover do carrinho"; // o texto no botao muda
        cardDiv.classList.add("added"); //adiciona x na classe do elemt cardDiv
        cartButton.classList.remove("btn-success"); // remove x na classe do elemt cartButton
        cartButton.classList.add("btn-secondary"); // adiciona x na classe do elemt cartButton
        cartButton.setAttribute("data-action", "remove"); //muda o valor do atributo x para y ("x", "y")
        cartItemCount++;
    } else { // se action for = remove
        cartButton.textContent = "Adicionar ao carrinho";
        cardDiv.classList.remove("added");
        cartButton.classList.remove("btn-secondary");
        cartButton.classList.add("btn-success");
        cartButton.setAttribute("data-action", "add");
        cartItemCount--;
    }
    updateCounter()

}

async function fetchProductDetails(){ //funcao assincrona, o codigo continua enquanto ela carrega
    try{ 
        const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json(); // data pega apenas o json de response
    return data;
    }  catch(error) {
        console.error('erro ao buscar os dados', error);
    }
}

// Funcao para renderizar a pagina
async function renderPage() {
    const cardContainer = document.getElementById("card-container");

    const data = await fetchProductDetails(); //espera a funcao fetch
    console.log(data);

    for(let i=0; i < data.length; i++) {
        const card = renderCard(data[i]);
        cardContainer.appendChild(card);
    }

    updateCounter(); //inicializa o contador
}

// chama a funcao para renderizar a pagina
renderPage();