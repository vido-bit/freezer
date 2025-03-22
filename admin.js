"use strict";
var Freezer;
(function (Freezer) {
    window.addEventListener("load", init);
    let aktiveBestellungen = document.getElementById("bestellungen_aktiv");
    //let bearbeiteBestellungen: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungen_inbearbeitung");
    // let abgeschlosseneBestellungen: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungen_abgeschlossen");
    let memeDiv = document.getElementById("meme");
    function init() {
        handleOrder();
    }
    async function handleOrder() {
        let url = "https://testservergis01.herokuapp.com";
        // let url: string = "http://localhost:8100";
        url += "/get";
        let response = await fetch(url);
        let responseString = await response.text();
        aktiveBestellungen.innerHTML = responseString;
        console.log(responseString);
        //let aktuelleBestellungen: Bestellungen [] = JSON.parse(responseString);
    }
    let meme = document.createElement("img");
    meme.setAttribute("src", "bilder/css.png");
    meme.setAttribute("id", "memebild");
    memeDiv.appendChild(meme);
})(Freezer || (Freezer = {}));
//# sourceMappingURL=admin.js.map