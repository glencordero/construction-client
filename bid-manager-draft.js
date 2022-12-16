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
        this._id = lineItemInfo.id
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
    get id() {
        return this._id
    }

    set id(id){
        this._id = id
    }
}

function displayLineItem(){
    document.querySelector('#line-item-display').innerHTML=''
    lineItems.forEach(lineItem=>{
        let containerDiv = document.createElement('div')
        let lineItemText = document.createElement('span')
        lineItemText.innerHTML = `${lineItem._details} at quantity ${lineItem._quantity} with a unit price of $${lineItem._price} for a total of $${lineItem._total}`
        containerDiv.appendChild(removeButton)
        containerDiv.appendChild(lineItemText)
        
        document.querySelector('#line-item-display').appendChild(containerDiv)
    })
}

function createLineItem(event){
    event.preventDefault()
    let lineItemForm = document.forms[0]
    let data = new FormData(lineItemForm)

    let lineItemInfo = {
        quantity: parseInt(data.get('quantity')),
        details: data.get('details'),
        price: parseInt(data.get('price')),
        total: parseInt(data.get('quantity')*data.get('price')),
        id: Math.floor(1000 + Math.random() * 9000)
    }

    let newLineItem = new LineItem(lineItemInfo)

    lineItems.push(newLineItem)

    lineItems.forEach(lineItem=>{
        let lineItemsP = document.createElement('p')
        let removeButton = document.createElement('button')
        removeButton.innerHTML = "Remove"
        removeButton.id = lineItem._id
        removeButton.onclick = function(event){
            event.preventDefault()
            let indexOfObject = lineItems.findIndex(object => {
                return object._id == removeButton.id
            })
            lineItems.splice(indexOfObject, 1)
            console.log(lineItems)
        }
    })


    console.log(lineItems)
    document.querySelector('#quantity').value=''
    document.querySelector('#details').value=''
    document.querySelector('#price').value=''

    let sumOfLineItems = lineItems.reduce((acc, lineItem) => {
    return acc + lineItem._total}, 0)

    document.querySelector('#bid-total-display').innerHTML = `Current Bid Total: $${sumOfLineItems}`

}



document.querySelector('#add').addEventListener("click", createLineItem)




