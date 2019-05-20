            
function drawScenarios(potenzial) { 

            // event listener für das Anwählen des 1. Radio Buttons
            if(document.getElementById("scenario1").checked) {
                
            // zeichne Szenario 1 mit Abstufungen in Farben
            if (parseInt(potenzial.Scenario1) > 100) {
                return "#cc6600"
            }
            
            if (parseInt(potenzial[0].Scenario1) > 80) {
                return "#ff8000"
            }
            if (parseInt(potenzial[0].Scenario1) > 60) { 
                return "#ff9933"
            }
            if (parseInt(potenzial[0].Scenario1) > 40) { 
                return "#ffb366"
            }
            if (parseInt(potenzial[0].Scenario1) > 20) { 
                return "#ffcc99"
            }

            if (parseInt(potenzial[0].Scenario1) > 0) {
                return "#ffe6cc"
            }
       }
            // zeichne Szenario 2 (in Originaldaten Szenario 3) mit Abstufungen in denselben Farben

            if (parseInt(potenzial.Scenario3) > 100) {
                return "#cc6600"
            }
            
            if (parseInt(potenzial[0].Scenario3) > 80) {
                return "#ff8000"
            }
            if (parseInt(potenzial[0].Scenario3) > 60) { 
                return "#ff9933"
            }
            
            if (parseInt(potenzial[0].Scenario3) > 40) { 
                return "#ffb366"
            }
            
            if (parseInt(potenzial[0].Scenario3) > 20) { 
                return "#ffcc99"
            }
            if (parseInt(potenzial[0].Scenario3) > 0) { 
                return "#ffe6cc"
            }
            };