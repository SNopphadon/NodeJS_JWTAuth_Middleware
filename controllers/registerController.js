module.exports = (req,res)=>{
    let username =""
    let password =""
    let email = ""
    let fname = ""
    let lname = ""
    let data = req.flash('data')[0]
    if (typeof data != "undefined"){
        username = data.username
        password = data.password
        email = data.email
        fname = data.fname
        lname = data.lname

    }
    res.render('register', { 
        error_msg: req.flash('error') ,
        username: username,
        password: password,
        email: email,
        fname:fname,
        lname:lname
    })
}