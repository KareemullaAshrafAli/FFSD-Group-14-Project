

// State Name Validation

// Product Name Validation
console.log("hi")
function product_name()
{
var x = document.getElementById('Product_Name').value;

var name = /^[A-Za-z0-9_\s]+$/;

if ((name.test(x)) && (x.length > 2) && (x.length <= 30))
	{ return true;
	}
else 
{
    alert('Product Name is in wrong format. Please enter a valid product name (min length is 2 characters and max length is 30 characters) '); 
	
return false;
}

}








// Quantity Validation

function quantity()
{
var x = document.getElementById('Quantity').value;

var q = /^[1-9][0-9]*$/;

if ((q.test(x)) && (x >= 1))
	{ //document.getElementById("wrong_quantity").style.visibility = "hidden";
		
	  return true; 
	}
else 
{alert('Quantity atleast should be 1');
return false;
}

}








// Selling Price Validation

function selling_price()
{
var x = document.getElementById('Selling_Price').value;
var y = document.getElementById('Selling_Price');

var s = /^[1-9][0-9]*$/;

if (s.test(x)) 
	{ // document.getElementById("wrong_selling_price").style.visibility = "hidden";
		
	  return true; 
	}
else 
{alert('Selling Price in Wrong Format. Make sure it is a positive number.');
return false;
}

}











// MRP Validation

function mrp()
{
var x = document.getElementById('MRP').value;
var y = document.getElementById('MRP');

var m = /^[1-9][0-9]*$/;

if (m.test(x)) 
	{ // document.getElementById("wrong_mrp").style.visibility = "hidden"; 
		return true; 
	}
else 
{alert('Maximum Retail Price is in Wrong Format. Make sure it is a positive number.');
	  
return false;
}

}









// Offer Validation


function offer()
{
var x = document.getElementById('Offer').value;
var y = document.getElementById('Offer');

var offerr = /^[1-9][0-9]{0,1}$/;

if ((offerr.test(x)) && (x > 0) && (x < 100)) 
	{ // document.getElementById("wrong_offer").style.visibility = "hidden"; 
		 return true; 
	}
else 
{
alert('Offer % in Wrong Format. Make sure there are no "%" Symbols and it is a number between 0 and 100.');
	 
return false;
}

}








// Delivery Charges Validation

function delivery_charges()
{
var x = document.getElementById('Delivery_Charges').value;
var y = document.getElementById('Delivery_Charges');

var d = /^[1-9][0-9]*$/;

if (d.test(x)) 
	{ // document.getElementById("wrong_delivery_charges").style.visibility = "hidden";
		return true; 
	}
else 
{alert('Delivery Charges is in Wrong Format. Make sure it is a positive number.');
	  
return false;
}

}










function myfunc()
{
	let flag = 0;
	/*
	product_name();
	quantity();
	selling_price();
	mrp();
	offer();
	delivery_charges();
*/

    console.log('HELLO');
	if (!product_name())
		{ //document.getElementById("wrong_product_name").style.visibility = "visible";
		  flag = 1;
		}
	
	if (!quantity())
		{ //document.getElementById("wrong_quantity").style.visibility = "visible";
		  flag = 1;
		}
	
	if (!selling_price())
		{ //document.getElementById("wrong_selling_price").style.visibility = "visible";
		  flag = 1;
		}
	
	if (!mrp())
		{ //document.getElementById("wrong_mrp").style.visibility = "visible";
		  flag = 1;
		}
	
	if (!offer())
		{ //document.getElementById("wrong_offer").style.visibility = "visible";
		  flag = 1;
		}
	
	if (!delivery_charges())
		{ //document.getElementById("wrong_delivery_charges").style.visibility = "visible";
		  flag = 1;
		}


	if (flag == 0)
		{ document.getElementById('form_id_1').submit();
		  return true;
		}


}

