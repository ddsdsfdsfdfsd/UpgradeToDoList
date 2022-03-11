const API = 'https://jwt-ulios-test.herokuapp.com'
const regRoute = '/auth/reg'

const form = document.getElementById('reg-form')

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
        window.location.href="../todo/todo.html"
    }else{
        output.innerHTML=''
        const error = document.createElement('h3')
        error.className = 'output__error'
        error.textContent='The password must contain a number, a special character and a capital letter!'

        output.append(error)
    }
}

const redirect = () =>{
    let token = localStorage.getItem('token')
    if(token){
        window.location.href="../todo/todo.html"
    }
}
redirect()


form.addEventListener('submit', registration)
