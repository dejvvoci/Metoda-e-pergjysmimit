document.getElementById("actionBtn").addEventListener("click", function(event){
    event.preventDefault();
    let funksioniInput = document.getElementById('funksioni').value;
    let segmentInput = document.getElementById('segment').value.split(',').map(Number);
    let tolerancaInput = parseFloat(document.getElementById('toleranca').value);

    // Përgjysmo funksionin
    let rezultati = përgjysmo(segmentInput[0], segmentInput[1], funksioniInput, tolerancaInput);
    
    // Shfaq rezultatin
    var form = document.querySelector(".form");
    form.classList.add("hidden");
    let outputDiv = document.getElementById('output');
    outputDiv.appendChild(rezultati);
    var parent = form.parentNode;
    parent.insertBefore(outputDiv, parent.firstChild);
});

function përgjysmo(a, b, funksioni, toleranca) {
    let str = funksioni.toString();
    if(str.includes('ln(')){
        str = str.replace('ln(', 'Math.log(');
    }
    if(str.includes('sqrt(')){
        str = str.replace('sqrt(', 'Math.sqrt(');
    }
    if(str.includes('sin(')){
        str = str.replace('sin(', 'Math.sin(');
    }
    if(str.includes('cos(')){
        str = str.replace('cos(', 'Math.cos(');
    }
    if(str.includes('log10(')){
        str = str.replace('log10(', 'Math.log10(');
    }
    if(str.includes('exp(')){
        str = str.replace('exp(', 'Math.exp(');
    }
    funksioni = new Function('x', 'return ' + str);
   
    console.log(`${a}, ${b}`);
    console.log(funksioni);
    
    let fa = funksioni(a);
    let fb = funksioni(b);
    
    console.log(`${fa}, ${fb}`);

    let output = document.createElement('div');
    var header = document.createElement("h2");
    if (fa * fb >= 0) {
        header.textContent = "Metoda e përgjysmimit nuk garanton konvergjencë në këtë interval. f(a) dhe f(b) kane shenja te njejta.";
        output.appendChild(header);
        return output;
    }

    header.textContent = "Sekuenca e hapave";
    output.appendChild(header);
    let count = 1;

    let c;
    while (Math.abs(b - a) > toleranca) {
        var par = document.createElement("p");
        c = (a + b) / 2;
        let fc = funksioni(c);
        if (fa * fc < 0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
        par.innerHTML = `Hapi ${count}: ${c}  <br>`;
        output.appendChild(par);
        count++;
    }

    console.log(output);
    return output;
}
