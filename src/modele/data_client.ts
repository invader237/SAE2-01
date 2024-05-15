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

    get civ(): string {
        return this._civ
    }
    get nom(): string {
        return this._nom
    }
    get prenom(): string {
        return this._prenom
    }
    get mel(): string {
        return this._mel
    }
    get adr(): string {
        return this._adr
    }
    get cp(): string {
        return this._cp
    }
    get commune(): string {
        return this._commune
    }
    get remiseMax(): string {
        return this._remiseMax
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

        sql += `FROM 
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
