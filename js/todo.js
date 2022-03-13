
const check = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = "../auth/auth.html"
    }
}
check()


const API = 'https://jwt-ulios-test.herokuapp.com'
const ToDoRoute = '/create-todo'
const getAllRoute = '/get-all-todo'
const deleteRoute = '/delete-todo/'
const doneRoute = '/done/'
const editRoute = '/update-todo/'
const nameRoute = '/get-user-name'
const exit = document.getElementById('log__out')
const auth = document.getElementById('footer__buttons-auth')
const reg = document.getElementById('footer__buttons-reg')
const todoBtn = document.querySelector('#todo__btn')
const ToDos = document.querySelector('#ToDos')

exit.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = "../auth/auth.html"
})

auth.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = "../auth/auth.html"
})

reg.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = "../../index.html"
})


const getUserName = async () => {

    const req = await fetch(API + nameRoute, {
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem('token'),
        },
        method: 'GET'
    })

    const res = await req.json()

    renderUserName(res.name)
}
getUserName()


const renderUserName = (user) => {
    const headerUsername = document.querySelector('.header__text-username')
    headerUsername.textContent = user

    const footerUsername = document.querySelector('.footer__username')
    footerUsername.textContent = user
}


const todoCount = (todos) =>{

    let doneCount = 0
    todos.map(el=>{
        if(el.status === true){
            doneCount = doneCount + 1
        }
    })

    const todoAll = document.querySelector('.todo__count-all')
    const todoDone = document.querySelector('.todo__count-done')

    todoAll.textContent=`Todo count: ${todos.length}`
    todoDone.textContent=`Done count: ${doneCount}`
}



const createToDo = async (e) => {
    e.preventDefault()


    let todo__inputFirst = document.querySelector('.todo__inputFirst')
    let todo__inputSecond = document.querySelector('.todo__inputSecond')
    let errorName = document.querySelector('.errorName')
    errorName.textContent = ''
    let errorDesc = document.querySelector('.errorDesc')
    errorDesc.textContent = ''

    todo__inputFirst.append(errorName)
    todo__inputSecond.append(errorDesc)

    let title = document.querySelector('#text').value
    let description = document.querySelector('#desc').value

    if (title == '' && description == '') {
        errorName.textContent = "The name can't be empty"
        errorDesc.textContent = "The description can't be empty"
    } else if (title == '') {
        errorName.textContent = "The name can't be empty"
    } else if (description == '') {
        errorDesc.textContent = "The description can't be empty"
    } else if (title.trim() == '' && description.trim() == '') {
        errorName.textContent = "The name can't consist of spaces!"
        errorDesc.textContent = "The description can't consist of spaces!"
    } else if (title.trim() == '') {
        errorName.textContent = "The name can't consist of spaces!"
    } else if (description.trim() == '') {
        errorDesc.textContent = "The description can't consist of spaces!"
    } else if (title.length > 15 && description.length > 30) {
        errorName.textContent = "The name can't be longer than 15 symbols!"
    } else if (title.length > 15) {
        errorName.textContent = "The name can't be longer than 15 symbols!"
    } else {
        let data = {
            title,
            description
        }

        const req = await fetch(API + ToDoRoute, {
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token'),
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        const res = await req.json()


        getAllTodos()

    }
}

const getAllTodos = async () => {
    const req = await fetch(API + getAllRoute, {
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem('token'),
        },

        method: 'GET'
    })

    const res = await req.json()

    todoCount(res)
    renderToDo(res)

}
getAllTodos()



const renderToDo = async (data) => {

    ToDos.innerHTML = ''



    await data.reverse().map(el => {

        const ToDo = document.createElement('div')
        ToDo.className = 'ToDo'

        const ToDoInfo = document.createElement('div')
        ToDoInfo.className = 'ToDo__info'

        const ToDoName = document.createElement('h2')
        ToDoName.textContent = `Name: ${el.title}`

        const ToDoDescription = document.createElement('p')
        ToDoDescription.textContent = `Description: ${el.description}`



        const ToDoButtons = document.createElement('div')
        ToDoButtons.className = 'ToDo__buttons'

        const editBtn = document.createElement('button')
        editBtn.textContent = 'Edit'

        editBtn.addEventListener('click', () => {
            if (el.status === false) {
                modalWindow(el._id)
            } else {
                alert("You already did the todo. Why do you change it?")
            }
        })



        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', () => {
            deleteToDo(el._id, el.status)
        })


        const doneBtn = document.createElement('button')
        doneBtn.textContent = 'Done'
        doneBtn.addEventListener('click', () => {
            doneToDo(el._id)
        })

        ToDoInfo.append(ToDoName, ToDoDescription)
        ToDoButtons.append(editBtn, deleteBtn, doneBtn)
        ToDo.append(ToDoInfo, ToDoButtons)
        ToDos.append(ToDo)

        if (el.status === true) {
            const ToDoCompleted = document.createElement('p')
            ToDoCompleted.className = 'ToDo__completed'
            ToDoCompleted.textContent = 'Todo completed!!!'
            ToDoInfo.append(ToDoCompleted)

            ToDo.style = `
            border: solid 3px white;
            
            `
        }
    })
}



const modalWindow = (id) => {
    const modal = document.querySelector('.modal')
    const backdrop = document.querySelector('.backdrop')
    const modalCloseButton = document.querySelector('.modalCloseButton')
    const edit = document.querySelector('.edit')
    const title = document.querySelector('#newName')
    title.value = ''
    const description = document.querySelector('#newDescription')
    description.value = ''
    const newN = document.querySelector('.newN')
    const newD = document.querySelector('.newD')

    let errorNameModal = document.querySelector('.errorName')
    errorNameModal.textContent = ''
    let errorDescModal = document.querySelector('.errorDesc')
    errorDescModal.textContent = ''


    newN.append(errorNameModal)
    newD.append(errorDescModal)

    const addModal = () => {
        modal.classList.add('modalActive')
        backdrop.classList.add('backdropActive')
        edit.style.display = 'block'
    }
    addModal()

    const removeModal = () => {
        modal.classList.remove('modalActive')
        backdrop.classList.remove('backdropActive')
        edit.style.display = 'block'
    }

    modalCloseButton.addEventListener('click', removeModal)
    backdrop.addEventListener('click', removeModal)
    edit.addEventListener('click', () => {
        errorNameModal.textContent = ''
        errorDescModal.textContent = ''


        if (title.value == '' && description.value == '') {
            errorNameModal.textContent = "The name can't be empty"
            errorDescModal.textContent = "The description can't be empty"
        } else if (title.value == '') {
            errorNameModal.textContent = "The name can't be empty"
        } else if (description.value == '') {
            errorDescModal.textContent = "The description can't be empty"
        } else if (title.value.trim() == '' && description.value.trim() == '') {
            errorNameModal.textContent = "The name can't consist of spaces!"
            errorDescModal.textContent = "The description can't consist of spaces!"
        } else if (title.value.trim() == '') {
            errorNameModal.textContent = "The name can't consist of spaces!"
        } else if (description.value.trim() == '') {
            errorDescModal.textContent = "The description can't consist of spaces!"
        } else {
            setTimeout(removeModal, 1000)
            EditToDo(id, title.value, description.value)
        }

    })

}


todoBtn.addEventListener('click', createToDo)


const deleteToDo = async (id, status) => {
    if (status === true) {
        const req = await fetch(API + deleteRoute + id, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            method: 'DELETE'
        })

        const res = await req.json()
        alert(res.message)
        getAllTodos()
    } else {
        alert("Hey, you didn't finish your todo. Go and do your todo.")
    }
}


const doneToDo = async (id) => {
    const req = await fetch(API + doneRoute + id, {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        method: 'POST',
    })
    const res = await req.json()
    getAllTodos()
}



const EditToDo = async (id, title, description) => {

    let data = {
        title,
        description
    }

    const req = await fetch(API + editRoute + id, {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    const res = await req.json()
    getAllTodos()
}