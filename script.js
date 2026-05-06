let allEP = {
    diseasePressure: 45,
    climateStress: 55,
    radiation: 15,
    nutrition: 65,
    physicalDemand: 40,
    cognitiveDemand: 70,
    techDependence: 78,
    mentalStress: 62,
    geneticDiversity: 75,
    survivalPressure: 35
}

let time = 0

const EPE = {
WorldWars: ["diseasePressure+15","nutrition-17","mentalStress+20","survivalPressure+37","geneticDiversity-7","techDependence-6","physicalDemand+15"],
aiTakeover: ["techDependence+14","physicalDemand-12","cognitiveDemand+8","mentalStress+12","survivalPressure-13","diseasePressure-5","nutrition+7"],
climateCrisis: ["climateStress+13","diseasePressure+10","nutrition-7","survivalPressure+17","mentalStress+10","physicalDemand+10"],
globalPandemic: ["diseasePressure+37","mentalStress+22","techDependence+6","survivalPressure+25","nutrition-5","cognitiveDemand+6"],
nuclearDisaster: ["radiation+73","diseasePressure+27","nutrition-27","survivalPressure+55","mentalStress+26","techDependence-18","geneticDiversity-15"],
spaceExpansion: ["cognitiveDemand+10","techDependence+10","physicalDemand+12","survivalPressure+13","radiation+12","mentalStress+6"],
geneEditingBoom: ["diseasePressure-23","cognitiveDemand+8","geneticDiversity-7","nutrition+6","survivalPressure-8"],
extremeTechAddiction: ["techDependence+16","physicalDemand-14","mentalStress+16","cognitiveDemand-4","nutrition-3","survivalPressure-5"],
foodShortage: ["nutrition-23","diseasePressure+13","survivalPressure+37","mentalStress+12","physicalDemand+8"],
waterShortage: ["climateStress+9","nutrition-11","survivalPressure+27","diseasePressure+8","mentalStress+10"],
naturalDisasters: ["climateStress+15","mentalStress+14","survivalPressure+33","nutrition-8","diseasePressure+6"],
overpopulation: ["diseasePressure+13","mentalStress+16","physicalDemand-6","techDependence+5","nutrition-4"],
economicCollapse: ["nutrition-17","mentalStress+20","diseasePressure+15","survivalPressure+18","techDependence-8"],
helpingEarth: ["climateStress-9","nutrition+9","mentalStress-8","diseasePressure-6","survivalPressure-5","physicalDemand+4"],
newEraLearning: ["cognitiveDemand+12","mentalStress-8","physicalDemand+8","techDependence+4","diseasePressure-4","nutrition+5"]
}

function assignfullyears(){

    let selected = []

    for (let key in EPE){
        if (document.getElementById(key)?.checked){
            selected.push(EPE[key])
        }
    }

    time = Number(document.getElementById("time").value) / 10

    if (time === 6.7){
        document.getElementById("bruh").style.display = "block"
    }

    applyChanges(selected)
    generateOutput()
}

function applyChanges(selected){

    for (let scenario of selected){
        for (let change of scenario){

            let stat = change.replace(/[^a-zA-Z]/g, "")
            let value = parseFloat(change.replace(/[^0-9.-]/g, ""))

            if (allEP[stat] !== undefined){
                allEP[stat] += value
            }
        }
    }

    for (let key in allEP){
        allEP[key] = Math.max(0, Math.min(100, allEP[key]))
    }
}

const badHigh = [
"diseasePressure",
"mentalStress",
"survivalPressure",
"climateStress",
"radiation"
]

function getWord(stat, value){
    horrible = ["catastrophic","devastating","apocalyptic","dreadful","horrific", "ruinous","grim","dire","nightmarish","abysmal", "disastrous","horrendous","toxic","chaotic","unbearable"]
    bad = ["bad","poor","weak","unhealthy","unstable", "harmful","troubling","negative","risky","problematic", "serious","rough","declining","unsafe","damaging"]
    ok = ["ok","average","moderate","stable","neutral", "acceptable","balanced","fair","ordinary","mediocre", "passable","steady","normal","fine","standard"]
    good = ["good","great","strong","healthy","positive", "excellent","thriving","optimal","stable","beneficial", "flourishing","solid","improving","strong","promising"]

    let level =
        value >= 80 ? "horrible" :
        value >= 50 ? "bad" :
        value >= 25 ? "ok" : "good"

    let pool = []

    let badWhenHigh = badHigh.includes(stat)

    if (badWhenHigh){
        pool =
            level === "horrible" ? horrible :
            level === "bad" ? bad :
            level === "ok" ? ok : good
    } else {
        pool =
            level === "horrible" ? good :
            level === "bad" ? ok :
            level === "ok" ? bad : horrible
    }

    return pool[Math.floor(Math.random() * pool.length)]
}

function generateOutput(){

    let output = `In ${time * 10} years:<br>`

    for (let stat in allEP){

        let value = allEP[stat]
        let word = getWord(stat, value)

        let name = stat.replace(/([A-Z])/g, " $1")
        name = name.charAt(0).toUpperCase() + name.slice(1)

        output += `• ${name} will be ${word}<br>`
    }

    document.getElementById("summary").innerHTML = output
}