class CalcController {

    constructor() {
        
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");// _colocando como atributos privados do nosso objeto constructor
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonEvents();
     
    }

    initialize() { // Método

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
            
            element.addEventListener(event, fn, false);
        
        });
    }

    clearAll(){

        this._operation = []; // vai limpar os números da calculadora, e será um array vazio novamente 
    
    }

    clearEntry(){

        this._operation.pop(); // vai remover o último elemento(número) digitado no array

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1] // Desta forma, este método faz com que sempre retorne a última posição do array, não importa quantos elementos estão presentes nele

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {

       return (['+', '-', '*', '%', '/'].indexOf(value) > -1) 

    }

    addOperation(value) {

        console.log('A', isNaN(this.getLastOperation()))

        if (isNaN(this.getLastOperation())) {
            //String:


            if (this.isOperator(value)) {
                //Trocar o operador
                this.setLastOperation(value); //Meu último item vai ser igual ao operador do momento

            } else if (isNaN(value)) { 
                
                //Outra coisa
                console.log(value)

            } else {

                this._operation.push(value);

            }

        } else {
            //Number:
            let newValue = this.getLastOperation().toString() + value.toString(); //caso o último elemento seja um número, esse é convertido em string, e concatenado com o próximo
            this.setLastOperation(parseInt(newValue));
        }


        console.log(this._operation)
    }

    setError(){

        this.displayCalc = "Error";

    }

    execBtn(value){

        switch (value) {
            
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');   
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':

                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
                
            default:
                this.setError();
                break;
    
        }

    }

    initButtonEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // pegue todas as tags g, que são filhas do id#buttons, e todas as tags g, que são filhas do id#parts -> consulta no plural(pega todos os elementos)

        //buttons é um nodelist, onde paraCada(forEach) elemento percorrido, as linhas de código serão executadas
        buttons.forEach((btn, index) => { //se vc quiser colocar dois parâmetros, coloque entre parênteses

            this.addEventListenerAll(btn, "click drag", e => {// (click)Um evento; drag(outro evento)

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);

            }); //Como Criar Múltiplos Eventos

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer"; 

            });

        });

    }

    setDisplayDateTime(){
        
        this.displayDate = this.currentDate.toLocaleDateString(this._locale , { day: "2-digit", month: "short", year: "numeric" });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value; 
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}