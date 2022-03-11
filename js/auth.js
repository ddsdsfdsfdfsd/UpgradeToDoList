const API = 'https://jwt-ulios-test.herokuapp.com'
let authRoute = '/auth/sign-in'

const form = document.getElementById('auth-form')
const output = document.getElementById('output')



const hrefBtn = document.getElementById('sign-up')
hrefBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = '../../reg.html'
})





const auth = async (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value


    let data = {
        email,
        pass
    }

    try{
        const req = await fetch(API + authRoute,{
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(data)
    })
    
    const res = await req.json()


    if(res.token){
        localStorage.setItem('token',res.token)
        window.location.href="../todo/todo.html"
        headerInfo(res)
    }else{
        output.innerHTML=''
        const error = document.createElement('h1')
        error.className = 'output__error'
        error.textContent='Wrong Email or Password! Try again'

        output.append(error)
    }
    }catch{
        output.innerHTML=''
        const error = document.createElement('h1')
        error.className = 'output__error'
        error.textContent="Something went wrong, try again"
        output.append(error)
    }
    
}

form.addEventListener('submit', auth)



const redirect = () => {
    let token = localStorage.getItem('token')
    if (token) {
        window.location.href = '../todo/todo.html'
    }

}
redirect()
