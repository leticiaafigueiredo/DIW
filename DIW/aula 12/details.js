async function fetchProductDetails(){
    try{
        const response = await fetch ('data.json');
        const product = data.find( (item) => item.id === productId);
        return product;
    } catch(error) {
        console.error('Erro ao buscar os dados: ', error);
    }
}

//FUNCAO PARA ATUALIZAR O CONETUDO HTMLCPM OS DETALHES DO PRODUTO

function updateProductDetails(product){
    if (product) {
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productImage').src = product.mainImageUrl;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productCategory').textContent = product.category;
        document.getElementById('productPrice').textContent =  `R$ ${product.price}`;

        updateAdditionalImages(product.images);
    } else{
        alert('Produto nao encontrado');
    }
}

//FUNCAO PARA ATUALIZAR AS LISTAS DE IMAGENS
function updateAdditionalImages(images){
    const imageList = document.getElementById ('imageList');
    imageList.innerHTML = '';

    images.forEach((imageURL) => {
        const imageCol = document.createElement('div');
        imageCol.className = 'col-md-4'
        const iamge = document.createElement('img');
        image.src = 'image.URL';
        image.className = 'w-100 object-fit-cover';
        image.height = '300';
        image.alt = 'Foto do produto';
        imageCol.appendChild(image);
        imageList.appendChild(imageCol);
    } );
}





async function renderDetails(){
    const urlParams = new URLSearchParams (window.location.search);
    const productId = urlParams.get('id');

    const product = await fetchProductDetails(productId);
}