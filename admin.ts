namespace Freezer {
    window.addEventListener("load", init);
    let aktiveBestellungen: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungen_aktiv");
    //let bearbeiteBestellungen: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungen_inbearbeitung");
   // let abgeschlosseneBestellungen: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungen_abgeschlossen");
    let memeDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("meme");
    function init(): void {
        handleOrder();
    }
    async function handleOrder(): Promise<void> {
        let url: string = "https://testservergis01.herokuapp.com";
       // let url: string = "http://localhost:8100";
        url += "/get";
        let response: Response = await fetch(url);
        let responseString: string = await response.text();
        aktiveBestellungen.innerHTML = responseString;
        console.log(responseString);
        //let aktuelleBestellungen: Bestellungen [] = JSON.parse(responseString);
    }
    let meme: HTMLImageElement = <HTMLImageElement>document.createElement("img");
    meme.setAttribute("src", "bilder/css.png");
    meme.setAttribute("id", "memebild");
    memeDiv.appendChild(meme);

}