namespace Freezer {

    window.addEventListener("load", init);

    export let jsonObj: Topping[] = [];
    //export let jsonBase: Yogurt[] = [];
    //let jsonYogurt: Topping;
    let toppingCart: Topping;
    let frozenYogurt: Topping;
    //   let yogurtCart: Yogurt;
    //let yogurtBase: HTMLImageElement = <HTMLImageElement>document.createElement("img");
    let configDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("config");
    let formForm: HTMLFormElement = <HTMLFormElement>document.getElementById("formdiv");
    let total: number = 0;
    let gesamtPreis: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h4");
    let orderYT: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("a");
    let orderCry: HTMLImageElement = <HTMLImageElement>document.createElement("img");
    configDiv.appendChild(orderYT);
    orderYT.appendChild(orderCry);  
    async function init(_event: Event): Promise<void> {
        buildVisualisierung();
        await communicate("toppings.json");
        await communicate("yogurtbases.json");
        createHTMLElements();
    }
    function createHTMLElements(): void {

        let firstName: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        formForm.appendChild(firstName);
        firstName.setAttribute("class", "formular");
        firstName.setAttribute("id", "firstname");
        firstName.setAttribute("placeholder", "Vorname");
        firstName.setAttribute("name", "Vorname");
        let lastName: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        formForm.appendChild(lastName);
        lastName.setAttribute("class", "formular");
        lastName.setAttribute("id", "lastname");
        lastName.setAttribute("placeholder", "Nachname");
        lastName.setAttribute("name", "Nachname");
        let streetName: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        formForm.appendChild(streetName);
        streetName.setAttribute("class", "formular");
        streetName.setAttribute("id", "streetname");
        streetName.setAttribute("placeholder", "Straße und Hasunummer");
        streetName.setAttribute("name", "Straße");
        let cityName: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        formForm.appendChild(cityName);
        cityName.setAttribute("class", "formular");
        cityName.setAttribute("id", "cityname");
        cityName.setAttribute("placeholder", "Wohnort");
        cityName.setAttribute("name", "Wohnort");
        formForm.appendChild(gesamtPreis);
        gesamtPreis.setAttribute("id", "gesamtpreis");
        let orderButton: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        formForm.appendChild(orderButton);
        orderButton.setAttribute("id", "orderbtn");
        orderButton.setAttribute("type", "submit");
        orderButton.setAttribute("value", "Send Order!");
        orderButton.addEventListener("click", sendButton);
        let clearButton: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        formForm.appendChild(clearButton);
        clearButton.setAttribute("id", "clearbtn");
        clearButton.setAttribute("type", "button");
        clearButton.setAttribute("value", "Zurücksetzen");
        clearButton.addEventListener("click", onClickClear);


        for (let i: number = 0; i < jsonObj.length; i++) {
            //Joghurt-Auswahl
            if (jsonObj[i].category == "yogurt") {
                let configBase: HTMLDivElement = <HTMLDivElement>document.getElementById("base");
                let baseDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                baseDiv.setAttribute("class", "bases");
                baseDiv.setAttribute("id", "base" + i);
                baseDiv.addEventListener("click", handleBaseClick.bind(jsonObj[i]));
                configBase.appendChild(baseDiv);
                let baseImg: HTMLImageElement = <HTMLImageElement>document.createElement("img");
                baseImg.setAttribute("src", (jsonObj[i].bild));
                baseImg.setAttribute("class", "baseImg");
                baseImg.setAttribute("alt", "Lecker Frozen Yogurt");
                baseDiv.appendChild(baseImg);
                let baseName: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h4");
                baseName.setAttribute("class", "basename");
                baseName.innerHTML = (jsonObj)[i].name;
                baseDiv.appendChild(baseName);
                let basePreis: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h5");
                basePreis.setAttribute("class", "basepreis");
                basePreis.innerHTML = (jsonObj)[i].preis.toLocaleString() + "€";
                baseDiv.appendChild(basePreis);
            }
            //Topping-Auswahl
            if (jsonObj[i].category == "toppings") {
                let toppingDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                toppingDiv.setAttribute("class", "topping");
                toppingDiv.setAttribute("id", "topping" + i);
                document.getElementById("toppingsammlung")?.appendChild(toppingDiv);
                toppingDiv.addEventListener("click", handleToppingClick.bind(jsonObj[i]));
                let toppingImg: HTMLImageElement = <HTMLImageElement>document.createElement("img");
                toppingImg.setAttribute("class", "topping_img");
                toppingImg.setAttribute("src", (jsonObj)[i].bild);
                toppingImg.setAttribute("alt", "Topping Vorschau");
                document.getElementById("topping" + i)?.appendChild(toppingImg);
                let toppingHeading: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h4");
                toppingHeading.setAttribute("class", "topping_h");
                toppingHeading.innerHTML = (jsonObj)[i].name;
                document.getElementById("topping" + i)?.appendChild(toppingHeading);
                let toppingPreis: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h5");
                toppingPreis.setAttribute("class", "topping_preis");
                toppingPreis.innerHTML = (jsonObj)[i].preis.toLocaleString() + "€";
                document.getElementById("topping" + i)?.appendChild(toppingPreis);
            }

        }

    }
    function generateOrderContent(): void {
        for (let i: number = 0; i < localStorage.length; i++) {
            let orderKey: string = <string>localStorage.key(i);
            let jsonString: string = <string>localStorage.getItem(orderKey);
            frozenYogurt = <Topping>JSON.parse(jsonString);
            if (frozenYogurt.category == "yogurt") {
                let yogurtInput: HTMLInputElement = <HTMLInputElement>document.createElement("input");
                yogurtInput.setAttribute("name", "Yogurt");
                yogurtInput.setAttribute("value", frozenYogurt.name);
                formForm.appendChild(yogurtInput).innerHTML = orderKey + yogurtInput.name;
                //    yogurtInput.style.display = "none";
            }
            if (frozenYogurt.category == "toppings") {
                let toppingInput: HTMLInputElement = <HTMLInputElement>document.createElement("input");
                toppingInput.setAttribute("name", "Toppping");
                toppingInput.setAttribute("value", frozenYogurt.name);
                formForm.appendChild(toppingInput).innerHTML = orderKey + toppingInput.name;
                //toppingInput.style.display = "none";
            }
        }
        let preisInput: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        preisInput.setAttribute("name", "Gesamtpreis");
        preisInput.setAttribute("value", total.toLocaleString() + "€");
        //  preisInput.style.display = "none";
    }
    function orderEasterEgg(): void {
        configDiv.appendChild(orderYT);
        orderYT.appendChild(orderCry);
        orderCry.setAttribute("src", "bilder/order.jpg");
        orderCry.setAttribute("id", "ordercry");
        orderYT.setAttribute("href", "https://www.youtube.com/watch?v=H4v7wddN-Wg");
        orderYT.setAttribute("target", "_blank");
    }
    function sendButton(_click: Event): void {
        orderEasterEgg();
        generateOrderContent();
        sendOrder();
      /*  orderCry.setAttribute("src", "bilder/order.jpg");
        orderCry.setAttribute("id", "ordercry");
        orderYT.setAttribute("href", "https://www.youtube.com/watch?v=H4v7wddN-Wg");
        orderYT.setAttribute("target", "_blank");
        */
    }
    async function sendOrder(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        // let url: string = "http://localhost:8100";
        let url: string = "https://testservergis01.herokuapp.com";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/send" + "?" + query.toString();
        await fetch(url);
    }

    function handleBaseClick(this: Topping, _click: Event): void {

        if (this.category == "yogurt") {
            localStorage.removeItem(this.category);
        }
        chooseBaseFlavour(this);
        buildVisualisierung();
    }
    function handleToppingClick(this: Topping, _click: Event): void {
        if (document.getElementById(this.name)) {
            localStorage.removeItem(this.name);
            location.reload();
        }
        else {
            addTopping(this);
            buildVisualisierung();
        }
    }
    function chooseBaseFlavour(_yogurt: Topping): void {
        let yogurtStorage: string = JSON.stringify(_yogurt);
        localStorage.setItem(_yogurt.category, yogurtStorage);
    }
    function addTopping(_topping: Topping): void {

        let toppingStorage: string = JSON.stringify(_topping);

        localStorage.setItem(_topping.name, toppingStorage);
    }
    
    function buildVisualisierung(): void {

        total = 0;
        for (let i: number = 0; i < localStorage.length; i++) {
            let toppingKey: string = <string>localStorage.key(i);
            let jsonString: string = <string>localStorage.getItem(toppingKey);
            toppingCart = <Topping>JSON.parse(jsonString);

            if (toppingCart.category == "toppings") {
                let toppingPlus: HTMLImageElement = <HTMLImageElement>document.createElement("img");
                configDiv.appendChild(toppingPlus);
                toppingPlus.setAttribute("id", toppingCart.name);
                toppingPlus.setAttribute("src", toppingCart.vorschau);
                toppingPlus.setAttribute("alt", toppingCart.name);
                toppingPlus.setAttribute("class", toppingCart.category);
                toppingPlus.style.zIndex = "5";

            }
            if (toppingCart.category == "yogurt") {
                let yogurtChoice: HTMLImageElement = <HTMLImageElement>document.createElement("img");
                configDiv.appendChild(yogurtChoice);
                yogurtChoice.setAttribute("id", toppingCart.name);
                yogurtChoice.setAttribute("src", toppingCart.vorschau);
                yogurtChoice.setAttribute("alt", toppingCart.name);
                yogurtChoice.setAttribute("class", toppingCart.category);
                yogurtChoice.style.zIndex = "0";
            }

            total += toppingCart.preis;
        }
        gesamtPreis.innerHTML = total.toLocaleString() + "€";
    }
    function onClickClear(_click: Event): void {
        total = 0;
        localStorage.clear();
        location.reload();

    }
}