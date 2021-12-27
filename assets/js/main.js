
const form = document.querySelector('#form');
const inputTarefa = document.querySelector('#input');
const listaTarefas = document.querySelector('.tarefas');

form.addEventListener('submit', e => {
    e.preventDefault();

    if(!inputTarefa.value) return;
    
    criaTarefa(inputTarefa.value);
    
    console.log('FIM');
});

inputTarefa.addEventListener('keypress', e => {
    
    if(e.keyCode === 46) {
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});


function criaTarefa(value) {
    const li = criaLi();
    li.innerHTML = value;
    criaBotaoApagar(li);
    listaTarefas.appendChild(li);
    limpaInput()
    salvarTarefas(); //
}

function criaBotaoApagar(li) {
    const bt = document.createElement('button');
    bt.style.marginLeft = '20px';
    bt.innerHTML = 'Apagar';
    bt.setAttribute('class', 'apagar');
    bt.setAttribute('title', 'Apagar está tarefa');
    li.appendChild(bt);
}

// function priMaiuscula(texto) {
//     texto = texto.split('');
//     texto[0] = texto[0].toUpperCase();
//     for(value of texto) {
//         texto += texto[value];
//     }
//     console.log(texto);
    
// }
// priMaiuscula('bolo')

function limpaInput() {
    inputTarefa.value = "";
    inputTarefa.focus();
}

function criaLi() {
    const li = document.createElement('li');
    return li;
}

// APAGAR //
document.addEventListener('click', e => {
    const el = e.target;
    if(el.classList.contains('apagar')) {
        // console.log(el.parentElement);
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = listaTarefas.querySelectorAll('li');
    const arrayTarefas = [];
    for(let tarefa of liTarefas) {
        let tarefaAtual = tarefa.innerText;
        tarefaAtual = tarefaAtual.replace('Apagar', '');
        arrayTarefas.push(tarefaAtual);
        // console.log(tarefaAtual)
    }
    const tarefasJSON = JSON.stringify(arrayTarefas);
    // console.log(tarefasJSON)
    localStorage.setItem('tarefas', tarefasJSON);
    
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const arrayTarefas = JSON.parse(tarefas);
    
    for(tarefa of arrayTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas()