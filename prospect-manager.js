// INITIAL SETUP

let prospects = []

if (localStorage.prospects){
    prospects = JSON.parse(localStorage.prospects)
}

// CLASSES

class Prospect {
    constructor(prospectInfo){
        this._name = prospectInfo.name
        this._licensing = prospectInfo.licensing
        this._contactPerson = prospectInfo.contactPerson
        this._phone = prospectInfo.phone
        this._email = prospectInfo.email
        this._jobsite = prospectInfo.jobsite
        this._city = prospectInfo.city
        this._state = prospectInfo.state
        this._bids = []
    }
    get name() {
        return this._name
    }

    set name(name){
        this._name = name
    }

    get licensing() {
        return this._licensing
    }

    set licensing(licensing){
        this._licensing = licensing
    }

    get contactPerson() {
        return this._contactPerson
    }

    set contactPerson(contactPerson){
        this._contactPerson = contactPerson
    }

    get phone() {
        return this._phone
    }

    set phone(phone){
        this._phone = phone
    }

    get email() {
        return this._email
    }

    set email(email){
        this._email = email
    }

    get address() {
        return this._address
    }

    set address(address){
        this._address = address
    }

    get city() {
        return this._city
    }

    set city(city){
        this._city = city
    }

    get state() {
        return this._state
    }

    set state(state){
        this._state = state
    }

    get bids() {
        return this._bids
    }

    set bids(bids){
        this._bids = bids
    }

}

// EVENT LISTENERS

document.querySelector('#submit').addEventListener("click", makeProspect)

// FUNCTIONS

function makeProspect(event){
    event.preventDefault()
    let prospectForm = document.forms[0]
    let data = new FormData(prospectForm)

    let prospectInfo = {
        name: data.get('name'),
        licensing: data.get('licensing'),
        contactPerson: data.get('contact-person'),
        phone: data.get('phone'),
        email: data.get('email'),
        address: data.get('address'),
        city: data.get('city'),
        state: data.get('state')
    }

    let newProspect = new Prospect(prospectInfo)

    prospects.push(newProspect)
    localStorage.setItem('prospects', JSON.stringify(prospects))

    document.querySelector('#name').value = ''
    document.querySelector('#licensing').value = ''
    document.querySelector('#contact-person').value = ''
    document.querySelector('#phone').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#jobsite-address').value = ''
    document.querySelector('#city').value = ''
    document.querySelector('#state').value = ''
}

// VERIFICATION
console.log(prospects)