import { APIsql } from "../modele/connexion.js"

class UneFacture {
    private _numero: string;
    private _date: string;
    private _client: string;
    private _nomClient: string;
    private _prix: string;
    private _remise: string;
    private _livraison: string;

    constructor(numero: string, date: string, client: string, nomClient: string, prix: string, remise: string, livraison: string) {
        this._numero = numero;
        this._date = date;
        this._client = client;
        this._nomClient = nomClient;
        this._prix = prix;
        this._remise = remise;
        this._livraison = livraison;
    }

    avecRemise(): string {
        return (parseInt(this._prix, 10) - parseInt(this._prix, 10) * parseInt(this._remise, 10)).toString();
    }

    get numero(): string {
        return this._numero
    }

    get date(): string {
        return this._date
    }

    get client(): string {
        return this._client
    }

    get nomClient(): string {
        return this._nomClient
    }

    get prix(): string {
        return this._prix
    }

    get remise(): string {
        return this._remise
    }

    get livraison(): string {
        return this._livraison
    }

    set numero(numero: string) {
        this._numero = numero
    }
    set date(date: string) {
        this._date = date
    }
    set client(client: string) {
        this._client = client
    }
    set nomClient(nomClient: string) {
        this._nomClient = nomClient
    }
    set prix(prix: string) {
        this._prix = prix
    }
    set remise(remise: string) {
        this._remise = remise
    }
    set livraison(livraison: string) {
        this._livraison = livraison
    }

    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau: APIsql.TtabAsso = {
            'numero': this._numero, 'date': this._date,
            'client': this._client, 'nomClient': this._nomClient, 'prix': this._prix, 'remise': this._remise
        };
        return tableau;
    }

}


type TFactures = { [key: string]: UneFacture };		// tableau d’objets UneFacture

class LesFactures {

    constructor() {

    }

    private prepare(where: string = ""): string { // La valeur par défaut de "where" est une chaîne vide
        let sql = `SELECT
        f.num_fact, 
        f.date_fact, 
        f.id_cli,
        (SELECT nom_cli FROM client c WHERE c.id_cli = f.id_cli) as nom_cli, 
        (SELECT SUM(l.qte_prod * p.tarif_ht) FROM ligne l, produit p WHERE l.num_fact = f.num_fact AND l.code_prod = p.code_prod) as prix,
        f.taux_remise_fact, 
        f.id_forfait
    FROM facture f`;

        if (where !== "") {
            sql += " WHERE " + where;
        }

        sql += ` GROUP BY 
        f.num_fact, 
        f.date_fact, 
        f.id_cli, 
        f.taux_remise_fact, 
        f.id_forfait`;

        return sql;
    }


    private load(result: APIsql.TdataSet): TFactures {
        // à partir d’un TdataSet, conversion en tableau d’objets UneFacture
        let factures: TFactures = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const facture = new UneFacture(item['num_fact'], item['date_fact'], item['id_cli'],
                item["nom_cli"], item["prix"], item["taux_remise_fact"], item["livraison"]);
            factures[facture.numero] = facture;	// clé d’un élément du tableau : num facture
        }
        return factures;
    }


    all(): TFactures {	// renvoie le tableau d’objets contenant toutes les salles
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }

    toArray(salles: TFactures): APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in salles) {
            T.push(salles[id].toArray());
        }
        return T;
    }

}


export { LesFactures };
export { UneFacture };
export { TFactures };


