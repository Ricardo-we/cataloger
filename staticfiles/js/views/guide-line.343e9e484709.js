const buttonTemplate = (iconClass, type) => `
    <button class="btn btn-outline-${type} mx-2 disabled">
        <i class="${iconClass}"></i>
    </button>
`
    
const guideStepsConfig = (title, step, html, text) => {
    return {
        title: title,
        html:html + '<br>' + text,
        currentProgressStep: step,
        showClass: { backdrop: 'swal2-noanimation' },
    }
}

const GuideStep = (steps) => Swal.mixin({
    confirmButtonText: 'Next',
    customClass: {
        popup: 'animated flash',
        confirmButton: 'btn btn-primary',
    },
    progressSteps: steps,
    buttonsStyling: false
})

function runCatalogsGuide(){
    const steps = ['1', '2', '3', '4', '5']

    const guideStep = GuideStep(steps)
    
    return guideStep.fire(
        guideStepsConfig(
            'Manage products', 
            0,
            buttonTemplate('fas fa-shopping-bag', 'info'), 
            'With this button you can access to your product management'
        )
    )
    .then(() => guideStep.fire(
            guideStepsConfig(
                'Update catalog', 
                1, 
                buttonTemplate('far fa-edit', 'success'), 
                'Will open a modal in where you can update your catalog name and currency'
            )
        )
    )
    .then(() => guideStep.fire(
            guideStepsConfig(
                'Delete catalog', 
                2, 
                buttonTemplate('fas fa-trash-alt', 'danger'), 
                'With this button you can delete a catalog including all its products'
            )
        )
    )
    .then(() => guideStep.fire(
            guideStepsConfig(
                'Check your catalog', 
                3, 
                buttonTemplate('fas fa-eye', 'link'),
                'You can view the final catalog result'
            )
        )
    )
    .then(() => guideStep.fire(
            guideStepsConfig(
                'Copy link', 
                4, 
                buttonTemplate('fas fa-copy', ''), 
                'It let you copy your catalog link'
            )
        )
    )
}

function runProductsGuide(){
    const steps = ['1', '2', '3', '4']

    const guideStep = GuideStep(steps)
    
    return guideStep.fire(
        guideStepsConfig(
            'View product', 
            0,
            buttonTemplate('fas fa-eye', 'primary'), 
            'It opens a modal which shows the image and description of your product'
        )
    )
    .then(() => guideStep.fire(
            guideStepsConfig(
                'Update product', 
                1, 
                buttonTemplate('far fa-edit', 'success'), 
                'Will open a modal in where you can update a product of your catalog, name, price, description, image'
            )
            // 'far fa-plus-square'
        )
    )
    .then(() => guideStep.fire(
            guideStepsConfig(
                'Add products', 
                1, 
                buttonTemplate('far fa-plus-square', 'link'), 
                'You will see a card with this icon it will open a modal in where you can add a product'
            )
        )
    )
    .then(() => guideStep.fire(
            guideStepsConfig(
                'Delete product', 
                2, 
                buttonTemplate('fas fa-trash-alt', 'danger'), 
                'With this button you can delete a single product'
            )
        )
    )
}


function runFullGuide(){
    const specificSwal = Swal.mixin({
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated flash',
            confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false
    })
    specificSwal.fire({
        title: 'Welcome!',
        text: 'This is a small guide of the page'
    })
    .then(() => specificSwal.fire({
            title:'Creating catalogs and products',
            text: 'To create a catalog or product you need to fill all the fields, then press add and voila you add the product/catalog '
        })
    )
    .then(runCatalogsGuide)
    .then(runProductsGuide)
    .finally(() => specificSwal.fire('You are ready to create your catalogs'))
}


