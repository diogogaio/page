'use strict'

// are you sure you want to delete contact confirmation
// add confirmation boxes after edited and saved buttons clicked
//make span reads if celular or home for exemple
//format phone numbers to a standard display type

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
const deletedPopUp = document.getElementById('deleted-contact');
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
    },

    deleted() {
        deletedPopUp.style.display = "block";
        setTimeout(() => deletedPopUp.style.display = "none", 2000)
    }
}

/* STORAGE */ const Storage = {

    getDataBase() {
        return JSON.parse(localStorage.getItem('contactsDb')) ?? []; ///no exemplo do fernando leonid (task list) não precisou usar 'return' function
    }
}
const contactsDb = Storage.getDataBase();
console.log(contactsDb);

/* SAVING */ const Saving = {

    setContactDataB(contactsDb) {

        localStorage.setItem('contactsDb', JSON.stringify(contactsDb));
    },

    submit() {
        const contactData = { "fname": nameInput.value, "lname": lastName.value, "phoneNumber": phoneNumber.value };

        contactsDb.push(contactData);
        Saving.setContactDataB(contactsDb);
        console.log(contactsDb)

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

        contactsDb.forEach((data, index) => {

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

        for (let i = 0; i < contactsDb.length; i++) { //get the index of info?

            if (contactsDb[i].fname.toLowerCase().startsWith(searchTerm)) {

                console.log(contactsDb[i].fname)
                let contact = document.createElement('li');
                contact.setAttribute('data-index', i)
                contact.textContent = `${contactsDb[i].fname} ${contactsDb[i].lname}`
                ul.appendChild(contact);
                console.log(contact);
            }
        }

    },

    showIcon() {
        if (searchBox.value.length === 0) {
            magnifyIcon.style.display = "block";
        }
    },

    clearSearch() {
        searchBox.value = '';
        Display.contactList();
        Display.showIcon();
    },

    hideIcon() {
        magnifyIcon.style.display = "none";
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
        contactsDb.splice(index, 1);
        PopUps.deleted();
        Saving.setContactDataB(contactsDb); //if you dont pass contactsDb argument, localStorage value will become undentified
        Display.contactList();
        Navigate.showPageOne();
        console.log(contactsDb);
    },

    pageContent(e) {

        if (e) {
            Navigate.showPageThree();
            let index = e.target.dataset.index;
            contactId.setAttribute('data-index', index); //CONTACTID IS A DIV CREATED JUST TO STORE CONTACT INDEX IN ARRAY TO BE MANIPULATED LATER ON IF NEEDED -->
            contactName.textContent = `${contactsDb[index].fname} ${contactsDb[index].lname}`;
            contactNumber.textContent = `${contactsDb[index].phoneNumber}`;
        } else {
            const editedContactIndex = contactsDb.length - 1;
            console.log(editedContactIndex);
            contactId.setAttribute('data-index', editedContactIndex);
            contactName.textContent = `${contactsDb[editedContactIndex].fname} ${contactsDb[editedContactIndex].lname}`;
            contactNumber.textContent = `${contactsDb[editedContactIndex].phoneNumber}`;
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
        fnameEdit.value = contactsDb[EditPage.contactIndex()].fname
        lnameEdit.value = contactsDb[EditPage.contactIndex()].lname
        phoneEdit.value = contactsDb[EditPage.contactIndex()].phoneNumber
    },

    saveEditedContact() {

        const contactData = { "fname": fnameEdit.value, "lname": lnameEdit.value, "phoneNumber": phoneEdit.value };

        contactsDb.push(contactData);
        contactsDb.splice(EditPage.contactIndex(), 1);
        Saving.setContactDataB(contactsDb);
        Display.contactList();
        ContactPage.pageContent();
        PopUps.saved();
        Navigate.showPageThree();
        console.log(contactsDb)
    }
}
saveBtnFour.addEventListener('click', EditPage.saveEditedContact);
editBtn.addEventListener('click', EditPage.editPageContent)

// throw value to data base when empty

/* 
    [{"fname":"Diogo","lname":"Gaio","phoneNumber":"31996869192"},{"fname":"Marla","lname":"Lamounier","phoneNumber":"11985566332"},{"fname":"Leo","lname":"Irmao","phoneNumber":"11966533225"}]
} */



