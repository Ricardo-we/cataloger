const catalogId = document.querySelector('#catalog-id').value;
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
const productForm = document.querySelector('#product-form');
const productsContainer = document.querySelector('#products-container');

async function getProducts(){
    const response = await fetch(`/manage-catalogs/products/${catalogId}?get-products=true`);
    productsContainer.innerHTML = `<i class="fas fa-spinner fa-spin" id="loading-icon" style="font-size: 50px; align-self: center;"></i>`
    const jsonResponse = await response.json();

    productsContainer.innerHTML = ""
    for(let product of jsonResponse){
        productsContainer.innerHTML += ProductCard(product.name, product.price, product.id, product.image, product.description)
    }
}

async function postProduct(){
    const formData = new FormData(productForm);
    const formElements = document.getElementsByClassName('form-control')
    for(let element of formElements) element.value = ""
    
    const response = await fetch(`/manage-catalogs/products/${catalogId}`, {
        method: "POST",
        body: formData,
        headers: {
            'X-CSRFToken': csrftoken
        }
    })
    const jsonResponse = await response.json();
    if(jsonResponse.message != 'success' ){
        Swal.fire(
            'Alert',
            'Something went wrong',
            'warning'
        )
    }
}

function productDetails(name, description, image=''){
    const imageHtml = `
        <img src="${image}" style="width: 400px; height: 200px; object-fit: cover;" alt="${name}">
        <p>${description}</p>
    `;
    Swal.fire({
        title: name,
        html: imageHtml,
    })
}

async function deleteProduct(id){
    const response = await fetch(`/manage-catalogs/products/${catalogId}?product-id=${id}`, {
        headers: {
            'X-CSRFToken': csrftoken
        },
        method: 'DELETE'
    })
    getProducts();
}

async function updateProduct(id, name, price, description, image){
    const htmlForm = `
        <form class="form container" id="update-product-form">
            <input name="product-id" value="${id}" type="hidden" id="product-id">
            <input name="product-name" value="${name}" class="form-control" type="text" id="new-name" placeholder="Product name">
            <input name="product-price" value="${price}" class="form-control" type="number"step="0.1" id="new-price" placeholder="Product price">
            <textarea name="product-description" class="form-control" id="new-description" cols="20" rows="5" placeholder="Product description" style="resize: none;">${description}</textarea>
            <div class="custom-file">
                <input type="file" value="${image}" name="product-image"class="custom-file-input form-control" id="new-image">
                <label class="custom-file-label" for="image-input">Product image</label>
            </div>
        </form>
        `
    Swal.fire({
        title: 'Update product',
        html: htmlForm,
        confirmButtonText: 'UPDATE',
        focusConfirm: false,
        preConfirm: () => {
            const updateForm = Swal.getPopup().querySelector('#update-product-form');
            const formData = new FormData(updateForm);

            updateForm.addEventListener('submit', (e) => e.preventDefault())
            fetch(`/manage-catalogs/products/${catalogId}?method=PUT`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                }, 
                body: formData
            })
            .catch(error => Swal.fire('Request failed'))
            .then(res => getProducts());
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    getProducts();
    productForm.addEventListener('submit', e => {
        e.preventDefault()
        postProduct()
        .then(response => getProducts())
    })  
})