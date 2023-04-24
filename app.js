const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 2000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views','./views');

const url = 'mongodb://0.0.0.0:27017/bookstore'


const multer = require('multer');
const cors = require('cors');
app.use(cors());
const csv = require('fast-csv');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, __dirname + '/uploads');
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
})

// Set saved storage options:
const upload = multer({ storage: storage })



mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log('MongoDb connected.......')
})


// RENDERING EJS FILES 
app.get('/', (req,res) => {
    res.render('HOME');
});

//   FARMER PAGES

app.get('/Farmer_Home_Page', (req,res) => {
    res.render('Farmer_Home_Page',{successMsg: ''});
});




app.get('/Farmer_SignUp_Login_Page', (req,res) => {
    res.render('Farmer_SignUp_Login_Page',{errorMsg: '',successMsg:''});
});


app.get('/Farmer_Advertise_Login_Page', (req,res)=>{
    res.render('Farmer_Advertise_Login_Page',{errorMsg: '',successMsg:''});
});


app.get('/Farmer_Advertise_Page', (req,res)=>{
    res.render('Farmer_Advertise_Page',{successMsg: ''});
});

//  SALES AGENT PAGES 

app.get('/Sales_Agent_SignUp_Login_Page', (req,res) => {
    res.render('Sales_Agent_SignUp_Login_Page',{errorMsg: '',successMsg:''});
});


app.get('/Sales_Agent_Home_Page', (req,res) => {
    res.render('Sales_Agent_Home_Page',{successMsg: ''});
});

//  CUSTOMER PAGES
app.get('/Customer_Home_Page', (req,res) => {
    res.render('Customer_Home_Page',{successMsg: ''});
});



app.get('/Customer_SignUp_Login_Page', (req,res) => {
    res.render('Customer_SignUp_Login_Page',{errorMsg: '',successMsg:''});
});


app.get('/Farmer_Checkout', (req,res)=>{
    res.render('Farmer_Checkout');
});


app.get('/Customer_Checkout', (req,res)=>{
    res.render('Customer_Checkout');
});



function random_number()
{
let y = '',i,x;
for (i = 0; i < 4; i++)
    { x = Math.floor(Math.random()*9);
      y = y+x;
    }

return y;
}

app.post('/Sales_Agent_SignUp', async (req, res) => {


        while (1)
        { x = "SA" + random_number();
          const result = await con.collection('sales').find().bufferedCount();
          if (result == 0)
            { break; }
        }
    
        const Id = x;

    const { user, phonenumber, email ,password ,State_Name ,Pincode,Address} = req.body;
    // const collection = db.collection('sales');
    con.collection('sales')
    .findOne( { phonenumber : req.body.phonenumber})
    .then(result=>{
      if(result){
        res.render('Sales_Agent_SignUp_Login_Page', {successMsg:'', errorMsg: 'Phone number already exsit....' });   
      }
      
      else{
          con.collection('sales')
          .insertOne({ Id, user, phonenumber, email ,password,State_Name ,Pincode,Address })
          .then(resu=>{
            phone=req.body.phonenumber;
           
              con.collection('sales')
              .findOne({ phonenumber: req.body.phonenumber})
              
            .then(result=>{
                res.render('Sales_Agent_Home_Page', { user : result , successMsg : 'Resistration Sucessfully..'  });
                // res.render('profile_data', { user : result   });

                })
   
            .catch(err=>{
                res.send('<h1>Invalid login credentials</h1>');
            })
          })
            .catch(err=>{
              res.send(`some error : ${err}`);
            })    
           
      }
  })
  .catch(err=>{
      res.send(`some error : ${err}`);
  })  
  });


  //details

  app.post('/SA_Product_Form_1', async (req, res) => {


    while (1)
    { x = "SA" + random_number();
      const result = await con.collection('sales_product').find().bufferedCount();
      if (result == 0)
        { break; }
    }

    const Id2 = x;

   const { product_name, product_img, product_mrp ,product_selling_price ,quantity_available ,offer,delvary_charges,product_type,discription,phoneNumber} = req.body;
// const collection = db.collection('sales');

      con.collection('sales_product')
      .insertOne({ Id2, product_name, product_img, product_mrp ,product_selling_price ,quantity_available ,offer,delvary_charges,product_type,discription ,phoneNumber})
     
      .then(async resu=>{
       
        let x1= await con.collection('sales').findOne({phonenumber: phoneNumber})
        if(resu){
        res.render('Sales_Agent_Home_Page', { user:x1, successMsg : 'upload Sucessfully..'  });
        }
        
       })

            .catch(err=>{
            res.send(`some error : ${err}`);
            })  

  });


  //last

  
  app.post('/Sales_Agent_SignIn', (req, res) => {

    const {  phonenumber1,password1 } = req.body;
    

    // const collection = db.collection('sales');
    con.collection('sales')
    .findOne( { phonenumber :  phonenumber1 , password: password1 })
    .then(result=>{
      if(result){
        phone=phonenumber1;
        res.render('Sales_Agent_Home_Page', { user : result , successMsg : 'Login Sucessfully..'  });
        // res.render('profile_data', { user : result  });
          }
      else{
        
        res.render('Sales_Agent_SignUp_Login_Page', { successMsg:'', errorMsg: 'Phone number and Password does not match.. ' });
      }
  })
  .catch(err=>{
      res.send(`some error : ${err}`);
  })  
  });



  app.post('/forgot', (req, res) => {

    const {  phonenumber2,password2 } = req.body;
    

    // const collection = db.collection('sales');
    con.collection('sales')
    .findOne( { phonenumber :  phonenumber2  })
    .then(result=>{
      if(result){
        con.collection('sales')
        .updateOne({phonenumber :  phonenumber2  },{$set:{password : password2 }})
        .then(result1=>{
            
            if(result1){
               
                res.render('Sales_Agent_SignUp_Login_Page', {errorMsg:'' ,successMsg: 'Password Updated....'  }); 
            }
        })
          }

      else{
        
        res.render('Sales_Agent_SignUp_Login_Page', { successMsg :'',errorMsg: 'Phone number is not match.... ' });
      }
  })
  .catch(err=>{
      res.send(`some error : ${err}`);
  })  
  });



  app.post('/update', (req, res) => {

    const {   user5, phonenumber5, email5 ,State_Name5 ,Pincode5,Address5 } = req.body;
   
    con.collection('sales')
    .findOne( { phonenumber :  phonenumber5 })
    .then(result=>{
      if(result){
        con.collection('sales')
        .updateOne({phonenumber :  phonenumber5  },{$set:{user : user5,email:email5,State_Name:State_Name5,Pincode:Pincode5,Address:Address5 }})
        .then(result=>{
            
            if(result){
               con.collection('sales')
               .findOne({phonenumber :  phonenumber5 })
               .then(result=>{
               
                if(result){
                    res.render('Sales_Agent_Home_Page', { user : result , successMsg : 'Update Sucessfully'  });
                }
               })
                
            }
        })
          }

      else{
        
        console.log("Done")
      }
  })
  .catch(err=>{
      res.send(`some error : ${err}`);
  })  
  });

 
  app.post('/uploadimage', (req, res) => {

    const { phone6,imageurl  } = req.body;
   
    con.collection('sales')
    .findOne( { phonenumber :  phone6 })
    .then(result=>{
      if(result){
        con.collection('sales')
        .updateOne({phonenumber :  phone6  },{$set:{imageurl: imageurl}})
        .then(result=>{
            
            if(result){
               con.collection('sales')
               .findOne({phonenumber : phone6 })
               .then(result=>{
               
                if(result){
                    res.render('Sales_Agent_Home_Page', { user : result , successMsg : 'Update Sucessfully'  });
                }
               })
                
            }
        })
          }

      else{
        
        console.log("Done")
      }
  })
  .catch(err=>{
      res.send(`some error : ${err}`);
  })  
  });



//   Farmers login
 

app.post('/farmer_SignUp', async (req, res) => {


    while (1)
    { x = "FA" + random_number();
      const result = await con.collection('farmer_login').find().bufferedCount();
      if (result == 0)
        { break; }
    }

    const Id = x;

const { user, phonenumber, email ,password ,State_Name ,Pincode,Address} = req.body;

con.collection('farmer_login')
.findOne( { phonenumber : req.body.phonenumber})
.then(result=>{
  if(result){
    res.render('Farmer_SignUp_Login_Page', {successMsg:'', errorMsg: 'Phone number already exsit....' });   
  }
  
  else{
      con.collection('farmer_login')
      .insertOne({ Id, user, phonenumber, email ,password,State_Name ,Pincode,Address })
      .then(resu=>{
        
       
          con.collection('farmer_login')
          .findOne({ phonenumber: req.body.phonenumber})
          
        .then(async result=>{
          if(result){
            const seeds=[]
            const pest = []
            const mach = []
            await con.collection('sales_product').find({product_type: "Seeds"}).sort({product_mrp:1})
            .forEach(produ=>{
              seeds.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })
          
            await con.collection('sales_product').find({product_type: "Organic Fertilizer"}).sort({product_mrp:1})
            .forEach(produ=>{
              pest.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })
          
            await con.collection('sales_product').find({product_type: "HTP Machines"}).sort({product_mrp:1})
            .forEach(produ=>{
              mach.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })
            res.render('Farmer_Home_Page', { user : result ,seeds:seeds,pest: pest, mach: mach, successMsg : 'Resistration Sucessfully..'  });
            // res.render('profile_data', { user : result  });
              }
            // res.render('profile_data', { user : result   });

            })

        .catch(err=>{
            res.send('<h1>Invalid login credentials</h1>');
        })
      })
        .catch(err=>{
          res.send(`some error : ${err}`);
        })    
       
  }
})
.catch(err=>{
  res.send(`some error : ${err}`);
})  
});



app.post('/farmer_SignIn',async (req, res) => {

const {  phonenumber1,password1 } = req.body;


// const collection = db.collection('sales');
con.collection('farmer_login')
.findOne( { phonenumber :  phonenumber1 , password: password1 })
.then(async result=>{
  if(result){
    const seeds=[]
    const pest = []
    const mach = []
    await con.collection('sales_product').find({product_type: "Seeds"}).sort({product_mrp:1})
    .forEach(produ=>{
      seeds.push(produ);
    })
    .then(()=>{
        console.log('sucessfully');
    }).catch((err)=>{
        console.log(`Some Error : ${err}`);
    })
  
    await con.collection('sales_product').find({product_type: "Organic Fertilizer"}).sort({product_mrp:1})
    .forEach(produ=>{
      pest.push(produ);
    })
    .then(()=>{
        console.log('sucessfully');
    }).catch((err)=>{
        console.log(`Some Error : ${err}`);
    })
  
    await con.collection('sales_product').find({product_type: "HTP Machines"}).sort({product_mrp:1})
    .forEach(produ=>{
      mach.push(produ);
    })
    .then(()=>{
        console.log('sucessfully');
    }).catch((err)=>{
        console.log(`Some Error : ${err}`);
    })
    
    res.render('Farmer_Home_Page', { user : result , seeds:seeds,pest: pest, mach: mach, successMsg : 'Login Sucessfully..'  });
    // res.render('profile_data', { user : result  });
      }
  else{
    
    res.render('Farmer_SignUp_Login_Page', { successMsg:'', errorMsg: 'Phone number and Password does not match.. ' });
  }
})
.catch(err=>{
  res.send(`some error : ${err}`);
})  
});



app.post('/farmer_forgot', (req, res) => {

const {  phonenumber2,password2 } = req.body;


// const collection = db.collection('sales');
con.collection('farmer_login')
.findOne( { phonenumber :  phonenumber2  })
.then(result=>{
  if(result){
    con.collection('farmer_login')
    .updateOne({phonenumber :  phonenumber2  },{$set:{password : password2 }})
    .then(result1=>{
        
        if(result1){
           
            res.render('Farmer_SignUp_Login_Page', {errorMsg:'' ,successMsg: 'Password Updated....'  }); 
        }
    })
      }

  else{
    
    res.render('Farmer_SignUp_Login_Page', { successMsg :'',errorMsg: 'Phone number is not match.... ' });
  }
})
.catch(err=>{
  res.send(`some error : ${err}`);
})  
});



app.post('/farmer_update', (req, res) => {

const {   user5, phonenumber5, email5 ,State_Name5 ,Pincode5,Address5 } = req.body;

con.collection('farmer_login')
.findOne( { phonenumber :  phonenumber5 })
.then(result=>{
  if(result){
    con.collection('farmer_login')
    .updateOne({phonenumber :  phonenumber5  },{$set:{user : user5,email:email5,State_Name:State_Name5,Pincode:Pincode5,Address:Address5 }})
    .then(result=>{
        
        if(result){
           con.collection('farmer_login')
           .findOne({phonenumber :  phonenumber5 })
           .then(async result=>{
           
            if(result){
              const seeds=[]
              const pest = []
              const mach = []
              await con.collection('sales_product').find({product_type: "Seeds"}).sort({product_mrp:1})
              .forEach(produ=>{
                seeds.push(produ);
              })
              .then(()=>{
                  console.log('sucessfully');
              }).catch((err)=>{
                  console.log(`Some Error : ${err}`);
              })
            
              await con.collection('sales_product').find({product_type: "Organic Fertilizer"}).sort({product_mrp:1})
              .forEach(produ=>{
                pest.push(produ);
              })
              .then(()=>{
                  console.log('sucessfully');
              }).catch((err)=>{
                  console.log(`Some Error : ${err}`);
              })
            
              await con.collection('sales_product').find({product_type: "HTP Machines"}).sort({product_mrp:1})
              .forEach(produ=>{
                mach.push(produ);
              })
              .then(()=>{
                  console.log('sucessfully');
              }).catch((err)=>{
                  console.log(`Some Error : ${err}`);
              })
                res.render('Farmer_Home_Page', { user : result ,seeds:seeds,pest: pest, mach: mach, successMsg : 'Update Sucessfully'  });
            }
           })
            
        }
    })
      }

  else{
    
    console.log("Done")
  }
})
.catch(err=>{
  res.send(`some error : ${err}`);
})  
});


app.post('/farmer_uploadimage', (req, res) => {

const { phone6,imageurl  } = req.body;

con.collection('farmer_login')
.findOne( { phonenumber :  phone6 })
.then(result=>{
  if(result){
    con.collection('farmer_login')
    .updateOne({phonenumber :  phone6  },{$set:{imageurl: imageurl}})
    .then(result=>{
        
        if(result){
           con.collection('farmer_login')
           .findOne({phonenumber : phone6 })
           .then( async result=>{
           
            if(result){
              const seeds=[]
              const pest = []
              const mach = []
              await con.collection('sales_product').find({product_type: "Seeds"}).sort({product_mrp:1})
              .forEach(produ=>{
                seeds.push(produ);
              })
              .then(()=>{
                  console.log('sucessfully');
              }).catch((err)=>{
                  console.log(`Some Error : ${err}`);
              })
            
              await con.collection('sales_product').find({product_type: "Organic Fertilizer"}).sort({product_mrp:1})
              .forEach(produ=>{
                pest.push(produ);
              })
              .then(()=>{
                  console.log('sucessfully');
              }).catch((err)=>{
                  console.log(`Some Error : ${err}`);
              })
            
              await con.collection('sales_product').find({product_type: "HTP Machines"}).sort({product_mrp:1})
              .forEach(produ=>{
                mach.push(produ);
              })
              .then(()=>{
                  console.log('sucessfully');
              }).catch((err)=>{
                  console.log(`Some Error : ${err}`);
              })
            
                res.render('Farmer_Home_Page', { user : result ,seeds:seeds,pest: pest, mach: mach, successMsg : 'Update Sucessfully'  });
            }
           })
            
        }
    })
      }

  else{
    
    console.log("Done")
  }
})
.catch(err=>{
  res.send(`some error : ${err}`);
})  
});


// customer login



app.post('/customer_SignUp', async (req, res) => {


  while (1)
  { x = "CA" + random_number();
    const result = await con.collection('Customer_login').find().bufferedCount();
    if (result == 0)
      { break; }
  }

  const Id = x;

const { user, phonenumber, email ,password ,State_Name ,Pincode,Address} = req.body;

con.collection('Customer_login')
.findOne( { phonenumber : req.body.phonenumber})
.then(result=>{
if(result){
  res.render('Customer_SignUp_Login_Page', {successMsg:'', errorMsg: 'Phone number already exsit....' });   
}

else{
    con.collection('Customer_login')
    .insertOne({ Id, user, phonenumber, email ,password,State_Name ,Pincode,Address })
    .then(resu=>{
      phone=req.body.phonenumber;
     
        con.collection('Customer_login')
        .findOne({ phonenumber: req.body.phonenumber})
        
      .then(async result=>{
        if(result){
          const fruits=[]
          const vegetables = []
          const meat = []
          await con.collection('farmer_product').find({product_type: "Fruit"}).sort({product_mrp:1})
          .forEach(produ=>{
              fruits.push(produ);
          })
          .then(()=>{
              console.log('sucessfully');
          }).catch((err)=>{
              console.log(`Some Error : ${err}`);
          })
        
          await con.collection('farmer_product').find({product_type: "Vegetable"}).sort({product_mrp:1})
          .forEach(produ=>{
              vegetables.push(produ);
          })
          .then(()=>{
              console.log('sucessfully');
          }).catch((err)=>{
              console.log(`Some Error : ${err}`);
          })
        
          await con.collection('farmer_product').find({product_type: "Dairy/Meat"}).sort({product_mrp:1})
          .forEach(produ=>{
              meat.push(produ);
          })
          .then(()=>{
              console.log('sucessfully');
          }).catch((err)=>{
              console.log(`Some Error : ${err}`);
          })
        
          
          res.render('Customer_Home_Page', { user : result ,fruits:fruits,vegetables: vegetables, meat: meat, successMsg : 'Resistration Sucessfully..'  });
          // res.render('profile_data', { user : result  });
            }
          // res.render('profile_data', { user : result   });

          })

      .catch(err=>{
          res.send('<h1>Invalid login credentials</h1>');
      })
    })
      .catch(err=>{
        res.send(`some error : ${err}`);
      })    
     
}
})
.catch(err=>{
res.send(`some error : ${err}`);
})  
});



app.post('/customer_SignIn',async (req, res) => {

const {  phonenumber1,password1 } = req.body;


// const collection = db.collection('sales');
con.collection('Customer_login')
.findOne( { phonenumber :  phonenumber1 , password: password1 })
.then(async result=>{
if(result){
  const fruits=[]
  const vegetables = []
  const meat = []
  await con.collection('farmer_product').find({product_type: "Fruit"}).sort({product_mrp:1})
  .forEach(produ=>{
      fruits.push(produ);
  })
  .then(()=>{
      console.log('sucessfully');
  }).catch((err)=>{
      console.log(`Some Error : ${err}`);
  })

  await con.collection('farmer_product').find({product_type: "Vegetable"}).sort({product_mrp:1})
  .forEach(produ=>{
      vegetables.push(produ);
  })
  .then(()=>{
      console.log('sucessfully');
  }).catch((err)=>{
      console.log(`Some Error : ${err}`);
  })

  await con.collection('farmer_product').find({product_type: "Dairy/Meat"}).sort({product_mrp:1})
  .forEach(produ=>{
      meat.push(produ);
  })
  .then(()=>{
      console.log('sucessfully');
  }).catch((err)=>{
      console.log(`Some Error : ${err}`);
  })

  
  res.render('Customer_Home_Page', { user : result , fruits:fruits,vegetables: vegetables, meat: meat, successMsg : 'Login Sucessfully..' });
  // res.render('profile_data', { user : result  });
    }
else{
  
  res.render('Customer_SignUp_Login_Page', { successMsg:'', errorMsg: 'Phone number and Password does not match.. ' });
}
})
.catch(err=>{
res.send(`some error : ${err}`);
})  
});



app.post('/customer_forgot', (req, res) => {

const {  phonenumber2,password2 } = req.body;


// const collection = db.collection('sales');
con.collection('Customer_login')
.findOne( { phonenumber :  phonenumber2  })
.then(result=>{
if(result){
  con.collection('Customer_login')
  .updateOne({phonenumber :  phonenumber2  },{$set:{password : password2 }})
  .then(result1=>{
      
      if(result1){
         
          res.render('Customer_SignUp_Login_Page', {errorMsg:'' ,successMsg: 'Password Updated....'  }); 
      }
  })
    }

else{
  
  res.render('Customer_SignUp_Login_Page', { successMsg :'',errorMsg: 'Phone number is not match.... ' });
}
})
.catch(err=>{
res.send(`some error : ${err}`);
})  
});



app.post('/customer_update', (req, res) => {

const {   user5, phonenumber5, email5 ,State_Name5 ,Pincode5,Address5 } = req.body;

con.collection('Customer_login')
.findOne( { phonenumber :  phonenumber5 })
.then(result=>{
if(result){
  con.collection('Customer_login')
  .updateOne({phonenumber :  phonenumber5  },{$set:{user : user5,email:email5,State_Name:State_Name5,Pincode:Pincode5,Address:Address5 }})
  .then(result=>{
      
      if(result){
         con.collection('Customer_login')
         .findOne({phonenumber :  phonenumber5 })
         .then(async result=>{
         
          if(result){
            const fruits=[]
            const vegetables = []
            const meat = []
            await con.collection('farmer_product').find({product_type: "Fruit"}).sort({product_mrp:1})
            .forEach(produ=>{
                fruits.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })
          
            await con.collection('farmer_product').find({product_type: "Vegetable"}).sort({product_mrp:1})
            .forEach(produ=>{
                vegetables.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })
          
            await con.collection('farmer_product').find({product_type: "Dairy/Meat"}).sort({product_mrp:1})
            .forEach(produ=>{
                meat.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })
          
              res.render('Customer_Home_Page', { user : result ,fruits:fruits,vegetables: vegetables, meat: meat, successMsg : 'Update Sucessfully'  });
          }
         })
          
      }
  })
    }

else{
  
  console.log("Done")
}
})
.catch(err=>{
res.send(`some error : ${err}`);
})  
});


app.post('/customer_uploadimage', (req, res) => {

const { phone6,imageurl  } = req.body;

con.collection('Customer_login')
.findOne( { phonenumber :  phone6 })
.then(result=>{
if(result){
  con.collection('Customer_login')
  .updateOne({phonenumber :  phone6  },{$set:{imageurl: imageurl}})
  .then(result=>{
      
      if(result){
         con.collection('Customer_login')
         .findOne({phonenumber : phone6 })
         .then( async result=>{
         
          if(result){
            const fruits=[]
            const vegetables = []
            const meat = []
            await con.collection('farmer_product').find({product_type: "Fruit"}).sort({product_mrp:1})
            .forEach(produ=>{
                fruits.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })

            await con.collection('farmer_product').find({product_type: "Vegetable"}).sort({product_mrp:1})
            .forEach(produ=>{
                vegetables.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })

            await con.collection('farmer_product').find({product_type: "Dairy/Meat"}).sort({product_mrp:1}).sort({product_mrp:1})
            .forEach(produ=>{
                meat.push(produ);
            })
            .then(()=>{
                console.log('sucessfully');
            }).catch((err)=>{
                console.log(`Some Error : ${err}`);
            })

              res.render('Customer_Home_Page', { user : result ,fruits:fruits,vegetables: vegetables, meat: meat, successMsg : 'Update Sucessfully'  });
          }
         })
          
      }
  })
    }

else{
  
  console.log("Done")
}
})
.catch(err=>{
res.send(`some error : ${err}`);
})  
});


app.post("/Insert_SA_Product_Data", upload.array("files"), (req, res) => {
  res.json({ message: "File(s) uploaded successfully" });
  let a = req.files;
  //console.log(a[0]['path']);
  
  let b = a[0]['path'];
  let pathh = '';
  for (let i = 0; i<b.length; i++)
    { // console.log(b[i]);
      if (b[i] == '\\') { pathh = pathh + '/'; }
      else { pathh = pathh + b[i]; }
    }
  
  //console.log(pathh);
  var stream = fs.createReadStream(pathh);
  
  csv.parseStream(stream, {headers : true}).on("data", function(data){
    
      var Result = {'product_name': data['product_name'], 
      'product_img' : data['product_img'],
      'product_mrp' : data['product_mrp'],
      'product_selling_price' : data['product_selling_price'],
      'quantity_available' : data['quantity_available'],
      'offer' : data['offer'],
      'delvary_charges' : data['delvary_charges'],
      'product_type' : data['product_type'],
      'discription' : data['discription'] 
      };
    
          con.collection('sales_product').insertOne(Result).then((result) => {
            res.status(201).send(result);
          }).catch((err) => {
            //console.log(err);
         });

      }).on("end", function(){
        console.log("CSV Data Successfully Inserted into Sales Agent Product Data Database.");
       });
  
  });


  app.post('/Farmer_Advertise', (req, res) => {

    const {  phonenumber1,password1 } = req.body;
    

    // const collection = db.collection('sales');
    con.collection('farmer_login')
    .findOne( { phonenumber :  phonenumber1 , password: password1 })
    
    .then(async result=>{
      if(result){
        let x1= await con.collection('farmer_login').findOne({phonenumber:phonenumber1})

        res.render('Farmer_Advertise_Page', { user : x1 , successMsg : 'Login Sucessfully..'  });
        // res.render('profile_data', { user : result  });
          }
      else{
        
        res.render('Farmer_Advertise_Login_Page', { successMsg:'', errorMsg: 'Phone number and Password does not match.. ' });
      }
  })
  .catch(err=>{
      res.send(`some error : ${err}`);
  })  
  });

  app.post("/Insert_Farmer_Product_Data", upload.array("files"), (req, res) => {
    res.json({ message: "File(s) uploaded successfully" });
    let a = req.files;
    //console.log(a[0]['path']);
    
    let b = a[0]['path'];
    let pathh = '';
    for (let i = 0; i<b.length; i++)
      { // console.log(b[i]);
        if (b[i] == '\\') { pathh = pathh + '/'; }
        else { pathh = pathh + b[i]; }
      }
    
    //console.log(pathh);
    var stream = fs.createReadStream(pathh);
    
    csv.parseStream(stream, {headers : true}).on("data", function(data){
      
        var Result = {'product_name': data['product_name'], 
        'product_img' : data['product_img'],
        'product_mrp' : data['product_mrp'],
        'product_selling_price' : data['product_selling_price'],
        'quantity_available' : data['quantity_available'],
        'offer' : data['offer'],
        'delvary_charges' : data['delvary_charges'],
        'product_type' : data['product_type'],
        'discription' : data['discription'] 
        };
      
            con.collection('farmer_product').insertOne(Result).then((result) => {
              res.status(201).send(result);
            }).catch((err) => {
              //console.log(err);
           });
  
        }).on("end", function(){
          console.log("CSV Data Successfully Inserted into Farmer Product Data Database.");
         });
    
    });

    app.post('/Farmer_Product_Form_1', async (req, res) => {


      while (1)
      { x = "SA" + random_number();
        const result = await con.collection('farmer_product').find().bufferedCount();
        if (result == 0)
          { break; }
      }
  
      const Id2 = x;
  
     const { product_name, product_img, product_mrp ,product_selling_price ,quantity_available ,offer,delvary_charges,product_type,discription,phoneNumber} = req.body;
  // const collection = db.collection('sales');
  
        con.collection('farmer_product')
        .insertOne({ Id2, product_name, product_img, product_mrp ,product_selling_price ,quantity_available ,offer,delvary_charges,product_type,discription ,phoneNumber})
       
        .then(async resu=>{
         
          let x1= await con.collection('farmer_login').findOne({phonenumber:phoneNumber})
          if(resu){
          res.render('Farmer_Advertise_Page', { user:x1, successMsg : 'upload Sucessfully..'  });
          }
          
         })
  
              .catch(err=>{
              res.send(`some error : ${err}`);
              })  
  
    });
  

  app.listen(3000,()=>{
              console.log("port is running on 3000")
})