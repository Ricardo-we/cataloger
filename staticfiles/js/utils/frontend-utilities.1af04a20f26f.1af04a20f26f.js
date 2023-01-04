function CatalogCard(catalogName, cardLink, id, catalogLink){
    return `
    <div class="card mx-1 my-1" style="width: 16rem; height: 11rem; over-flow:hidden;" id="id">
        <div class="card-body">
            <h5 class="card-title mt-3">${catalogName}</h5>
            <div class="mt-3 d-flex flex-row align-items-center justify-content-center">
                <a href="${cardLink}" class="btn btn-outline-secondary mx-2" style="border: 1px solid rgb(21,189,159); color: rgb(21,189,159);">
                    <i class="fas fa-shopping-bag"></i>
                </a>
                <button class="btn btn-outline-success mx-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="updateCatalog(${id},'${catalogName}')">
                    <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-outline-danger mx-2" onClick="deleteCatalog(${id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="mt-3 d-flex flex-row align-items-center justify-content-center">
                <a href="/view-catalog/${id}" class="btn btn-link" style="text-align: center;">
                    <i class="fas fa-eye"></i>
                </a>
                <button class="btn ml-1" id="clipboard-copy-${id}" value="${catalogLink}" onClick="copyLinkToClipboard('clipboard-copy-${id}')" alt="copy link">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    </div>
    `
}   

function ProductCard(catalogId, product){
    return `
        <div class="card mt-4 mx-3 text-dark catalog-product" style="width: 18rem; cursor: pointer;"  id="${product.id}">
            <img class="card-img-top" style=" height: 200px; object-fit: cover;" src="${product.image}" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">${product.name}</p>
                <strong>${product.currency}${product.price}</strong>
            </div>
            <div class="mt-3 d-flex flex-row align-items-center justify-content-center hidden-buttons">
                <a class="btn btn-outline-primary mx-2" href="/${catalogId}/product-view-management/${product.id}">
                    <i class="fas fa-eye"></i>
                </a>
                <button class="btn btn-outline-success mx-2" onclick="updateProduct(${product.id}, '${product.name}',${product.price}, '${product.description}', '${product.image}')">
                    <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-outline-danger mx-2" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `
}

function ProductCardInner(catalogId, product){
    return `
        <img class="card-img-top" style=" height: 200px; object-fit: cover;" src="${product.image}" alt="Card image cap">
        <div class="card-body">
            <p class="card-text">${product.name}</p>
            <strong>${product.currency}${product.price}</strong>
        </div>
        <div class="mt-3 d-flex flex-row align-items-center justify-content-center hidden-buttons">
            <a class="btn btn-outline-primary mx-2" href="/${catalogId}/product-view-management/${product.id}">
                <i class="fas fa-eye"></i>
            </a>
            <button class="btn btn-outline-success mx-2" onclick="updateProduct(${product.id}, '${product.name}',${product.price}, '${product.description}', '${product.image}')">
                <i class="far fa-edit"></i>
            </button>
            <button class="btn btn-outline-danger mx-2" onclick="deleteProduct(${product.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `
}