const passwordInput2 = document.querySelector("#pass")
const eye = document.querySelector("#eye")
eye.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash")
  const type = passwordInput2.getAttribute("type") === "password" ? "text" : "password"
  passwordInput2.setAttribute("type", type)
})
const passwordInput1 = document.querySelector("#pass1")
const eye1 = document.querySelector("#eye1")
eye1.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash")
  const type = passwordInput1.getAttribute("type") === "password" ? "text" : "password"
  passwordInput1.setAttribute("type", type)
})
const passwordInput3 = document.querySelector("#pass2")
const eye2 = document.querySelector("#eye2")
eye2.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash")
  const type = passwordInput3.getAttribute("type") === "password" ? "text" : "password"
  passwordInput3.setAttribute("type", type)
})

const x1=document.getElementsByClassName('main23456')[0];
const x2=document.getElementsByClassName('main1234')[0];
const x5=document.getElementsByClassName('forgot')[0];

const x3=document.getElementById('login1');
const x4=document.getElementById('signup1');
const x6=document.getElementById('forgot1');

x3.addEventListener('click',fun)
x4.addEventListener('click',fun2)
x6.addEventListener('click',fun3)



function fun(){
    
   x1.style.display='inline';
    x2.style.display='none';
    x4.style.display='inline'
    x3.style.display='none';

}
function fun2(){
    x2.style.display='block';
    x1.style.display='none';
    x4.style.display='none'
    x3.style.display='block';
}
function fun3(){
  x4.style.display='none'
  x3.style.display='none';
  x1.style.display='none';
  x2.style.display='none';
  x5.style.display='inline'

}



var pattern1 = /^[A-Za-z][A-Za-z0-9_]{2,20}$/;
function user_validation(){
  var x=document.getElementById('name');
  if(x.value=='' || !pattern1.test(x.value)){
    alert('username should start with an alphabet and All other characters can be alphabets, numbers or an underscore ');
    return false;
  }
  else{
    return true;
  }
}
function email_validation(){
  var y=document.getElementById('email');
  if(y.value=='' ){
    alert('please use "@');
    return false; 
  }
  else{
    return true;
  }
}
pattern3=/^[1-9][0-9]{9}$/;
function phonenumber_validation(){
  var p=document.getElementById('phone');
  if(p.value=='' || !pattern3.test(p.value)){
    alert('Please enter the correct phone number');
    return false;
    
  }
  else{
    return true;
  }
}



 var pattern5=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
function pass_validation(){
  var z=document.getElementById('pass');
  if(z.value==''||!pattern5.test(z.value) ){
    alert('Minimum six characters, at least one letter, one number and one special character:');
    return false;
    
  }
  else{
    return true;
  }
}

pattern6=/^[A-Za-z][A-Za-z\s]+$/;
function state_validation(){
  var st=document.getElementById('State_Name');
  if(st.value=='' || !pattern6.test(st.value)){
    alert('Enter valid state name..');
    return false;
    
  }
  else{
    return true;
  }
}

pattern7=/^[1-9][0-9]{5}$/;
function pincode_validation(){
  var pi=document.getElementById('Pincode');
  if(pi.value=='' || !pattern7.test(pi.value)){
    alert('Enter vaild pincode......');
    return false;
    
  }
  else{
    return true;
  }
}





var s=document.getElementById('signup_form');
s.addEventListener('submit',(e)=>{
  if(user_validation()==false || email_validation()==false || pass_validation()==false || phonenumber_validation()==false || state_validation()==false || pincode_validation()==false){
    e.preventDefault();
  }
  else{
    console.log("login sucessfully");
  }
})

var pattern11=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
function pass_validation1(){
  var z=document.getElementById('pass2');
  if(z.value==''||!pattern11.test(z.value) ){
    alert('Minimum six characters, at least one letter, one number and one special character:');
    return false;
    
  }
  else{
    return true;
  }
}

var f=document.getElementById('forgot_form');
f.addEventListener('submit',(e)=>{
  if( pass_validation1()==false ){
    e.preventDefault();
  }
  else{
    console.log("login sucessfully");
  }
})