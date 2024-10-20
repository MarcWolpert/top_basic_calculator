function add(addend1,addend2){
    return Math.round(((addend1+addend2)*100)) / 100;
}

function multiply(factor1,factor2){
    return Math.round(factor1*factor2*100) / 100;
}

function subtract(minuend,subtrahend){
    return Math.round((minuend-subtrahend)*100) / 100;
}

function divide(dividend,divisor){
    return Math.round(dividend/divisor*100) / 100;
}

function parse(input){
    input.split()
    const inputs=input.split(/\D/,2);
    const symbol=input[input.match(/\D/).index];
    return inputs.concat(symbol);
}
function operate(inputs){
    const num1=Number(inputs[0].trim());
    const num2=Number(inputs[1].trim());
    const operator=inputs[2];

    switch (operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '*':
            return multiply(num1,num2);
            break;
        case '/':
            return divide(num1,num2);
            break;
        default:
            console.log(`No operators matched '${operator}'`);
            break;
    }
}

console.log(operate(parse("152934+148182")));


const body = document.querySelector('body');
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.justifyContent = 'center';
body.style.alignItems = 'center';
body.style.height = '100vh'; // Ensures full vertical height
body.style.margin = '0'; // Removes default margins

const buttonText=[
    'AC','+/-','%','/',
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
]
let buttonIterator=0;

const rows=document.querySelector('.buttons');
rows.style.backgroundColor='black';
rows.style['display']='flex';
rows.style['flex-direction']='column';
rows.style['justify-content']='center';
rows.style['align-items']='center';
const baseWidth=200;
let row=0;
for (let i=0; i<6; i++){
    row=document.querySelector(`#row${i+1}`);
    //row.style["display"]='flex';
    // row.style["flex-direction"]='row';
    // row.style['justify-content']='center';
    // row.style['align-items']='center';
    if (i===0){
        const p=document.createElement('p');
        p.style.height='160px';
        p.style.width=`${baseWidth*4}`;
        p.backgroundColor='light grey';
        p.textAlign='right';
        row.appendChild(p);
    } else if (i===5){
        button1=document.createElement('button');
        button1.style.height='160px';
        button1.style.width=`${baseWidth*2}px`;
        button2=document.createElement('button')
        button2.style.height='160px';
        button2.style.width=`${baseWidth}px`
        button3=document.createElement('button')
        button3.style.height='160px';
        button3.style.width=`${baseWidth}px`
        button1.textContent=`${buttonText[buttonIterator++]}`
        button2.textContent=`${buttonText[buttonIterator++]}`
        button3.textContent=`${buttonText[buttonIterator++]}`

        row.append(button1);
        row.append(button2);
        row.append(button3);
    } else {
        if (i==1){
            for (let j=0; j<3; j++){
                let button=document.createElement('button');
                button.style.backgroundColor='blue';
                button.textContent=`${buttonText[buttonIterator++]}`
                button.style.height='160px';
                button.style.width=`${baseWidth}px`
                row.appendChild(button);
            }
            let button=document.createElement('button');
            button.style.backgroundColor="orange";
            button.textContent=`${buttonText[buttonIterator++]}`
            button.style.height='160px';
            button.style.width=`${baseWidth}px`
            row.appendChild(button);
        } else if (i>1){
            for (let j=0; j<3; j++){
                let button=document.createElement('button');
                button.style.backgroundColor='grey';
                button.textContent=`${buttonText[buttonIterator++]}`
                button.style.height='160px';
                button.style.width=`${baseWidth}px`
                row.appendChild(button);
            }
            let button=document.createElement('button');
            button.textContent=`${buttonText[buttonIterator++]}`
            button.style.height='160px';
            button.style.width=`${baseWidth}px`
            button.style.backgroundColor="orange";
            row.appendChild(button);
        }
    }
    rows.appendChild(row);
    row=[]
}

