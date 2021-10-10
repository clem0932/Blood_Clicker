var clicks = 0;

var numb_seringue = 0;
var price_seringue = 100;

var price_multiplier = 10;
var numb_multiplier = 0;

var per_second = 0;

let unities = [' Millilitre',' Litre',' Mega Litre',' Giga Litre']

imgObj = document.getElementById('blood');
imgObj.style.position= 'relative';
var init_left = 35
imgObj.style.left = init_left + 'px';


function animation() {
	var dec = 10
	if (parseInt(imgObj.style.left) == init_left + dec){
		imgObj.style.left = parseInt(imgObj.style.left) - dec + 'px';
	} else {
		imgObj.style.left = parseInt(imgObj.style.left) + dec + 'px';
	}
	if (parseInt(imgObj.style.width) == 250){
		imgObj.style.width = parseInt(imgObj.style.width) - 2*dec + 'px';
		imgObj.style.height = parseInt(imgObj.style.height) - 2*dec + 'px';
	} else {
		imgObj.style.width = parseInt(imgObj.style.width) + 2*dec + 'px';
		imgObj.style.height = parseInt(imgObj.style.height) + 2*dec + 'px';
	}
}


function increment_click(){
	animation()
	clicks += Math.pow(2,numb_multiplier);
	//amount.innerHTML = parseInt(clicks);
}

function increment_multiplier(){
	if (clicks >= price_multiplier){
		clicks -= price_multiplier;
		//amount.innerHTML = parseInt(clicks);

		numb_multiplier += 1;
		str_multiplier.innerHTML = Math.pow(2,numb_multiplier);

		price_multiplier *= 2;
		str_price_multiplier.innerHTML = price_multiplier;
	}
}

function increment_seringue(){
	if (clicks >= price_seringue){
		numb_seringue += 1;
		str_numb_seringue.innerHTML = numb_seringue;

		clicks -= price_seringue;
		//amount.innerHTML = parseInt(clicks);

		price_seringue *= Math.pow(2,numb_seringue);
		str_price_seringue.innerHTML = price_seringue;
	}
}

function per_second_update() {
	per_second = (Math.pow(2,numb_seringue)-1);
	str_per_second.innerHTML = parseInt(per_second);
}

function click_update(){
	clicks += per_second/10;

	var n = parseInt(clicks).toString().length
	if (n > 12 && document.getElementById('unitie').value != unities[3]){
		var divider = 1000000000000;
		var i = 3;
	} else if (n > 9 && document.getElementById('unitie').value != unities[2]) {
		var divider = 1000000000;
		var i = 2;
	} else if (n > 3 && document.getElementById('unitie').value != unities[1]) {
		var divider = 1000;
		var i = 1;
	} else if (n <= 3 && document.getElementById('unitie').value != unities[0]) {
		var divider = 1;
		var i = 0;
	}
	//on arrondie à 1 chiffre après la virgule
	amount.innerHTML = parseInt((clicks/divider)*10) / 10;
	unitie.innerHTML = unities[i];
	
}

function button_update() {
	if (clicks < price_seringue){
		document.getElementById("pay_seringue").disabled = true;
	} else {
		document.getElementById("pay_seringue").disabled = false;
	}
	if (clicks < price_multiplier){
		document.getElementById("pay_multiplier").disabled = true;
	} else {
		document.getElementById("pay_multiplier").disabled = false;
	}
}

function main_loop(){
	
	per_second_update();
	
	click_update();	

	button_update();
}


setInterval(main_loop,100);

