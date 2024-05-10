document.getElementById("actionBtn").addEventListener("click", function(event){
    event.preventDefault();
    let funksioniInput = document.getElementById('funksioni').value;
    let intervaliInput = document.getElementById('intervali').value.split(',').map(Number);
    let tolerancaInput = parseFloat(document.getElementById('toleranca').value);

    // Përgjysmo funksionin
    let rezultati = përgjysmo(intervaliInput[0], intervaliInput[1], funksioniInput, tolerancaInput);
    
    // Shfaq rezultatin
    var form = document.querySelector(".form");
    form.classList.add("hidden");
    let outputDiv = document.getElementById('output');
    outputDiv.appendChild(rezultati);
    var parent = form.parentNode;
    parent.insertBefore(outputDiv, parent.firstChild);
});

function përgjysmo(a, b, funksioni, toleranca) {
    // Përpunimi i shprehjes së dhënë nga përdoruesi në një funksion të vërtetë
    let str = funksioni.toString();
    let regex = /(\w+)\*\*(\d+)|ln\((\w+)\)/; // Regex për të gjetur shprehjet e tipit "x**n" ose "ln(x)"
    let matches = funksioni.match(regex); // Gjejmë shprehjen "x**n" ose "ln(x)"
    // if (matches) {
    //     if (matches[1]) { // Nëse është një shprehje e tipit "x**n"
    //         let variabla = matches[1]; // variabla është "x" në rastin tonë
    //         let eksponenti = parseInt(matches[2]); // eksponenti është "2" në rastin tonë

    //         // Përshtatim i shprehjes për t'u përdorur si funksion në JavaScript
    //         funksioni = function(x) {
    //             return Math.pow(x, eksponenti) - 4;
    //         };
    //     } else 
    // if (matches[3]) { // Nëse është një shprehje e tipit "ln(x)"
    //         let variabla = matches[3]; // variabla është "x" në rastin tonë

    //         // Përshtatim i shprehjes për t'u përdorur si funksion në JavaScript
    //         funksioni = new Function('x', 'return ' + funksioni);
    //     // }
    // } else {
        // Në rast se nuk gjendet shprehje e caktuar, përdorim shprehjen siç është
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
    // }
    console.log(`${a}, ${b}`);
    console.log(funksioni);
    
    let fa = funksioni(a);
    let fb = funksioni(b);
    
    console.log(`${fa}, ${fb}`);
    // if (fa * fb >= 0) {
    //     console.log("Metoda e përgjysmimit nuk garanton konvergjencë në këtë interval.");
    //     return null;
    // }

        let output = document.createElement('div');
        var header = document.createElement("h2");
        header.textContent = "Sequence of steps";
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
        par.innerHTML = `Step ${count}: ${c}  <br>`;
        output.appendChild(par);
        count++;
    }

    console.log(output);
    return output;
}
