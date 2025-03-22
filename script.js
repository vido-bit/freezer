"use strict";
var Freezer;
(function (Freezer) {
    window.addEventListener("load", init);
    Freezer.jsonObj = [];
    //export let jsonBase: Yogurt[] = [];
    //let jsonYogurt: Topping;
    let toppingCart;
    let frozenYogurt;
    //   let yogurtCart: Yogurt;
    //let yogurtBase: HTMLImageElement = <HTMLImageElement>document.createElement("img");
    let configDiv = document.getElementById("config");
    let formForm = document.getElementById("formdiv");
    let total = 0;
    let gesamtPreis = document.createElement("h4");
    let orderYT = document.createElement("a");
    let orderCry = document.createElement("img");
    configDiv.appendChild(orderYT);
    orderYT.appendChild(orderCry);
    async function init(_event) {
        buildVisualisierung();
        await Freezer.communicate("toppings.json");
        await Freezer.communicate("yogurtbases.json");
        createHTMLElements();
    }
    function createHTMLElements() {
        let firstName = document.createElement("input");
        formForm.appendChild(firstName);
        firstName.setAttribute("class", "formular");
        firstName.setAttribute("id", "firstname");
        firstName.setAttribute("placeholder", "Vorname");
        firstName.setAttribute("name", "Vorname");
        let lastName = document.createElement("input");
        formForm.appendChild(lastName);
        lastName.setAttribute("class", "formular");
        lastName.setAttribute("id", "lastname");
        lastName.setAttribute("placeholder", "Nachname");
        lastName.setAttribute("name", "Nachname");
        let streetName = document.createElement("input");
        formForm.appendChild(streetName);
        streetName.setAttribute("class", "formular");
        streetName.setAttribute("id", "streetname");
        streetName.setAttribute("placeholder", "Straße und Hasunummer");
        streetName.setAttribute("name", "Straße");
        let cityName = document.createElement("input");
        formForm.appendChild(cityName);
        cityName.setAttribute("class", "formular");
        cityName.setAttribute("id", "cityname");
        cityName.setAttribute("placeholder", "Wohnort");
        cityName.setAttribute("name", "Wohnort");
        formForm.appendChild(gesamtPreis);
        gesamtPreis.setAttribute("id", "gesamtpreis");
        let orderButton = document.createElement("input");
        formForm.appendChild(orderButton);
        orderButton.setAttribute("id", "orderbtn");
        orderButton.setAttribute("type", "submit");
        orderButton.setAttribute("value", "Send Order!");
        orderButton.addEventListener("click", sendButton);
        let clearButton = document.createElement("input");
        formForm.appendChild(clearButton);
        clearButton.setAttribute("id", "clearbtn");
        clearButton.setAttribute("type", "button");
        clearButton.setAttribute("value", "Zurücksetzen");
        clearButton.addEventListener("click", onClickClear);
        for (let i = 0; i < Freezer.jsonObj.length; i++) {
            //Joghurt-Auswahl
            if (Freezer.jsonObj[i].category == "yogurt") {
                let configBase = document.getElementById("base");
                let baseDiv = document.createElement("div");
                baseDiv.setAttribute("class", "bases");
                baseDiv.setAttribute("id", "base" + i);
                baseDiv.addEventListener("click", handleBaseClick.bind(Freezer.jsonObj[i]));
                configBase.appendChild(baseDiv);
                let baseImg = document.createElement("img");
                baseImg.setAttribute("src", (Freezer.jsonObj[i].bild));
                baseImg.setAttribute("class", "baseImg");
                baseImg.setAttribute("alt", "Lecker Frozen Yogurt");
                baseDiv.appendChild(baseImg);
                let baseName = document.createElement("h4");
                baseName.setAttribute("class", "basename");
                baseName.innerHTML = (Freezer.jsonObj)[i].name;
                baseDiv.appendChild(baseName);
                let basePreis = document.createElement("h5");
                basePreis.setAttribute("class", "basepreis");
                basePreis.innerHTML = (Freezer.jsonObj)[i].preis.toLocaleString() + "€";
                baseDiv.appendChild(basePreis);
            }
            //Topping-Auswahl
            if (Freezer.jsonObj[i].category == "toppings") {
                let toppingDiv = document.createElement("div");
                toppingDiv.setAttribute("class", "topping");
                toppingDiv.setAttribute("id", "topping" + i);
                document.getElementById("toppingsammlung")?.appendChild(toppingDiv);
                toppingDiv.addEventListener("click", handleToppingClick.bind(Freezer.jsonObj[i]));
                let toppingImg = document.createElement("img");
                toppingImg.setAttribute("class", "topping_img");
                toppingImg.setAttribute("src", (Freezer.jsonObj)[i].bild);
                toppingImg.setAttribute("alt", "Topping Vorschau");
                document.getElementById("topping" + i)?.appendChild(toppingImg);
                let toppingHeading = document.createElement("h4");
                toppingHeading.setAttribute("class", "topping_h");
                toppingHeading.innerHTML = (Freezer.jsonObj)[i].name;
                document.getElementById("topping" + i)?.appendChild(toppingHeading);
                let toppingPreis = document.createElement("h5");
                toppingPreis.setAttribute("class", "topping_preis");
                toppingPreis.innerHTML = (Freezer.jsonObj)[i].preis.toLocaleString() + "€";
                document.getElementById("topping" + i)?.appendChild(toppingPreis);
            }
        }
    }
    function generateOrderContent() {
        for (let i = 0; i < localStorage.length; i++) {
            let orderKey = localStorage.key(i);
            let jsonString = localStorage.getItem(orderKey);
            frozenYogurt = JSON.parse(jsonString);
            if (frozenYogurt.category == "yogurt") {
                let yogurtInput = document.createElement("input");
                yogurtInput.setAttribute("name", "Yogurt");
                yogurtInput.setAttribute("value", frozenYogurt.name);
                formForm.appendChild(yogurtInput).innerHTML = orderKey + yogurtInput.name;
                //    yogurtInput.style.display = "none";
            }
            if (frozenYogurt.category == "toppings") {
                let toppingInput = document.createElement("input");
                toppingInput.setAttribute("name", "Toppping");
                toppingInput.setAttribute("value", frozenYogurt.name);
                formForm.appendChild(toppingInput).innerHTML = orderKey + toppingInput.name;
                //toppingInput.style.display = "none";
            }
        }
        let preisInput = document.createElement("input");
        preisInput.setAttribute("name", "Gesamtpreis");
        preisInput.setAttribute("value", total.toLocaleString() + "€");
        //  preisInput.style.display = "none";
    }
    function orderEasterEgg() {
        configDiv.appendChild(orderYT);
        orderYT.appendChild(orderCry);
        orderCry.setAttribute("src", "bilder/order.jpg");
        orderCry.setAttribute("id", "ordercry");
        orderYT.setAttribute("href", "https://www.youtube.com/watch?v=H4v7wddN-Wg");
        orderYT.setAttribute("target", "_blank");
    }
    function sendButton(_click) {
        orderEasterEgg();
        generateOrderContent();
        sendOrder();
        /*  orderCry.setAttribute("src", "bilder/order.jpg");
          orderCry.setAttribute("id", "ordercry");
          orderYT.setAttribute("href", "https://www.youtube.com/watch?v=H4v7wddN-Wg");
          orderYT.setAttribute("target", "_blank");
          */
    }
    async function sendOrder() {
        let formData = new FormData(document.forms[0]);
        // let url: string = "http://localhost:8100";
        let url = "https://testservergis01.herokuapp.com";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "/send" + "?" + query.toString();
        await fetch(url);
    }
    function handleBaseClick(_click) {
        if (this.category == "yogurt") {
            localStorage.removeItem(this.category);
        }
        chooseBaseFlavour(this);
        buildVisualisierung();
    }
    function handleToppingClick(_click) {
        if (document.getElementById(this.name)) {
            localStorage.removeItem(this.name);
            location.reload();
        }
        else {
            addTopping(this);
            buildVisualisierung();
        }
    }
    function chooseBaseFlavour(_yogurt) {
        let yogurtStorage = JSON.stringify(_yogurt);
        localStorage.setItem(_yogurt.category, yogurtStorage);
    }
    function addTopping(_topping) {
        let toppingStorage = JSON.stringify(_topping);
        localStorage.setItem(_topping.name, toppingStorage);
    }
    function buildVisualisierung() {
        total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            let toppingKey = localStorage.key(i);
            let jsonString = localStorage.getItem(toppingKey);
            toppingCart = JSON.parse(jsonString);
            if (toppingCart.category == "toppings") {
                let toppingPlus = document.createElement("img");
                configDiv.appendChild(toppingPlus);
                toppingPlus.setAttribute("id", toppingCart.name);
                toppingPlus.setAttribute("src", toppingCart.vorschau);
                toppingPlus.setAttribute("alt", toppingCart.name);
                toppingPlus.setAttribute("class", toppingCart.category);
                toppingPlus.style.zIndex = "5";
            }
            if (toppingCart.category == "yogurt") {
                let yogurtChoice = document.createElement("img");
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
    function onClickClear(_click) {
        total = 0;
        localStorage.clear();
        location.reload();
    }
})(Freezer || (Freezer = {}));
//# sourceMappingURL=script.js.map