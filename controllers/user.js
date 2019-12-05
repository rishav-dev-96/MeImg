const User = require('./../models/User.js');
const UserController = {};


UserController.create = function(req, res){
    var data =req.body;
    console.log(data.fullname);
    let flag = false;
    User.find({email:req.body.email},function(err,res){
      if(err){
        return res.status(500).send({
            status: false,
            message: "failed to store",
            error: error

        })
      }
      else{
        flag = true;

      }

    })

      if(!flag){
        User.create({
            
            fullname: data.fullname,
            mobile: data.mobile,
            email: data.email,
            password: data.password,
           

            
        },function(error, response){
            console.log("storing data ", response);
            if(error){res.render('signup.hbs', { 
                alert: "email already exist", 
                title: 'MeImg - Signup',
                style: 'signup.css',
                user: req.session.loggedIn
            })
        }else {
            res.redirect('/login');
    }
    });

  }
  else{
    res.redirect('/');
  }

}

module.exports = UserController;