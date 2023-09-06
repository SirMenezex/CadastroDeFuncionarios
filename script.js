// consts html
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

// pegar itens do banco (dbfunc) atraves do 'getItem', caso não tiver nada, retornar array vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
//settar os itens da 'let itens' para dentro do banco (dbfunc)
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// Armazenamento dos itens do banco
let itens
//Armazenamento do index para as edições
let id

//Abrir modal
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  
}


//Editar item
function editItem(index) {

  openModal(true, index)
}

//Deletar item, após atualizar o banco e recarregar itens
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

//Inserir item visual (tbody)
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

// Botão salvar do modal
btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();
  
  //se id vir de uma edição o array será atualizado
  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value

  } else {
    //senão irá dar push em novo item no banco
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }
  //ao fechar modal vai atualizar e por id como undefined
  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

// função que é executada assim que a tela é carregada, forEach em cada dado para que seja criada cada linha
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

//carregar itens
loadItens()
