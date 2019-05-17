            
function drawScenarios(potenzial) { 

            // Gemeinden grau markieren, die keine ID haben => keine Daten vorhanden
           
            
            // zeichne Szenario 1 mit Abstufungen in Farben
            if (parseInt(potenzial.Scenario1) > 100) {
                return " #e69900"
            }
            
            if (parseInt(potenzial[0].Scenario1) > 80) {
                return "#ffaa00"
            }
            if (parseInt(potenzial[0].Scenario1) > 60) { 
                return "#ffc34d"
            }
            if (parseInt(potenzial[0].Scenario1) > 40) { 
                return "#ffcc66"
            }
            if (parseInt(potenzial[0].Scenario1) > 20) { 
                return "#ffdd99"
            }

            if (parseInt(potenzial[0].Scenario1) > 0) {
                return "#ffeecc"
            }
    
            // zeichne Szenario 2 (in Originaldaten Szenario 3) mit Abstufungen in denselben Farben
            // => Vergleich dann via Radio Buttons (umschalten möglich)
            if (parseInt(potenzial.Scenario3) > 100) {
                return " #e69900"
            }
            
            if (parseInt(potenzial[0].Scenario3) > 80) {
                return "#ffaa00"
            }
            if (parseInt(potenzial[0].Scenario3) > 60) { 
                return "#ffc34d"
            }
            
            if (parseInt(potenzial[0].Scenario3) > 40) { 
                return "#ffcc66"
            }
            
            if (parseInt(potenzial[0].Scenario3) > 20) { 
                return "#ffdd99"
            }
            if (parseInt(potenzial[0].Scenario3) > 0) { 
                return "#ffeecc"
            }
            };