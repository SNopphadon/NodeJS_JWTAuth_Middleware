module.exports = (req,res)=>{
    let username =""
    let password =""
    let data = req.flash('data')[0]
    if (typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render('login', { 
        error_msg: req.flash('error') ,
        username: username,
        password: password
    })
}