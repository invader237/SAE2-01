import { APIsql } from "../modele/connexion.js"

class UneFacture {
    private _numero: string;
    private _date: string;
    private _commentFact: string;
    private _client: string;
    private _nomClient: string;
    private _prix: string;
    private _remise: string;
    private _livraison: string;

    constructor(numero: string, date: string, commentFact: string, client: string, nomClient: string, prix: string, remise: string, livraison: string) {
        this._numero = numero;
        this._date = date;
        this._commentFact = commentFact;
        this._client = client;
        this._nomClient = nomClient;
        this._prix = prix;
        this._remise = remise;
        this._livraison = livraison;
    }

    avecRemise(): string {
        return (parseInt(this._prix, 10) - parseInt(this._prix, 10) * (parseInt(this._remise, 10) / 100)).toString();
    }

    get numero(): string {
        return this._numero
    }

    get date(): string {
        return this._date
    }

    get commentFact(): string {
        return this._commentFact
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

    //set

    set numero(numero: string) {
        this._numero = numero
    }
    set date(date: string) {
        this._date = date
    }

    set commentFact(commentFact: string) {
        this._commentFact = commentFact;
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
            'client': this._client, 'nomClient': this._nomClient,
            'prix': this._prix, 'remise': this._remise, 'livraison': this._livraison
        };
        return tableau;
    }

    insert(): boolean {	// requÃªte dâ€™ajout dâ€™une this._dans la table				// requÃªte de manipulation : utiliser SQLexec
        alert(typeof(this._numero + this._date + this._commentFact + this._remise + this._client + this._livraison))
        let sql = "INSERT INTO facture (num_fact,date_fact,comment_fact,taux_remise_fact,id_cli,id_forfait) VALUES(?, ?, ?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [this._numero, this._date,this._commentFact,this._remise,this._client,this._livraison]);
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
        f.comment_fact,
        f.id_cli,
        (SELECT nom_cli FROM client c WHERE c.id_cli = f.id_cli) as nom_cli, 
        (SELECT SUM(l.qte_prod * p.tarif_ht) FROM ligne l, produit p WHERE l.num_fact = f.num_fact AND l.code_prod = p.code_prod) as prix,
        f.taux_remise_fact, 
        f.id_forfait as livraison
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
            const facture = new UneFacture(item['num_fact'], item['date_fact'], item['comment_fact'] ,item['id_cli'],
                item["nom_cli"], item["prix"], item["taux_remise_fact"], item["livraison"]);
            factures[facture.numero] = facture;	// clé d’un élément du tableau : num facture
        }
        return factures;
    }


    all(): TFactures {	// renvoie le tableau d’objets contenant toutes les factures
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }

    toArray(factures: TFactures): APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in factures) {
            T.push(factures[id].toArray());
        }
        return T;
    }

    delete(num_fact: string): boolean {	// requÃªte de suppression dâ€™une facture dans la table
        let sql = "DELETE FROM facture WHERE num_fact = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_fact]);		// requÃªte de manipulation : utiliser SQLexec
    }

    update(facture: UneFacture): boolean {	// requÃªte de modification dâ€™une facture dans la table
        let sql = "UPDATE facture SET date_fact = ?, comment_fact = ?, taux_remise_fact = ?, id_cli = ?, id_forfait = ? ";
        sql += " WHERE	num_facture	= ?"; 					// requÃªte de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [facture.date, facture.commentFact, facture.remise, facture.client, facture.livraison]);
    }

}


export { LesFactures };
export { UneFacture };
export { TFactures };


