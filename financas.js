

const Modal = { //esta função pode ser substituída pela função TOOGLE (pesquisar depois)
    open() {
        //abrir modal e ADD classe 'active' do modal
        document.querySelector(".modal-overlay").classList.add("active")
    },
    close() {
        // fechar modal e remover a classe 'active' do modal
        document.querySelector(".modal-overlay").classList.remove("active")
    }
}

const Storage = {
    
    get() {
        return JSON.parse(localStorage.getItem("dev.finance:transactions"))
        || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    
    all:Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction);
        //console.log(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        let income = 0;

        //pegar as transações 
        Transaction.all.forEach(transaction => {     //chamou cada posição do array de transaction no parametro da função asssim podendo acessar os parametros dos obejtos (ex: transaction.amount)
        // para cada transação, verificar se for maior que zero (para ser considerado income e não expense (negativo))
            if(transaction.amount > 0) {
        //somar a uma variavel e retornar variavel
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
    //somar as saídas
        let expenses = 0;

        Transaction.all.forEach(transaction => {     
            if(transaction.amount < 0) {
        
                expenses += transaction.amount;
            }
        })
        return expenses;
    },

    total() {
    /* entradas - saídas */
    return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'), //ver informação abaixo do title no head do html
    
    addTransaction(transaction, index) {  //ques está incando esta função NAO SEI.
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLtransaction(transaction, index)
        tr.dataset.index = index  //NÃO CONSEGUIR ENCONTRAR MUITA INFORMAÇÃO SOBRE DATASET
        //console.log(tr.innerHTML)
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLtransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? 'income':'expense'
        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = 
        `
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img onclick="Transaction.remove(${index})" src="/assets/minus.svg" alt="remover transação">
            </td>
        `
        return html 
    },
    updateBalace() { //a2 1:17:32 - a2 1:30:14
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

/*  regular expression with metacharacter \D - https://www.w3schools.com/jsref/jsref_regexp_digit_non.asp 
    toLocaleString() read more in https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString ==> go down in OPTINS page
*/

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100
        

        return value
    },
    formatDate(date) {
        const splittedDate = date.split("-")
        
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-":""
        value = String(value).replace(/\D/g, "") // falta explicar porque desta linha
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()
        
        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
                throw new Error ("Por favor preencha todos os campos corretamente.")
            }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues() // porque foi criado descrption se não foi usado? 2:33:32 min
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        
        
        return {
            description,
            amount,
            date
        }
    },
    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            
            Form.validateFields()
            const transaction = Form.formatValues()
            Transaction.add(transaction)
            Form.clearFields()
            Modal.close() 

        } catch (error) {
            alert (error.message)
        }
        
    }
}

const App = {
    init() {
        
        Transaction.all.forEach(DOM.addTransaction) // pode ser usado assim ou como está abaixo
        /* Transaction.all.forEach(function(transaction, index) {
            DOM.addTransaction(transaction, index)
        }) */
        
        DOM.updateBalace()
        Storage.set(Transaction.all)

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}
App.init();



/* nao conseguir encontrar o problema com a iteração continuar do 48:13 da aula*/ // UPDATE: DIA SEGUINTE COMEÇOU A FUNCIONAR ESTE FOREACH MISTERIOSAMENTE!


/* transactions.forEach(myFunc)
function myFunc(transaction) {
    DOM.addTransaction(transaction)
}
*/

/* DOM.addTransaction(transactions[0]);
DOM.addTransaction(transactions[1]);               
DOM.addTransaction(transactions[2]); */
