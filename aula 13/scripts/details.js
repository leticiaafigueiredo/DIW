async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}

//FUNCAO PARA ATUALIZAR O CONETUDO HTMLCPM OS DETALHES DO PRODUTO

function updateProductDetails(product) {
    if (product) {
        document.getElementById('productName').textContent = product.title;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productCategory').textContent = product.category;
        document.getElementById('productPrice').textContent = `R$ ${product.price}`;

        //updateAdditionalImages(product.images);
    } else {
        alert('Produto nao encontrado');
    }
}
//funcao para inicializar a pagina e buscar detalhes do produto
async function renderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const productId = urlParams.get('id');
    console.log(productId);

    const product = await fetchProductDetails(productId);
    updateProductDetails(product);
}

renderDetails();


//FUNCAO PARA ATUALIZAR AS LISTAS DE IMAGENS
function updateAdditionalImages(images) {
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = '';

    images.forEach((imageURL) => {
        const imageCol = document.createElement('div');
        imageCol.className = 'col-md-4'
        const image = document.createElement('img');
        image.src = 'image.URL';
        image.className = 'w-100 object-fit-cover';
        image.height = '300';
        image.alt = 'Foto do produto';
        imageCol.appendChild(image);
        imageList.appendChild(imageCol);
    });
}




