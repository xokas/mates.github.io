let gLevel = 2;

$(document).ready(function(){
	console.log("matemacias begin!");
	//document.querySelectorAll('[contenteditable=true]').get(0).focus();
	//$(document).contents().find("div[contenteditable='true']").first().focus();

	$("#header").load("./header.html");
	$("#sidenavAccordion").load("./sidenavAccordion.html");

	let location = window.location.href;
	console.log(location);
	if(location.includes('sumas_sin_llevadas.html')){
		sumaSinLlevadas(1);
	}else if(location.includes('sumas_con_llevadas.html')){
		sumaConLlevadas(1);
	}else if(location.includes('sumas_infantil.html')){
		sumaSimple(1);
	}

	reverseTextResult();
});

function sumaSimple(i){
	let id = "#suma" + i;
	let sumando1 = 0;
	let sumando2 = 0;
	let diff = Math.pow(10, 1);
	let limitInf = diff / 10;
	console.log(diff + " " + limitInf);
	clean(id);
	
	do{
		sumando1 = Math.floor(Math.random() * diff);
	}while(sumando1 == 0 || sumando1 < limitInf);
	do{
		sumando2 = Math.floor(Math.random() * diff);
	}while(sumando2 == 0 || sumando2 < limitInf);

	$(id + " [name='sumando1']").text(sumando1);
	$(id + " [name='sumando2']").text(sumando2);
	$(id + " [name='result']").text("");
	$(id + " [name='redo']").prop("disabled", true);
	$(id + " [name='result']").focus();
}

function sumaConLlevadas(i){
	let id = "#suma" + i;
	let sumando1 = 0;
	let sumando2 = 0;
	let diff = Math.pow(10, gLevel);
	let limitInf = diff / 10;
	console.log(diff + " " + limitInf);
	clean(id);
	
	do{

		let unidad1 = 0;
		let unidad2 = 0;
		do{
			unidad1 = Math.floor(Math.random() * 10);
			unidad2 = Math.floor(Math.random() * 10);
			console.log(unidad1 + unidad2);
		}while(unidad1 == 0 || unidad2 == 0 || unidad1 + unidad2 < 10);
		sumando1 = sumando1 * 10 + unidad1;
		sumando2 = sumando2 * 10 + unidad2;
	}while(sumando1.toString().length < gLevel);

	$(id + " [name='sumando1']").text(sumando1);
	$(id + " [name='sumando2']").text(sumando2);
	$(id + " [name='result']").text("");
	$(id + " [name='redo']").prop("disabled", true);
	$(id + " [name='result']").focus();
}

function sumaSinLlevadas(i){
	let id = "#suma" + i;
	let sumando1 = 0;
	let sumando2 = 0;
	let diff = Math.pow(10, gLevel);
	let limitInf = diff / 10;
	console.log(diff + " " + limitInf);
	clean(id);
	do{

		let unidad1 = 0;
		let unidad2 = 0;
		do{
			unidad1 = Math.floor(Math.random() * 10);
			unidad2 = Math.floor(Math.random() * 10);
			console.log(unidad1 + unidad2);
		}while(unidad1 == 0 || unidad2 == 0 || unidad1 + unidad2 >= 10);
		sumando1 = sumando1 * 10 + unidad1;
		sumando2 = sumando2 * 10 + unidad2;
	}while(sumando1.toString().length < gLevel);

	$(id + " [name='sumando1']").text(sumando1);
	$(id + " [name='sumando2']").text(sumando2);
	$(id + " [name='result']").text("");
	$(id + " [name='redo']").prop("disabled", true);
	$(id + " [name='result']").focus();
}

function validar(i){
	let id = "#suma" + i;
	let sumando1 = parseInt($(id + " [name='sumando1']").html());
	let sumando2 = parseInt($(id + " [name='sumando2']").html())
	let result = parseInt($(id + " [name='result']").html())
	if ((sumando1 + sumando2) == result) {
		success(id);
	} else {
		error(id);
	}
}

function clean(id){
	$(id + " [name='result']").parent().removeClass("bg-success");
	$(id + " [name='result']").parent().removeClass("bg-danger");
	$(id + " [name='success']").addClass("d-none");
	$(id + " [name='error']").addClass("d-none");
}

function error(id){
	$(id + " [name='result']").parent().removeClass("bg-success");
	$(id + " [name='result']").parent().addClass("bg-danger");
	$(id + " [name='success']").addClass("d-none");
	$(id + " [name='error']").removeClass("d-none");
	$(id + " [name='redo']").prop("disabled", true);
	$(id + " [name='result']").focus();
}

function success(id){
	$(id + " [name='result']").parent().removeClass("bg-danger");
	$(id + " [name='result']").parent().addClass("bg-success");
	$(id + " [name='success']").removeClass("d-none");
	$(id + " [name='error']").addClass("d-none");
	$(id + " [name='redo']").prop("disabled", false);
}

function reverseTextResult() {
	/**
	 * Movemos el cursor a la izquierda para imitar la forma de escribir de un niño al resolver las cuentas
	 */ 
    $("div [name='result']").bind('keypress', function(e) {
    	let range = document.createRange();
	    let sel = window.getSelection();
	    if(this.childNodes[0]){
		   	range.setStart(this.childNodes[0], 0);
		   	range.collapse(true);
	    	sel.removeAllRanges();
	    	sel.addRange(range);
	    }
    });
    /**
	 * Movemos el cursor a la derecha para posiciones el cursor correctamente después de borrar
	 */ 
    $("div [name='result']").bind('keyup', function(e) {
    	if(e.keyCode == 8) {
	    	let range = document.createRange();
		    let sel = window.getSelection();
		    if(this.childNodes[0]){
		    	console.log(this.childNodes[0])
			   	range.setStart(this.childNodes[0], 1);
			   	range.collapse(true);
		    	sel.removeAllRanges();
		    	sel.addRange(range);
		    }
		}
    });
}
