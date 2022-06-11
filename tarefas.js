const list = document.getElementById('list');
const inputTask = document.getElementById('inputTask');

// array receber valores


/* let dataBase = [
    { 'task': 'Fazer compras', 'status': '' },
    { 'task': 'Limpar quarto', 'status': 'checked' }
]; */

//localStorage.setItem('dataBase', JSON.stringify(dataBase));
const getDataBase = () => JSON.parse(localStorage.getItem('dataBase'))?? []; //*********//
const dataBase = getDataBase();

const setDataBase = (dataBase) => localStorage.setItem('dataBase', JSON.stringify(dataBase));

const newTask = (e) => {

    if (e.key == 'Enter') {

        clearTasks();
        const text = inputTask.value;

        //const dataBase = getDataBase();

        const pushData = { 'task': text, 'status': '' }
        dataBase.push(pushData);
        setDataBase(dataBase);
        displayList();
        inputTask.value = '';

        //RESOLVER CHECKBOX NO DATABASE
    }

}
inputTask.addEventListener('keypress', e => newTask(e));

// add new tasks

const addTask = (data, index) => {

    let listModel = document.createElement('label');
    listModel.classList.add('listItem');
    listModel.innerHTML = //***** data-index */
        `
        <input type="checkbox" class="form-check-input" ${data.status} data-index=${index}> 
            <div>
                ${data.task}
            </div>
        <input class="btn-close" type="button" value="" data-index=${index}>
    `;

    //console.log(listModel)
    list.appendChild(listModel)
    console.log(listModel);
    
}

//display task

const displayList = () => {

    clearTasks();
    //const dataBase = getDataBase();
    dataBase.forEach(addTask)
    console.log(dataBase);
}

const clearTasks = () => {

    list.innerHTML = '';
}

const deleteTask = (index) => {

    //const dataBase = getDataBase();
    dataBase.splice(index, 1);
    setDataBase(dataBase);
    displayList();
    console.log(dataBase);
}

const taskStatus = (index) => {
    // *************************//
    dataBase[index].status = dataBase[index].status === ""? 'checked':"";
    setDataBase(dataBase);
    
    displayList();
}

const clickedTask = (e) => {

    const index = e.target.dataset.index;

    if (e.target.type === 'button') {  //************* */

        deleteTask(index);
    } else {

        if (e.target.type === 'checkbox') {

            taskStatus(index);
        }
    }
}
document.querySelector('#list').addEventListener('click', clickedTask)


displayList();

/* no innerHTML listModel para identificar o elemento html cria-se propriedade 'data' com tracinho coloca-se o nome que quiser, no caso 'index', e depois o valor que 
quiser, no caso um numero para poder identificar o index de onde veio este elemento cujo texto veio de uma array
este elemento pode ser encontrado ou usado posteriormente pela propriedade dataset */