console.log("js file loaded successfully")

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getFirestore, doc, setDoc, getDocs, query, where, collection } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiPVKgtKlt6k3aMT0TE46CM0_phpBuyR8",
    authDomain: "faclutch-mldg.firebaseapp.com",
    projectId: "faclutch-mldg",
    storageBucket: "faclutch-mldg.appspot.com",
    messagingSenderId: "98836527429",
    appId: "1:98836527429:web:bf4fa088568bb2d76de62c",
    measurementId: "G-E5MSM5ZMJB"
};

const app = initializeApp(firebaseConfig)
//-------------- Manage Data --------
const db = getFirestore()
const produtos = await getDocs(collection(db, "produtos"));

const saveBtn = document.getElementById('save-btn')

/* Set Data */
function setData() {
    const product = document.getElementById('product');
    const ref = document.getElementById('ref');
    const date = new Date(document.getElementById('date-set').value);
    date.setDate(date.getDate() + 1);
    //const format = Date.UTC(setDay)

    console.log(product.value)
    console.log(ref.value)
    console.log(date)

    const item = setDoc(doc(db, "produtos", ref.value), {
        product: product.value,
        ref: ref.value,
        date: date
    })
}
//saveBtn.addEventListener('click', setData)

/* Populate Table */
const table = document.getElementById('test-table');
function populateTable(doc) {

    table.innerHTML += `
    <tr>
        <td>${doc.product}</td>
        <td>${doc.ref}</td>
        <td>${doc.date.toDate()}</td>
    </tr>
    `
}
/* Get Data */
function getData() {

    produtos.forEach(doc => populateTable(doc.data()))
    //produtos.forEach(doc => console.log(doc.data()))
}
//getData()


function myQuery() {

    const di = new Date(document.getElementById('date-initial').value);
    di.setDate(di.getDate() + 1)
    console.log(di)
    
    const de = new Date(document.getElementById('date-end').value)
    de.setDate(de.getDate() + 1)
    console.log(de)
    


    const p = (collection(db, "produtos"))
    
    const q = query(p, where("date", ">=", di), where('date', '<=', de))
    
     let content =  getDocs(q).then( (doc)=> {
    
        doc.forEach(doc =>populateTable(doc.data()))
    })
}





const srch = document.getElementById('btn-search')
//srch.addEventListener('click', myQuery)


// -------- CODE STARTS HERE ------------------

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})