temperature = 59;
seaLevel = 3.2;
mutationRate = 0.00000001;
population = 8800000000;
migrationRate = 3.6;
habitatRate = 12.5;
hungerRate = 0.08;
oxegenLevel = 20.9;
carbonDioxideLevel = 0.042;
solarRadiation = 290;

const allEP = [temperature, seaLevel, mutationRate, population, migrationRate, habitatRate, hungerRate, oxegenLevel, carbonDioxideLevel, solarRadiation]
const allEPN = ["temperature", "seaLevel", "mutationRate", "population", "migrationRate", "habitatRate", "hungerRate", "oxegenLevel", "carbonDioxideLevel", "solarRadiation"]
const allEPA = ["temperature", "seaLevel", "mutationRate", "population", "migrationRate", "habitatRate", "hungerRate", "oxegenLevel", "carbonDioxideLevel", "solarRadiation"]

const EPE = {
    globalWarming: ["temperature70", "seaLevel5"],
    AITakeover: ["population2000000000", "habitatRate10"]
}
const f = ["globalWarming", "AITakeover"]

full = []

function assignfullyears(){
    full = []
    for (let key in EPE){
        if (document.getElementById(key).checked == true){
            full.push(EPE[key])
        }
    }
    time = document.getElementById("time").value / 10;
    console.log(time)
    assignallEPA()
}

function assignallEPA(){
    for (let i = 0; i < full.length; i++){
        for (let j = 0; j < full[i].length; j++){
            vl = full[i][j]
            vn = full[i][j]
            vl = vl.replace(/[^a-zA-Z]/g, "")
            vn = vn.replace(/[^0-9.]/g, "")

            for (let k = 0; k < allEPA.length; k++){
                if (vl == allEPA[k]){
                    allEPA[k] = Number(vn)
                }
            }
        };
    }

    for (let l = 0; l < allEPA.length; l++){
        if (allEPA[l] == allEPN[l]){
            allEPA.splice(l, 1)
            allEPN.splice(l, 1)
            allEP.splice(l, 1)
            l = l - 1;
            console.log("EP: " + allEP)
        }
    }
    assignFV()
};

function assignFV(){
    for (let i = 0; i < allEPA.length; i++){
        allEPA[i] = allEPA[i] * time + allEP[i]
    }
    console.log("EPA: " + allEPA)
    console.log("EPN: " + allEPN)
    console.log("EP: " + allEP)
}