let storedProspects = JSON.parse(localStorage.prospects)


let nameSelect = document.querySelector('#name')

storedProspects.forEach(prospect => {
    let option = document.createElement('option')
    option.value = prospect._name
    option.innerHTML = prospect._name
    nameSelect.appendChild(option)
})

let lineItems = []
let lineItemTotalPrices = []


let totalPriceP = document.createElement('p')
document.querySelector('#bid-total-display').appendChild(totalPriceP)

class LineItem {
    constructor(lineItemInfo){
        this._quantity = lineItemInfo.quantity
        this._details = lineItemInfo.details
        this._price = lineItemInfo.price
        this._total = lineItemInfo.total
    }
    get quantity() {
        return this._quantity
    }

    set quantity(quantity){
        this._quantity = quantity
    }

    get details() {
        return this._details
    }

    set details(details){
        this._details = details
    }

    get price() {
        return this._price
    }

    set price(price){
        this._price = price
    }

    get total() {
        return this._total
    }

    set total(total){
        this._total = total
    }
}

function createLineItem(event){
    event.preventDefault()
    let lineItemForm = document.forms[0]
    let data = new FormData(lineItemForm)

    let lineItemInfo = {
        quantity: parseInt(data.get('quantity')),
        details: data.get('details'),
        price: parseInt(data.get('price')),
        total: parseInt(data.get('quantity')*data.get('price'))
    }

    let newLineItem = new LineItem(lineItemInfo)

    lineItems.push(newLineItem)
    
    document.querySelector('#line-item-display').innerHTML=''

    lineItems.forEach(lineItem=>{
        let lineItemsP = document.createElement('p')
        lineItemsP.innerHTML = `${lineItem._details} at quantity ${lineItem._quantity} with a unit price of $${lineItem._price} for a total of $${lineItem._total}`
        document.querySelector('#line-item-display').appendChild(lineItemsP)
    })

    console.log(lineItems)
}

document.querySelector('#add').addEventListener("click", createLineItem)

