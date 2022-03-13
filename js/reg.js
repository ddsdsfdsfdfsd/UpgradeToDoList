const API = 'https://jwt-ulios-test.herokuapp.com'
const regRoute = '/auth/reg'

const form = document.getElementById('reg-form')

const hrefBtn = document.getElementById('sign-in')
hrefBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = './pages/auth/auth.html'
})



const registration = async (e) => {
    e.preventDefault()

    let name = document.getElementById('username').value
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value

    let data = {
        name,
        email,
        pass
    }

    try{
        const req = await fetch(API+regRoute,{
        headers:{
            "Content-Type":"application/json"
        },
        method:'POST',
        body:JSON.stringify(data)
        
    })

    const res = await req.json()

    if(res.token){
        localStorage.setItem('token',res.token)
        alert('Congratulations, registration is success')
        window.location.href="./pages/todo/todo.html"
    }else{
        output.innerHTML=''
        const error = document.createElement('h3')
        error.className = 'output__error'
        error.textContent='The password must contain a number, a special character and a capital letter!'

        output.append(error)
    }
    }catch{
        output.innerHTML=''
        const error = document.createElement('h3')
        error.className = 'output__error'
        error.textContent="You entered something wrong, try again"

        output.append(error)
    }
}

const redirect = () =>{
    let token = localStorage.getItem('token')
    if(token){
        window.location.href="./pages/todo/todo.html"
    }
}
redirect()


form.addEventListener('submit', registration)
