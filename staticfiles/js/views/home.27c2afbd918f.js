
const reqUsername = document.querySelector('#username'); 
manageSession(reqUsername.value);

const cardsContainer = document.querySelector('#cards-container');
const form = document.getElementById('catalogs-form');
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
const catalogNameInput = document.querySelector('#catalog-name');
const username = getSession()
const loadingIcon = `<i class="fas fa-spinner fa-spin" id="loading-icon" style="font-size: 50px; align-self: center;"></i>`;

async function getCatalogs(){
    const response = await fetch(`/manage-catalogs/0?username=${username}`)
    cardsContainer.innerHTML = loadingIcon;
    const finalResponse = await response.json();

    cardsContainer.innerHTML = "";
    for(let catalog of finalResponse){        
        let catalogLink = `/manage-products/${catalog.id}?username=${username}`
        cardsContainer.innerHTML += CatalogCard(catalog.catalog_name, catalogLink, catalog.id, `https://cataloger-app.herokuapp.com/view-catalog/${catalog.id}`)
    }
}

async function postCatalog(){
    const formData = new FormData(form);
    formData.append('username', username)
    catalogNameInput.value = "";
    
    const response = await fetch('/manage-catalogs/0',{
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrftoken,
        }
    })
    const jsonResponse = await response.json();
    console.log(jsonResponse)
}

async function deleteCatalog(id){
    const response = await fetch(`/manage-catalogs/${id}`,{
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken
        }
    })

    getCatalogs();
}

function updateCatalog(id, catalogName){
    const htmlForm = `
            <label>New catalog name</label>
            <input value="${catalogName}" type="text" name="catalog-name" class="form-control" placeholder="catalog name" id="new-catalog-name">
            <select class="form-select form-control" name="currency" id="new-currency">
                <option value="Q">Q</option>
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="¥">¥</option>
                <option value="£">£</option>
            </select>
        `
    Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-outline-primary',
          cancelButton: 'btn btn-outline-danger'
        },
        buttonsStyling: false
      }).fire({
        title: 'Update catalog',
        html: htmlForm,
        confirmButtonText: 'UPDATE',
        focusConfirm: false,
        preConfirm: () => {
            const catalogNameInput = Swal.getPopup().querySelector('#new-catalog-name');
            const currencyInput = Swal.getPopup().querySelector('#new-currency');
            catalogNameInput.addEventListener('submit', (e) => e.preventDefault())
            const username = document.querySelector('#username').value;
            fetch(`/manage-catalogs/${id}?catalog-name=${catalogNameInput.value}&currency=${currencyInput.value}`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': csrftoken
                }, 
            })
            .catch(error => Swal.fire('Request failed'))
            .then(res => getCatalogs());

            if (!catalogNameInput.value || !username) {
                Swal.showValidationMessage(`Not valid`)
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    try{
        const guideViewed = localStorage.getItem('guide-checked');

        if(document.querySelector('#first-time').value === 'true' && !guideViewed) {
            runFullGuide()
            localStorage.setItem('guide-checked', 'true');
        }
    }
    catch{}
    form.addEventListener('submit', e => {
        e.preventDefault();
        postCatalog()
        .then(() => getCatalogs());
        catalogNameInput.value = ''
    });

    getCatalogs();
})