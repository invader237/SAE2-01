import { APIsql } from "../modele/connexion.js"

class UnClient {
    private _id: string;
    private _civ: string;
    private _nom: string;
    private _prenom: string;
    private _mel: string;
    private _adr: string;
    private _cp: string;
    private _commune: string;
    private _remiseMax: string;

    constructor(id: string, civ: string, nom: string, prenom: string, mel: string, adr: string, cp: string, commune: string, remiseMax: string) {

        this._id = id
        this._civ = civ
        this._nom = nom
        this._prenom = prenom
        this._mel = mel
        this._adr = adr
        this._cp = cp
        this._commune = commune
        this._remiseMax = remiseMax
    }

    get id(): string {
        return this._id
    }

    set id(value: string) {
        if (!isNaN(Number(value)) && Number(value) > 0) this._id = value;
        else throw new Error("L'ID doit être un entier supérieur à 0.");
    }

    get civ(): string {
        return this._civ
    }

    set civ(value: string) {
        if (value === "M." || value === "Mme") this._civ = value;
        else throw new Error("La civilité indiquée n'est pas autorisée !");
    }

    get nom(): string {
        return this._nom
    }

    set nom(value: string) {
        if (value.length >= 2) this._nom = value;
        else throw new Error("Le nom doit contenir au moins 2 caractères alphabétiques.");
    }


    get prenom(): string {
        return this._prenom
    }

    set prenom(value: string) {
        if (value.length >= 2) this._prenom = value;
        else throw new Error("Le prénom doit contenir au moins 2 caractères alphabétiques.");
    }

    get mel(): string {
        return this._mel
    }

    set mel(value: string) {
        if (value.includes('@')) this._mel = value;
        else throw new Error("L'adresse email doit contenir un '@'.");
    }

    get adr(): string {
        return this._adr
    }
    
    set adr(value: string) {
        if (value.length >= 15) this._adr = value;
        else throw new Error("L'adresse doit contenir au moins 15 caractères.");
    }

    get cp(): string {
        return this._cp
    }
    set cp(value: string) {
        if (value.length >= 2) this._cp = value;
        else throw new Error("Le code postal doit contenir au moins 2 caractères.");
    }

    get commune(): string {
        return this._commune
    }

    set commune(value: string) {
        if (value.length >= 2) this._commune = value;
        else throw new Error("La commune doit contenir au moins 2 caractères.");
    }

    get remiseMax(): string {
        return this._remiseMax
    }

    set remiseMax(value: string) {
        let num = Number(value);
        if (!isNaN(num) && num >= 0 && num <= 100) this._remiseMax = value;
        else throw new Error("Le taux de remise doit être entre 0 et 100.");
    }


    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau: APIsql.TtabAsso = {
            'id': this._id, 'civ': this._civ, 'nom': this._nom, 'prenom': this._prenom,
            'mel': this._mel, 'adr': this._adr, 'cp': this._cp, 'commune': this._commune,
            'remiseMax': this._remiseMax
        };
        return tableau;

    }
}

type TClients = { [key: string]: UnClient };		// tableau d’objets UneFacture

class DesClients {

    constructor() {

    }

    private prepare(where: string = ""): string { // La valeur par défaut de "where" est une chaîne vide
        let sql = `SELECT 
            civ_cli,
            id_cli,
            nom_cli,
            prenom_cli,
            mel_cli,
            adr_cli,
            cp_cli,
            commune_cli,
            tauxmax_remise_cli`;

        if (where !== "") {
            sql += " WHERE " + where;
        }

        sql += `
            FROM 
            client;`;

        return sql;
    }

    private load(result: APIsql.TdataSet): TClients {
        // à partir d’un TdataSet, conversion en tableau d’objets UneClient
        let clients: TClients = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const client = new UnClient(item["id_cli"], item["civ_cli"], item["nom_cli"],
                item["prenom_cli"], item["mel_cli"], item["adr_cli"], item["cp_cli"],
                item["commune_cli"], item["tauxmax_remise_cli"],);
            clients[client.id] = client;	// clé d’un élément du tableau : num client
        }
        return clients;
    }

    all(): TClients {	// renvoie le tableau d’objets contenant toutes les salles
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));

    }

    toArray(clients: TClients): APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in clients) {
            T.push(clients[id].toArray());
        }
        return T;
    }
}

export { UnClient };
export { DesClients };
export { TClients };
