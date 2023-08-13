'use strict';

// DOM elements
const btnAnimationEl = document.querySelector('.animation-btn');
const developTextEl = document.querySelector('.develop-p');

// Form elements
const inputlabelEl = document.querySelector('.input-label')
const inputEl = document.getElementById('in');
const btnFormEl = document.querySelector('.btn-form');

// insert form
const radioEl = document.getElementsByName('gm');
const radioContainer = document.querySelector('.radio-container');
const fRadioLabelEl = document.getElementById('first-radio-lable');
const sRadioLabelEl = document.getElementById('second-radio-lable');


// workspace form
const selectBoxEL = document.querySelector('.select-form');
// content box
const contentBoxEl = document.querySelector('.content-box');
const workSpaceNameEl = document.querySelector('.name-workspace');
const workSpaceidEl = document.querySelector('.id-workspace');
const workSpaceBirthYearEl = document.querySelector('.birth-year-workspace');
const workSpaceGenderEl = document.querySelector('.gender-workspace');
const workSpaceMaritalStatusEl = document.querySelector('.marital-status-workspace');
const workSpaceAgeEl = document.querySelector('.age-workspace');
// DD box tab
const btnCreditorEL = document.querySelector('.creditor-tab');
const btnDebtorEl = document.querySelector('.debtor-tab');

const creditorContentEl = document.querySelector('.creditor-content');
const creditorAmountInputEl = document.querySelector('.creditor-content').children[0][1];
const creditorIDInputEl = document.querySelector('.creditor-content').querySelector('#id');

const debtorContentEl = document.querySelector('.debtor-content');
const debtorAmountInputEl = document.querySelector('.debtor-content').children[0][1];
const debtorIDInputEl = document.querySelector('.debtor-content').querySelector('#id');

const btnAddDebtEl = document.querySelector('.btn-debtor');
const btnAddCreditEl = document.querySelector('.btn-creditor');
const DDTabContainer = document.querySelector('.DD-tab-container');
// financial input and display
const insertFiBoxEl = document.querySelector('.insert-fi-box');
const salaryInputEl = document.querySelector('.insert-fi-box').querySelector('#salary');
const expenseInputEl = document.querySelector('.insert-fi-box').querySelector('#expense');
const btnFiBoxEl = document.querySelector('.btn-fi-box');
// display Fi
const salaryEl = document.querySelector('.fi-box').children[0].lastElementChild;
const expenseEl = document.querySelector('.fi-box').children[1].lastElementChild;
const balanceEl = document.querySelector('.fi-box').children[2].lastElementChild;
const debtsTotalEl = document.querySelector('.fi-box').children[3].lastElementChild;
const creditsTotalEl = document.querySelector('.fi-box').children[4].lastElementChild;
const fiBoxEl = document.querySelector('.fi-box');


// DD space
const ddContainerEl = document.querySelector('.dd-container');

// General values



// animation control
btnAnimationEl.addEventListener('click', function(){
  developTextEl.classList.toggle('animation');
  btnAnimationEl.classList.toggle('off-color')
});


// classes
class Person{

  constructor(name,id,birthYear,gender,maritalStatus){
    this.name = name;
    this.id = Number(id);
    this.birthYear =Number( birthYear);
    this.gender = Number(gender);
    this.maritalStatus = Number(maritalStatus);
  }

  calcAge(){
    return 2023 - this.birthYear;
  }
}

class Financial extends Person{
  balance =  0;
  constructor(name,id,birthYear,gender,maritalStatus,salary, expense){
    super(name,id,birthYear,gender,maritalStatus)
    this.salary = salary;
    this.expense = expense;
    
    // initiate when a new instance of DD class has been made.
    // each person can have multiple DD with other persons
    this.ddList = [] // save instances of DD class
  }

  calcb(){
    this.balance = this.salary - this.expense;
  }

  getBalance(){
    return this.balance;
  }

  setBalance(newB){
    this.balance = newB
  }


  idValidation(id){
    // id is string
    let valid = false;

  pClassList.forEach((p, i) =>{
    if(p[String(Object.keys(pClassList[i]))].id === Number(id)){
      valid = true;
    }
  })

  return valid;
  }

  totalDebt(){
    //               id  amount   deadline(day)     type
    // DD instance: [2,   200,        10,          'debt']
    let totalDebt = 0
    this.ddList.forEach(dd => {
      if(dd.type === 'debt'){
        totalDebt += dd.amount
      }
    })
    return totalDebt;
  }

  totalDemand(){
    let totalDemand = 0
    this.ddList.forEach(dd => {
      if(dd.type === 'demand'){
        totalDemand += dd.amount
      }
    })
    return totalDemand
  }
}


/////
//////
///////////////////////
// DD////////////////////
///////
class DD{

  constructor(id,amount,deadline,type){
    this.id = Number(id);
    this.amount = Number(amount);
    this.deadline = Number(deadline);
    this.type = type; // debt - demand
  }

  

  get3Person(id){
    let person = '';
    pClassList.forEach((p, i) =>{
      if(p[String(Object.keys(pClassList[i]))].id === Number(id)){
        person = p[String(Object.keys(pClassList[i]))];
      }
    })
    
    return person;
  }

  removeDD(ins,index){
    ins.ddList.splice(index, 1)
  }

  reckonDebt(ins,index){
    const p = this.get3Person(this.id)

    if(ins.getBalance() >=  this.amount ){

      let balance = ins.getBalance();
      balance = balance - this.amount;
      ins.setBalance(balance);

      
      balance = p.getBalance();
      balance = balance + this.amount;
      p.setBalance(balance);


      this.removeDD(ins,index)

      // find index of the exact dd in p 
      p.ddList.forEach((dd, i) =>{
        if(dd.id === ins.id && dd.amount == this.amount && dd.deadline === this.deadline && dd.type === 'demand'){
          this.removeDD(p,i)
        }
      })

    }else{
      balanceEl.style.border = '4px dotted #f03e3e';
      setTimeout(() =>{
        balanceEl.style.border = 'none';
      }, 2000);
    }
  }

  reckonDemand(ins,index,rect){
    const p = this.get3Person(this.id)
    
    if(p.getBalance() >=  this.amount ){

      let balance = ins.getBalance();
      balance = balance + this.amount;
      ins.setBalance(balance);

      
      balance = p.getBalance();
      balance = balance - this.amount;
      p.setBalance(balance);


      this.removeDD(ins,index)

      // find index of the exact dd in p 
      p.ddList.forEach((dd, i) =>{
        if(dd.id === ins.id && dd.amount == this.amount && dd.deadline === this.deadline && dd.type === 'debt'){
          this.removeDD(p,i)
        }
      })
    }else{
      salaryEl.classList.add('dd-item-name-after')
    document.querySelector(':root').style.setProperty('--y-Coordinates', `${rect.y - 110}px`);
    document.querySelector(':root').style.setProperty('--x-Coordinates', `${rect.x - 300}px`);

    setTimeout(() =>{
      salaryEl.classList.remove('dd-item-name-after')
    }, 1500);
    }

  }
}

/////////////////////
// general variable//


// person data
let pData = {
  name: '',
  id: 0,
  gender: '', // 1=male, 2=female
  maritalStatus: '', // 1=married, 2=single
  birthYear:''
};

// get all object's keys' name
let keys = Object.keys(pData);


// index pData for setting data in it
let index = 0;

// unique ID for each instance of Person class
let id = 1;

// current instance
let currentInstance;

// all instances of class Person will save in this object
let pClassList = []

// General instance od DD class;
const gDD = new DD(0,0,0,0)

// fundametal functions
function displayLabelUI(index){
  inputlabelEl.textContent = `${keys[index]}:`;
  
  if(index === 0){
    inputEl.style.display = 'inline';
    radioContainer.style.display = 'none';
    inputEl.type = "text"
  }
  else if(index === 1){
    inputEl.type = "text"
    inputEl.value = `${id}`;
    // inputEl.placeholder = `-- ${id} -- write it down!`;
    id++;
    inputEl.setAttribute('readonly', '')
  }
  else if(index === 2){
    inputEl.style.display = 'none';
    radioContainer.style.display = 'inline-block';
    fRadioLabelEl.textContent = 'male'
    sRadioLabelEl.textContent = 'female'
  }
  else if(index === 3){
    inputEl.style.display = 'none';
    radioContainer.style.display = 'inline-block';
    fRadioLabelEl.textContent = 'married'
    sRadioLabelEl.textContent = 'single'
  }
  else if(index === 4){
    inputEl.style.display = 'inline';
    radioContainer.style.display = 'none';
    inputEl.type = "number"
    btnFormEl.value = 'Submit'
    inputEl.removeAttribute('readonly', '')
  }
  
}

function createNewInstance(Data){
  let key = Data['name'];

  // pClassList.push({
  //   [key]: new Person(
  //     name = Data['name'],
  //     Data['id'],
  //     Data['birthYear'],
  //     Data['gender'],
  //     Data['maritalStatus'], 
  //     )
  //   })

  pClassList.push(
    {
      [key]: new Financial(
        Data['name'],
        Data['id'],
        Data['birthYear'],
        Data['gender'],
        Data['maritalStatus'],
        '#',
        '#'
        )
    }
      
    )

}

function displayInstance(){

  const instance = pClassList[pClassList.length - 1][String(Object.keys(pClassList[pClassList.length - 1]))]
  selectBoxEL.insertAdjacentHTML("afterbegin", `
  <option value="${instance.id}">${instance.name}</option>
  `)
}

// display instances in workspace
function displaySelectedInstance(instance){
  workSpaceNameEl.textContent = instance.name;
  workSpaceBirthYearEl.textContent = instance.birthYear;
  workSpaceGenderEl.textContent = instance.gender === '1' ? 'Male' : 'Female';
  workSpaceMaritalStatusEl.textContent = instance.maritalStatus === '1' ? 'Married': 'Single';
  workSpaceidEl.textContent = instance.id;
  workSpaceAgeEl.textContent = instance.calcAge();
}

displayLabelUI(index);


// financial box
function fiUI(ins){
  fiBoxEl.classList.remove('hidden-div');
  insertFiBoxEl.classList.remove('hidden-div');
  if(ins.salary === '#'){
    // insertFiBoxEl
    fiBoxEl.classList.add('hidden-div');
    DDTabContainer.classList.add('hidden-div');
  }else{
    fiBoxEl.classList.remove('hidden-div');
    insertFiBoxEl.classList.add('hidden-div');
    DDTabContainer.classList.remove('hidden-div');

    salaryEl.textContent = ins.salary;
    expenseEl.textContent = ins.expense;
    balanceEl.textContent = ins.getBalance();
    debtsTotalEl.textContent = ins.totalDebt();
    creditsTotalEl.textContent = ins.totalDemand();
    
  }
}

btnFiBoxEl.addEventListener('click', function(){
  let salary = salaryInputEl.value
  let expense = expenseInputEl.value
  if(salary && expense){
    currentInstance.salary = salary;
    currentInstance.expense = expense;
    currentInstance.calcb()
    fiUI(currentInstance);
  }
})

// select in workspace
selectBoxEL.addEventListener("change", function(){
  if(selectBoxEL.value !== ''){
    // design of  pClassList 
    const instance = pClassList[selectBoxEL.value - 1][String(Object.keys(pClassList[selectBoxEL.value - 1]))]
    displaySelectedInstance(instance);


    // index of selected person
    // this use for other use cases
    currentInstance = instance;

    contentBoxEl.classList.remove('hidden-div');

    // financial UI
    fiUI(currentInstance)

    displayDDItemsUI(currentInstance,true)
  }
  else{
    contentBoxEl.classList.add('hidden-div')
    ddContainerEl.innerHTML = ''
  }
})


// btn next and submit (main btn)
btnFormEl.addEventListener('click', function() {
  let inputData = inputEl.value;
  inputEl.value = '';

  // radio buttons
  if(index === 2 || index === 3){
    radioEl.forEach(function(radio){
      if(radio.checked){
        inputData = radio.value;
      radio.checked = false;
      }
    })
  }

  if(inputData != '' ){
    pData[`${keys[index]}`] = inputData
    
    if(index < 4){
      index++;
    displayLabelUI(index);
    }
    else{
      createNewInstance(pData);

      index = 0;
      displayLabelUI(index);
      btnFormEl.value = 'next'

      // add to workspace
      displayInstance()

    }
    
  }
});

function tabHandler(){

  if(this === 'creditro'){
    if(creditorContentEl.classList.contains('hidden-div')){
      creditorContentEl.classList.remove('hidden-div');
      debtorContentEl.classList.add('hidden-div');
      btnCreditorEL.classList.add('transform-tab');
      btnDebtorEl.classList.remove('transform-tab');
    }else{
      creditorContentEl.classList.add('hidden-div');
      btnCreditorEL.classList.remove('transform-tab');
    }

    
  }
  else if(this === 'debtor'){
    if(debtorContentEl.classList.contains('hidden-div')){
      creditorContentEl.classList.add('hidden-div');
    debtorContentEl.classList.remove('hidden-div');
    btnCreditorEL.classList.remove('transform-tab');
    btnDebtorEl.classList.add('transform-tab');
    }else{
      debtorContentEl.classList.add('hidden-div');
      btnDebtorEl.classList.remove('transform-tab');
    }
  }
}

function cleanTabInput(){
  debtorContentEl.children[0].querySelector('#id').value = '';
  debtorContentEl.children[0].querySelector('#amount').value = '';
  debtorContentEl.children[0].querySelector('#deadline').value = '';
  creditorContentEl.children[0].querySelector('#id').value = '';
  creditorContentEl.children[0].querySelector('#amount').value = '';
  creditorContentEl.children[0].querySelector('#deadline').value = '';
}

function reckonDD(ins,index,type,rect){
  if(type === 'debt'){
    ins.ddList[index].reckonDebt(ins,index)
  }else{
    ins.ddList[index].reckonDemand(ins,index,rect)
  }
  displayDDItemsUI(ins);
  fiUI(ins);
}

function displayDDItemsUI(ins,personChange){
  // personchange is for instance change which is true
  if(personChange === false){
    ins.ddList.forEach((dd, i) =>{
    if(i === ins.ddList.length -1){
    ddContainerEl.insertAdjacentHTML("afterbegin",`
    <div class="dd-item-${i}  "> 
    <p class="dd-item-name">${gDD.get3Person(dd.id).name}</p>
    <p class="dd-item-type ${dd.type}-type">${dd.type}</p>
    <p class="dd-item-amount">Amount: <span>${dd.amount}</span></p>
    <p class="dd-item-deadline">Deadline: <span>${dd.deadline}</span></p>
    <button id='${i}' type='${dd.type}' class="dd-item-btn btn-reckon-${dd.type}">Reckon</button>
    </div>
    `)}});

  // // each time runs
  // const btnReckon = document.querySelector('.dd-item-btn')
  // const rect = btnReckon.getBoundingClientRect();
  // btnReckon.addEventListener('click',() => {
  // reckonDD(ins,btnReckon.getAttribute('id'),btnReckon.getAttribute('type'),rect)});
}
  else{
    ddContainerEl.innerHTML = '';
    ins.ddList.forEach((dd, i) =>{
      ddContainerEl.insertAdjacentHTML("afterbegin",`
      <div class="dd-item-${i}  "> 
      <p class="dd-item-name">${gDD.get3Person(dd.id).name}</p>
      <p class="dd-item-type ${dd.type}-type">${dd.type}</p>
      <p class="dd-item-amount">Amount: <span>${dd.amount}</span></p>
      <p class="dd-item-deadline">Deadline: <span>${dd.deadline}</span></p>
      <button id='${i}' type='${dd.type}' class="dd-item-btn btn-reckon-${dd.type}">Reckon</button>
    </div>
      `)

    });
    // const btnReckon = document.querySelector('.dd-item-btn')
    // const rect = btnReckon.getBoundingClientRect();
    // btnReckon.addEventListener('click',() => {
    // reckonDD(ins,btnReckon.getAttribute('id'),btnReckon.getAttribute('type'),rect)});
  }
  const btnReckons = document.querySelectorAll('.dd-item-btn')
  btnReckons.forEach((btn) =>{
    btn.addEventListener('click',() => {
      reckonDD(ins,btn.getAttribute('id'),btn.getAttribute('type'),btn.getBoundingClientRect())});
  })
}


// check if requested DD id valid for both side or not
// also does the transaction sub and increase the two account
function checkDD(ins,p,amount,id,type){
  if(type === 'debt'){
    if(p.balance >= amount){
      p.setBalance(p.balance - amount);
      ins.setBalance(Number(ins.balance) + Number(amount));
      return true;
    }else return false
  }
  else if(type === 'demand'){
    if(ins.balance >= amount){
      ins.setBalance(ins.balance - amount);
      p.setBalance(Number(p.balance) + Number(amount));
      return true;
    }else return false
  }
}

function addDD(){
  if(this === 'debt'){
    const id = debtorContentEl.children[0].querySelector('#id').value;
    const amount = debtorContentEl.children[0].querySelector('#amount').value;
    const deadline = debtorContentEl.children[0].querySelector('#deadline').value;
    if(id && amount && deadline && currentInstance.idValidation(id)) 
    {
      const _3person = gDD.get3Person(id);

      if(checkDD(currentInstance,_3person,amount,id,this) && Number(id) !== currentInstance.id){
        //create for person who made the DD
        currentInstance.ddList.push(new DD(id, amount, deadline, 'debt'));
        //create for person who recived the DD
        
        _3person.ddList.push(new DD(currentInstance.id, amount, deadline, 'demand'));
        fiUI(currentInstance);
  
        cleanTabInput()
        displayDDItemsUI(currentInstance,false)
      }else{
        btnAddDebtEl.style.backgroundColor = '#f03e3e';
        if(Number(id) === currentInstance.id){
          workSpaceidEl.style.border = '4px dotted #f03e3e';
          debtorIDInputEl.style.border = '4px dotted #f03e3e';
        }else{
          document.querySelector(':root').style.setProperty('--display-state', 'block');
        }
        setTimeout(() =>{
          document.querySelector(':root').style.setProperty('--display-state', 'none');
          btnAddDebtEl.style.backgroundColor = '#EFEFEF';
          workSpaceidEl.style.border = 'none';
          debtorIDInputEl.style.border = 'none';
        }, 2000);
      }

    }else{
      debtorContentEl.style.border = '4px dotted #f03e3e';
      if(!currentInstance.idValidation(id)){
        debtorIDInputEl.style.border = '4px dotted #f03e3e';
        
      }
        setTimeout(() =>{
          debtorContentEl.style.border = 'none';
          debtorIDInputEl.style.border = 'none';
        }, 2000);
    }

  }else if(this === 'demand'){
      const id = creditorContentEl.children[0].querySelector('#id').value;
      const amount = creditorContentEl.children[0].querySelector('#amount').value;
      const deadline = creditorContentEl.children[0].querySelector('#deadline').value;
      if(id && amount && deadline && currentInstance.idValidation(id))
      {
        const _3person = gDD.get3Person(id);
        if(checkDD(currentInstance,_3person,amount,id,this) && Number(id) !== currentInstance.id)
        {currentInstance.ddList.push(new DD(id, amount, deadline, 'demand'));
        //create for person who recived the DD
      _3person.ddList.push(new DD(currentInstance.id, amount, deadline, 'debt'))
      fiUI(currentInstance);

        cleanTabInput()
        displayDDItemsUI(currentInstance,false)
      }else{

        btnAddCreditEl.style.backgroundColor = '#f03e3e';
        
        if(Number(id) === currentInstance.id){
          workSpaceidEl.style.border = '4px dotted #f03e3e';
          creditorIDInputEl.style.border = '4px dotted #f03e3e';
        }else{
          balanceEl.style.border = '4px dotted #f03e3e';
          creditorAmountInputEl.style.border = '4px dotted #f03e3e';
        }
        setTimeout(() =>{
          btnAddCreditEl.style.backgroundColor = '#EFEFEF';
          balanceEl.style.border = 'none';
          workSpaceidEl.style.border = 'none';
          creditorIDInputEl.style.border = 'none';
          creditorAmountInputEl.style.border = 'none';
        }, 2000);
      }
      }else{
        creditorContentEl.style.border = '4px dotted #f03e3e';
        if(!currentInstance.idValidation(id)){
          creditorIDInputEl.style.border = '4px dotted #f03e3e';
        }
          setTimeout(() =>{
            creditorContentEl.style.border = 'none';
            debtorAmountInputEl.style.border = 'none';
          }, 2000);
        }
  }
}



// ///////tabs///////////////
btnCreditorEL.addEventListener('click', tabHandler.bind('creditro'));
btnDebtorEl.addEventListener('click', tabHandler.bind('debtor'));

btnAddDebtEl.addEventListener('click',addDD.bind('debt'));
btnAddCreditEl.addEventListener('click',addDD.bind('demand'));





// /////////////////////////////////////////////////test

let d = {
  name: 'alex',
id: 1,
birthYear: 2001,
gender: 1,
maritalStatus: 2}//'alex',1,2001,1,2,'1200','300'
createNewInstance(d) //a
displayInstance()

d = {
  name: 'sara',
id: 2,
birthYear: 1990,
gender: 1,
maritalStatus: 2} //s
createNewInstance(d) //b
displayInstance()

d = {
  name: 'adam',
id: 3,
birthYear: 2002,
gender: 2,
maritalStatus: 1} //ad
createNewInstance(d) //ad
displayInstance()

d = {
  name: 'jhon',
id: 4,
birthYear: 1889,
gender: 1,
maritalStatus: 2}
createNewInstance(d) //j
displayInstance()


// add fi
pClassList[0][0]


pClassList[0][String(Object.keys(pClassList[0]))].salary = 1200;
pClassList[0][String(Object.keys(pClassList[0]))].expense = 1210;
pClassList[0][String(Object.keys(pClassList[0]))].calcb();

pClassList[1][String(Object.keys(pClassList[1]))].salary = 5000;
pClassList[1][String(Object.keys(pClassList[1]))].expense = 2000;
pClassList[1][String(Object.keys(pClassList[1]))].calcb();

pClassList[2][String(Object.keys(pClassList[2]))].salary = 2000;
pClassList[2][String(Object.keys(pClassList[2]))].expense = 777;
pClassList[2][String(Object.keys(pClassList[2]))].calcb();


pClassList[3][String(Object.keys(pClassList[3]))].salary = 1000;
pClassList[3][String(Object.keys(pClassList[3]))].expense = 800;
pClassList[3][String(Object.keys(pClassList[3]))].calcb();


// checkDD(ins,p,amount,id,type)
if( checkDD(pClassList[0][String(Object.keys(pClassList[0]))],gDD.get3Person(4),100,0,'debt'))
{
  pClassList[0][String(Object.keys(pClassList[0]))].ddList.push(new DD(4, 100, 8, 'debt'));
pClassList[3][String(Object.keys(pClassList[3]))].ddList.push(new DD(1, 100, 8, 'demand'));
}





// // bugs or problems
// //1. fix dd maker not allowed to itself *****solved
// // 2. id field  ******solved
// 3.without financial data all dd requests are not allowed ** ****solved