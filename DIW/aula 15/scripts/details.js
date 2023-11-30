async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://aula-15.leticiafigueir5.repl.co/products/${productId}`);
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
    const productId = urlParams.get('id');
    console.log(productId);

    const product = await fetchProductDetails(productId);
    updateProductDetails(product);
}

renderDetails();






