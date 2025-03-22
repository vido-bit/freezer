"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Freezer = void 0;
const Http = require("http");
const url = require("url");
const Mongo = require("mongodb");
//import { ParsedUrlQuery } from "querystring";
var Freezer;
(function (Freezer) {
    let bestellungen;
    //Zuweisung der Port-Nummer
    let port = process.env.PORT;
    //Port-Zuweisung, falls vorher fehlgeschlagen
    if (!port)
        port = 8100;
    let databaseUrl = "mongodb+srv://firstAdmin:adminpower@gis-macht-geil.pszdj.mongodb.net/Bestellungen?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        console.log("Starting server on port:" + _port);
        //Server erstellen
        let server = Http.createServer();
        //Anfragen bearbeiten
        server.addListener("request", handleRequest);
        //Anfragen abfangen
        server.addListener("listening", handleListen);
        //Auf Anfragen von port warten
        server.listen(port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        bestellungen = mongoClient.db("Bestellungen").collection("Students");
        //kontaktliste.insertOne({ name: "Hubert", firstname: "Manuel", registration: "756432" })
        console.log("Datenbank Verbindung", bestellungen != undefined);
    }
    //Ausführung bei Serverstart
    function handleListen() {
        console.log("Listening");
    }
    //Ausführung bei Anfrage
    async function handleRequest(_request, _response) {
        console.log(_request.url);
        //Header -> Inhaltstyp HTML mit Zeichensatz UTF-8, Zugriff von überall
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let q = await url.parse(_request.url, true);
            let path = q.pathname;
            if (path == "/send") {
                await sendBestellung(q);
            }
            else if (path == "/get") {
                await getBestellung(_response);
            }
        }
        _response.end();
    }
    async function sendBestellung(_q) {
        console.log("Übermittle Daten an Mongo");
        console.log("Bestellungen: " + bestellungen);
        bestellungen.insertOne(_q.query);
    }
    async function getBestellung(_response) {
        let bestellungsArray = await bestellungen.find().toArray();
        _response.write(JSON.stringify(bestellungsArray));
    }
    /*
    export async function insert(_contact: ParsedUrlQuery): Promise<void> {
        console.log("insert" + _contact.firstname + _contact.name)
    }
    export async function removeOne(_query: ParsedUrlQuery): Promise<Mongo.DeleteWriteOpReslutObject> {
        let id: string = <string>_query["id"];
        let objId: Mongo.ObjectId = new Mongo.ObjectId(id);
        console.log("Entferne" + id);
        return await kontaktliste.deleteOne({ "_id": objId })
    }
    */
})(Freezer = exports.Freezer || (exports.Freezer = {}));
//# sourceMappingURL=server.js.map