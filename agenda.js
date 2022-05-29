'use strict'
//implement contact menu with edit contact and delete contact
// build edit contact page
// are you sure you want to delete contact confirmation
// add confirmation boxes after edited and saved buttons clicked
//make span reads if celular or home for exemple
//format phone numbers to a standard display type
//retur to proper page after creating contact

//create class opacity 0 on all except page 1
// create class fade-in max opacity, transition 0.3s, max z-index 
//each target page function setAtrr class fade in
//set timeout to return all other pages to standart fade-out class

const nameInput = document.querySelector('.name-input');
const lastName = document.querySelector('.last-name');
const phoneNumber = document.querySelector('.phone-number');
const contactName = document.getElementById('contact-name');
const contactNumber = document.getElementById('contact-number');
const saveBtn = document.querySelector('.save-btn');
const ul = document.getElementById('list');
const deleteBtn = document.querySelector('.delete-btn');
const contactId = document.querySelector('.contact-id');
const searchBox = document.getElementById('search');
const clearBtn = document.getElementById('clear-text');
const screenOne = document.querySelector('.screen-inner-one');
const screenTwo = document.querySelector('.screen-inner-two');
const screenThree = document.querySelector('.screen-inner-three');
const screenFour = document.querySelector('.screen-inner-four');
const newContact = document.querySelector('.new-contact');
const backBtnTwo = document.getElementById('back-btn-two');
const backBtnThree = document.getElementById('back-btn-three');
const backBtnFour = document.getElementById('back-btn-four');
const editBtn = document.querySelector('.edit-btn');
const saveBtnFour = document.getElementById('save-btn-four');
const fnameEdit = document.getElementById('fname-input-four');
const lnameEdit = document.getElementById('lname-input-four');
const phoneEdit = document.getElementById('phone-number-four');
const savedPopUp = document.getElementById('saved-contact');
const magnifyIcon = document.querySelector('.fa-magnifying-glass');

/* NAVIGATE */ const Navigate = {

    showPageOne() {
        /* transition */
        screenOne.classList.add("fade-in")//target
        screenTwo.classList.remove("fade-in")
        screenThree.classList.remove("fade-in")
        screenFour.classList.remove("fade-in")
    },

    showPageTwo() {
        /* transition */
        screenTwo.classList.add("fade-in")//target
        screenOne.classList.add("opacity-none")
        screenOne.classList.remove("fade-in")
        screenThree.classList.remove("fade-in")
        screenFour.classList.remove("fade-in")
    },

    showPageThree() { //from screen-two
        screenThree.classList.add("fade-in")//target
        screenOne.classList.remove("fade-in")
        screenTwo.classList.remove("fade-in")
        screenFour.classList.remove("fade-in")
    },

    showPageFour() {
        screenFour.classList.add("fade-in")
        screenOne.classList.remove("fade-in")
        screenTwo.classList.remove("fade-in")
        screenThree.classList.remove("fade-in")
    },

    backBtn() {
        Navigate.showPageOne()
    },

    backBtnFour() {
        Navigate.showPageThree()
    }
};
newContact.addEventListener('click', Navigate.showPageTwo);
backBtnTwo.addEventListener('click', Navigate.backBtn)
backBtnThree.addEventListener('click', Navigate.backBtn)
backBtnFour.addEventListener('click', Navigate.backBtnFour)

/* POP-UPS */ const PopUps = {

    saved() {
        savedPopUp.style.display = "block";
        setTimeout(() => savedPopUp.style.display = "none", 2000)
    }
}

/* STORAGE */ const Storage = {

    getDataBase() {
        return JSON.parse(localStorage.getItem('dataBase')) ?? []; ///no exemplo do fernando leonid (task list) não precisou usar 'return' function
    }
}
const dataBase = Storage.getDataBase();
console.log(dataBase);

/* SAVING */ const Saving = {

    setDataBase(dataBase) {

        localStorage.setItem('dataBase', JSON.stringify(dataBase));
    },

    submit() {
        const contactData = { "fname": nameInput.value, "lname": lastName.value, "phoneNumber": phoneNumber.value };

        dataBase.push(contactData);
        Saving.setDataBase(dataBase);
        console.log(dataBase)

        Display.contactList();
        ContactPage.pageContent();
        Navigate.showPageThree();
        PopUps.saved();
        nameInput.value = '';
        lastName.value = '';
        phoneNumber.value = '';
    },

}
saveBtn.addEventListener('click', Saving.submit)

/* DISPLAY */ const Display = {

    contactList() {

        ul.innerHTML = "";

        dataBase.forEach((data, index) => {

            let contact = document.createElement('li');
            contact.setAttribute('data-index', index)
            contact.textContent = `${data.fname} ${data.lname}`
            ul.appendChild(contact);
            console.log(contact)

        })
    },

    searchContact() {

        const searchTerm = searchBox.value.toLowerCase();
        console.log(searchTerm)
        ul.innerHTML = "";

        for (let i = 0; i < dataBase.length; i++) { //get the index of info?

            if (dataBase[i].fname.toLowerCase().startsWith(searchTerm)) {

                console.log(dataBase[i].fname)
                let contact = document.createElement('li');
                contact.setAttribute('data-index', i)
                contact.textContent = `${dataBase[i].fname} ${dataBase[i].lname}`
                ul.appendChild(contact);
                console.log(contact);
            }
        }

    },

    clearSearch() {
        searchBox.value = '';
        Display.contactList();
    },

    hideIcon() {
        magnifyIcon.style.display = "none";
    },

    showIcon() {
        magnifyIcon.style.display = "block";
    }
}
Display.contactList();
searchBox.addEventListener('keyup', Display.searchContact);
searchBox.addEventListener('click', Display.hideIcon);
searchBox.addEventListener('focusout', Display.showIcon);
clearBtn.addEventListener('click', Display.clearSearch);

/* CONTACT PAGE - 3 */ const ContactPage = {

    deleteContact() {
        let index = contactId.dataset.index;
        console.log(index)
        dataBase.splice(index, 1);
        Saving.setDataBase(dataBase); //if you dont pass database argument, localStorage value will become undentified
        Display.contactList();
        Navigate.showPageOne();
        console.log(dataBase);
    },

    pageContent(e) {

        if (e) {
            Navigate.showPageThree();
            let index = e.target.dataset.index;
            contactId.setAttribute('data-index', index); //CONTACTID IS A DIV CREATED JUST TO STORE CONTACT INDEX IN ARRAY TO BE MANIPULATED LATER ON IF NEEDED -->
            contactName.textContent = `${dataBase[index].fname} ${dataBase[index].lname}`;
            contactNumber.textContent = `${dataBase[index].phoneNumber}`;
        } else {
            const editedContactIndex = dataBase.length - 1;
            console.log(editedContactIndex);
            contactId.setAttribute('data-index', editedContactIndex);
            contactName.textContent = `${dataBase[editedContactIndex].fname} ${dataBase[editedContactIndex].lname}`;
            contactNumber.textContent = `${dataBase[editedContactIndex].phoneNumber}`;
        }
    },
};
ul.addEventListener('click', ContactPage.pageContent);
deleteBtn.addEventListener('click', ContactPage.deleteContact);

/* EDIT PAGE */ const EditPage = {

    contactIndex() {
        const contactIndex = contactId.dataset.index;
        return contactIndex;
    },

    editPageContent() {
        Navigate.showPageFour();
        fnameEdit.value = dataBase[EditPage.contactIndex()].fname
        lnameEdit.value = dataBase[EditPage.contactIndex()].lname
        phoneEdit.value = dataBase[EditPage.contactIndex()].phoneNumber
    },

    saveEditedContact() {

        const contactData = { "fname": fnameEdit.value, "lname": lnameEdit.value, "phoneNumber": phoneEdit.value };

        dataBase.push(contactData);
        dataBase.splice(EditPage.contactIndex(), 1);
        Saving.setDataBase(dataBase);
        Display.contactList();
        ContactPage.pageContent();
        PopUps.saved();
        Navigate.showPageThree();
        console.log(dataBase)
    }
}
saveBtnFour.addEventListener('click', EditPage.saveEditedContact);
editBtn.addEventListener('click', EditPage.editPageContent)

// throw value to data base when empty

/* 
    [{"fname":"Diogo","lname":"Gaio","phoneNumber":"31996869192"},{"fname":"Marla","lname":"Lamounier","phoneNumber":"11985566332"},{"fname":"Leo","lname":"Irmao","phoneNumber":"11966533225"}]
} */



