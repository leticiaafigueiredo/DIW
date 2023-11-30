async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://trabalho-pratico-2-diw.leticiafigueir5.repl.co/albuns/${productId}`);
        const product = await response.json();
        console.log(productId);
        return product;
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}

function getFotos() {
    const url = `https://trabalho-pratico-2-diw.leticiafigueir5.repl.co/fotos` //api
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((array_data) => {
        console.log(array_data)
        renderDetails(array_data);
      });
  }
  

//FUNCAO PARA ATUALIZAR O CONETUDO HTMLCPM OS DETALHES DO PRODUTO

function updateProductDetails(product) {
    if (product) {
        document.getElementById('nameAlbum').textContent = product.name;
        document.getElementById('imgAlbum').src = product.cover;
        document.getElementById('descripitionAlbum').textContent = product.description;
        document.getElementById('latAlbum').textContent = product.location_coordinates[0];
        document.getElementById('longAlbum').textContent = product.location_coordinates[1];
        document.getElementById('dateAlbum').textContent = product.date;


    } else {
        alert('Produto nao encontrado');
    }
}

function renderFotos(fotos){
  const fotosDiv = document.createElement("div");
  fotosDiv.className = "col-md-4 col-sm-12";

  fotosDiv.innerHTML = `
  <div class="card mb-3">
            <img
              src="${fotos.src}"
              class="card-img-top object-fit-cover" alt="..." height="300px">
            <div class="card-body">
              <p class="card-text">${fotos.texto}</p>
              <button type="button" class="btn btn-success" data-bs-toggle="modal"
                  data-bs-target="#exampleModal">detalhes
              </button>
            </div>
          </div>`
  return fotosDiv;

}

function renderModal(fotos){
  const modalDiv = document.createElement("div");
  modalDiv.className = "carousel-item active";

  modalDiv.innerHTML = `
  <img src="${fotos.src}"
  class="d-block w-100 object-fit-cover " height="500px" alt="...">
  <div class="carousel-caption d-none d-md-block ">
              <p class="carousel-textModal">${fotos.texto}</p>
            </div>`

  return modalDiv;

}


//funcao para inicializar a pagina e buscar detalhes do produto
async function renderDetails(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(data[productId-1]);

    const product = await fetchProductDetails(productId);
    updateProductDetails(product);

    const fotosSection = document.getElementById('fotosSection');
    const modalSection = document.getElementById('carousel-inner');

  //cards de fotos
    for (let i = 0; i < data[productId-1].length; i++) {
    const fotos = renderFotos(data[productId-1][i]);
    fotosSection.appendChild(fotos);
  }

  //modal de fotos
  for (let i = 0; i < data[productId-1].length; i++) {
    const fotos = renderModal(data[productId-1][i]);
    modalSection.appendChild(fotos);
  }

}
getFotos();








