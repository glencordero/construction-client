// INITIAL SETUP

let storedProspects = JSON.parse(localStorage.prospects)

let nameSelect = document.querySelector('#name')

let lineItems = []

let bids = []

storedProspects.forEach(prospect => {
    let option = document.createElement('option')
    option.value = prospect._name
    option.innerHTML = prospect._name
    nameSelect.appendChild(option)
})

// CLASSES

class Bid {
    constructor(bidInfo){
        this._prospect = bidInfo.prospect
        this._id = bidInfo.id
        this._lineItems = bidInfo.lineItems
        this._totalPrice = bidInfo.totalPrice
        this._bidAccepted = bidInfo.bidAccepted
    }
    get prospect() {
        return this._prospect
    }

    set prospect(prospect) {
        this._prospect = prospect
    }

    get id() {
        return this._id
    }

    set id(id) {
        this._id = id
    }

    get lineItems() {
        return this._lineItems
    }

    set lineItems(lineItems) {
        this._lineItems = lineItems
    }

    get totalPrice() {
        return this._totalPrice
    }

    set totalPrice(totalPrice) {
        this._totalPrice = totalPrice
    }

    get bidAccepted() {
        return this._bidAccepted
    }

    set bidAccepted(bidAccepted) {
        this._bidAccepted = bidAccepted
    }


    
}
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

// EVENT LISTENERS

document.querySelector('#add').addEventListener("click", createLineItem)
document.querySelector('#finalize').addEventListener("click", createBid)

// FUNCTIONS

function createBid(event){
    event.preventDefault()
    let bidManagerForm = document.forms[0]
    let data = new FormData(bidManagerForm)

    let bidInfo = {
        prospect: data.get('name'),
        id: data.get('bid-id'),
        lineItems: lineItems,
        totalPrice: lineItems.reduce((acc, lineItem) => {
            return acc + lineItem._total}, 0),
        bidAccepted: false    
}

let newBid = new Bid(bidInfo)

console.log(newBid)
// this is where i will need to access the prospects from local storage, then loop through them/find matching prospect...add to their bids array.

}

function createLineItem(event){
    event.preventDefault()
    let bidManagerForm = document.forms[0]
    let data = new FormData(bidManagerForm)

    let lineItemInfo = {
        quantity: parseInt(data.get('quantity')),
        details: data.get('details'),
        price: parseInt(data.get('price')),
        total: parseInt(data.get('quantity')*data.get('price')),
        id: Math.floor(1000 + Math.random() * 9000)
    }

    let newLineItem = new LineItem(lineItemInfo)

    lineItems.push(newLineItem)
    displayLineItems()
    console.log(lineItems)

    document.querySelector('#quantity').value=''
    document.querySelector('#details').value=''
    document.querySelector('#price').value=''
    lineItemsTotalPrice()
}

function displayLineItems(){
    document.querySelector('#line-item-display').innerHTML=''
    lineItems.forEach(lineItem=>{
        let containerDiv = document.createElement('div')
        let lineItemText = document.createElement('span')
        lineItemText.className = "line-item-text"
        lineItemText.innerHTML = `${lineItem._details} at quantity ${lineItem._quantity} with a unit price of $${lineItem._price} for a total of $${lineItem._total}`
        
        document.querySelector('#line-item-display').appendChild(containerDiv)
        
        let lineItemsP = document.createElement('p')
        let removeButton = document.createElement('button')
        removeButton.innerHTML = "Remove"
        removeButton.id = lineItem._id
        removeButton.className = "remove-button"
        removeButton.onclick = removeLineItem
        containerDiv.appendChild(removeButton)
        containerDiv.appendChild(lineItemText)
    })
}

function lineItemsTotalPrice(){
    document.querySelector('#bid-total-display').innerHTML=''
    lineItems.forEach(lineItem=>{
        let sumOfLineItemsPrices = lineItems.reduce((acc, lineItem) => {
        return acc + lineItem._total}, 0)
        document.querySelector('#bid-total-display').innerHTML = `Current Bid Total: $${sumOfLineItemsPrices}`
    })
}

function removeLineItem(event){
    event.preventDefault()
    let indexOfObject = lineItems.findIndex(object => {
        return object._id == event.target.id
    })
    lineItems.splice(indexOfObject, 1)
    displayLineItems()
    lineItemsTotalPrice()
    console.log(lineItems)
}


