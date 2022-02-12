const catalogId = document.querySelector('#catalog-id').value;
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
const productForm = document.querySelector('#product-form');
const productsContainer = document.querySelector('#products-container');

let allProducts = "";
const addProductButton = "<button onclick='addProduct()' class='btn btn-outline-secondary add-btn'><i class='far fa-plus-square'></i></button>";
const loadingIcon = `<i class="fas fa-spinner fa-spin" id="loading-icon"></i>`;

const modalConfig = {
    customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
    },
    buttonsStyling: false
}

const updateProductsContainer = () => {
    productsContainer.innerHTML = "";
    productsContainer.innerHTML += allProducts + addProductButton;
}

async function getProducts(){
    productsContainer.innerHTML = loadingIcon
    const response = await fetch(`/manage-catalogs/products/${catalogId}?get-products=true`);
    const jsonResponse = await response.json();
    
    allProducts = "";
    for(let product of jsonResponse) allProducts += ProductCard(catalogId, product)
    updateProductsContainer();
}

async function addProduct(){
    const form = document.querySelector('#form-template').innerHTML;
    
    await Swal.mixin(modalConfig).fire({
        title: 'Add product',
        html: form,
        showCloseButton: true,
        confirmButtonText: 'ADD',
        preConfirm: () => {
            const productForm = Swal.getPopup().querySelector('#product-form');
            const formData = new FormData(productForm);
            fetch(`/manage-catalogs/products/${catalogId}`, {
                method: "POST",
                body: formData,
                headers: {
                    'X-CSRFToken': csrftoken
                }
            })
            .then((res) => res.json())
            .then((product) => {
                if(product.message ===  'failed') return Swal.fire('Alert','Something went wrong','warning')
                allProducts += ProductCard(catalogId, product)     
                updateProductsContainer();      
            })
            .catch(() => Swal.fire('Failed', 'Try again','warning'))
        }
    })
}

async function deleteProduct(id){
    const deletedElement = document.getElementById(''+id);
    deletedElement.children[0].innerHTML = loadingIcon;
    const response = await fetch(`/manage-catalogs/products/${catalogId}?product-id=${id}`, {
        headers: {
            'X-CSRFToken': csrftoken
        },
        method: 'DELETE'
    })
    deletedElement.remove();
}

async function updateProduct(id, name, price, description, image){
    const updatedProductElement = document.getElementById(''+id)
    const htmlForm = `
        <form class="form container" id="update-product-form">
            <input name="product-id" value="${id}" type="hidden" id="product-id">
            <input name="product-name" value="${name}" class="form-control" type="text" id="new-name" placeholder="Product name">
            <input name="product-price" value="${price}" class="form-control" type="number" min="0" step="any" id="new-price" placeholder="Product price">
            <textarea name="product-description" class="form-control" id="new-description" cols="20" rows="5" placeholder="Product description" style="resize: none;">${description}</textarea>
            <div class="custom-file">
                <input type="file" value="${image}" name="product-image"class="custom-file-input form-control" id="new-image">
                <label class="custom-file-label" for="image-input">Product image</label>
            </div>
        </form>
        `
    Swal.mixin(modalConfig)
    .fire({
        title: 'Update product',
        html: htmlForm,
        confirmButtonText: 'UPDATE',
        showCloseButton: true,
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
            .then(res => {
                updatedProductElement.innerHTML = loadingIcon;
                return res.json()
            })
            .then(product => {
                if(product.message === 'failed') throw 'Nothing'
                updatedProductElement.innerHTML = ProductCardInner(catalogId, product);
            })
            .catch(error => {
                Swal.fire('Request failed')
                getProducts()
            });
        }
    })
}


document.addEventListener('DOMContentLoaded', () => {
    const sessionUser = sessionStorage.getItem('username');
    if(!sessionUser) return window.location.href = '/login' 
    getProducts();
})



