const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

const user = {
    id : 1 , 
    username : "user123" , 
    password : "12345678"
}

app.get('/', (req , res , next) => {
    const isLoggedIn = req.cookies.isLoggedIn 
    res.render("index" , {isLoggedIn})
})

app.get('/login' , (req , res , next) => {
    const redirect = req.query.next || "/"
    console.log(redirect)
    res.render('login' , {redirect})
})


app.post('/login' , (req ,res , next) => {
    const {username , password} = req.body ;
    if (!username && !password ) {
        return res.status(401).render("error")
    }

    if (username === user.username && password === user.password) {
        const {next} = req.query ; 
        return res.cookie('isLoggedIn' , true).redirect(next)
    }else {
        res.render("error")
    }
})



const port = process.env.PORT || 5000
app.listen(port , () => console.log(`http://localhost:${port}`))