"use strict";
var Freezer;
(function (Freezer) {
    async function communicate(_url) {
        let toppingResponse = await fetch("toppings.json");
        Freezer.jsonObj = await toppingResponse.json();
    }
    Freezer.communicate = communicate;
})(Freezer || (Freezer = {}));
//# sourceMappingURL=function.js.map