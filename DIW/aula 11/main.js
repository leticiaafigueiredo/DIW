//funcao que cria o corpo do card
function renderCard(index) {
    const cardDiv = document.createElement('div'); //var que tem metodo para criar elem.
    cardDiv.className = "col-md-3 col-sm-6 mb-3"; // adiciona ao elemt uma classe

    cardDiv.innerHTML = `
    <div class="card" >
        <img src="https://picsum.photos/id/${index*7}/200" class="card-img-top object-fit-cover" alt="..." height="300px">
            <div class="card-body">
            <h5 class="card-title">Card número ${index}</h5>
            <p class="card-text">veja nossas opções de plantas mais verdinhas.</p>
            <p>R$ ${index*10},00</p>
            <button href="./album.html" class="cart-button btn btn-success" data-action="add">Adicionar carrinho</button>
        </div>
    </div>`; //conteudo da div

    const cartButton = cardDiv.querySelector(".cart-button"); //retorna o elemt da classe x
    cartButton.addEventListener("click", function (){ //fica de olho no elemt retornado
        toggleCartButton (cardDiv, cartButton);
    });
    return cardDiv;
}


var counter = document.querySelector('.counter'); //variavel que recebe o contador
function counterPluss (){ //funcao que faz a soma
    var numero = /*transforma em string*/parseInt(counter.textContent) + 1; //variavel numero que pega o texto contido em counter e adiciona 1
    counter.textContent = numero; // coloca em counter o texto da variavel numero
}

function counterMinor(){
    var numero = parseInt(counter.textContent) - 1;
    counter.textContent = numero;
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
        counterPluss();
    } else { // se action for = remove
        cartButton.textContent = "Adicionar ao carrinho";
        cardDiv.classList.remove("added");
        cartButton.classList.remove("btn-secondary");
        cartButton.classList.add("btn-success");
        cartButton.setAttribute("data-action", "add");
        counterMinor();
    }

}

function renderCardsSection(numCards = 12) {
    console.log('renderCardsSection function called');
    const cardContainer = document.getElementById('card-container');

    for ( let i=0; i<numCards; i++) {
        const card = renderCard(i+1); //passa por parametro i+1=index
        cardContainer.appendChild(card); //cardContainer ganha um filho chamado card, que e repetido na funcao for
    }
}

renderCardsSection();
