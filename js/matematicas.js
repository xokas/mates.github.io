let gLevel = 2;
let gResult = [];

$(document).ready(function(){
	console.log("matemacias begin!");
	//document.querySelectorAll('[contenteditable=true]').get(0).focus();
	$(document).contents().find("div[contenteditable='true']").first().focus();
	for(let i = 1;i < 5;i++){
		gResult[i] = 0;
		suma(i);
	}
});

function suma(i){
	let sumando1 = 0;
	let sumando2 = 0;
	let diff = Math.pow(10, gLevel);
	let limitInf = diff / 10;
	console.log(diff + " " + limitInf);
	clean(i);
	let id = "#suma" + i;
	
	do{
		sumando1 = Math.floor(Math.random() * diff);
	}while(sumando1 == 0 || sumando1 < limitInf);
	do{
		sumando2 = Math.floor(Math.random() * diff);
	}while(sumando2 == 0 || sumando2 < limitInf);

	$(id + " [name='sumando1']").text(sumando1);
	$(id + " [name='sumando2']").text(sumando2);
	$(id + " [name='result']").text("");

	gResult[i] = sumando1 + sumando2;
}

function validar(i){
	let id = "#suma" + i;
	console.log(gResult[i]);
	console.log(parseInt($(id + " [name='result']").html()));
	if (gResult[i] == parseInt($(id + " [name='result']").html())) {
		success(i);
	} else {
		error(i);
	}
}

function clean(i){
	let id = "#suma" + i;
	$(id + " [name='result']").parent().removeClass("bg-success");
	$(id + " [name='result']").parent().removeClass("bg-danger");
	$(id + " [name='success']").addClass("d-none");
	$(id + " [name='error']").addClass("d-none");
}

function error(i){
	let id = "#suma" + i;
	$(id + " [name='result']").parent().removeClass("bg-success");
	$(id + " [name='result']").parent().addClass("bg-danger");
	$(id + " [name='success']").addClass("d-none");
	$(id + " [name='error']").removeClass("d-none");
}

function success(i){
	let id = "#suma" + i;
	$(id + " [name='result']").parent().removeClass("bg-danger");
	$(id + " [name='result']").parent().addClass("bg-success");
	$(id + " [name='success']").removeClass("d-none");
	$(id + " [name='error']").addClass("d-none");
}
