function LinkCard(cardTitle, cardLink, id, catalogLink){
    return `
    <div class="card mx-1 my-1" style="width: 16rem; height: 11rem; over-flow:hidden;">
        <div class="card-body">
            <h5 class="card-title mt-3">${cardTitle}</h5>
            <div class="mt-3 d-flex flex-row align-items-center justify-content-center">
                <a href="${cardLink}" class="btn btn-outline-info mx-2">
                    <i class="fas fa-shopping-bag"></i>
                </a>
                <button class="btn btn-outline-success mx-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="updateCatalog(${id})">
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

function ProductCard(productName, productPrice, productId, productImage, productDescription){
    return `
    <div class="card mx-1 my-1" style="width: 16rem; height: 12rem; overflow:hidden;">
            <div class="card-body">
                <h5 class="card-title mt-3">${productName}</h5>
                <h3>Price: ${productPrice}</h3>
                <div class="mt-3 d-flex flex-row align-items-center justify-content-center">
                <button class="btn btn-outline-primary mx-2" onclick="productDetails('${productName}', '${productDescription}', '${productImage}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-outline-success mx-2" onclick="updateProduct(${productId}, '${productName}',${productPrice}, '${productDescription}', '${productImage}')">
                    <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-outline-danger mx-2" onclick="deleteProduct(${productId})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    </div>
    `
}