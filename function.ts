namespace Freezer {
    

    export interface Topping {
        category: string;
        bild: string;
        vorschau: string;
        name: string;
        preis: number;
    }


    export async function communicate(_url: RequestInfo): Promise<void> {
        let toppingResponse: Response = await fetch("toppings.json");
        jsonObj = await toppingResponse.json();
    }
}