import { APIsql } from "../modele/connexion.js"

class UnProduit {
    private _code: string;
    private _nom: string;
    private _type: string;
    private _origine: string
    private _cond: string;
    private _prixUnit: string;

    constructor(code: string, nom: string, type: string, origine:string, cond: string, prixUnit: string) {
        this._code = code;
        this._nom = nom;
        this._type = type;
        this._origine= origine
        this._cond = cond;
        this._prixUnit = prixUnit;
    }

    prixTotal(qte: string): string {
        return (parseFloat(this._prixUnit) * parseInt(qte, 10)).toString();
    }

    get code(): string {
        return this._code
    }

    get nom(): string {
        return this._nom
    }

    get type(): string {
        return this._type
    }

    get origine(): string {
        return this._origine
    }

    get cond(): string {
        return this._cond
    }

    get prixUnit(): string {
        return this._prixUnit
    }

    set code(code: string) {
        this._code = code;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    set type(type: string) {
        this._type = type;
    }

    set origine(origine: string) {
        this._origine = origine
    }

    set cond(cond: string) {
        this._cond = cond;
    }

    set prixUnit(prixUnit: string) {
        this._prixUnit = prixUnit;
    }

    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau: APIsql.TtabAsso = {
            'code': this._code, 'nom': this._nom,
            'type': this._type, 'cond': this._cond,
            'prixUnit': this._prixUnit
        };
        return tableau;
    }
}

type TProduits = { [key: string]: UnProduit };		// tableau d’objets UnProduit

class DesProduits {

    constructor() {

    }

    private prepare(where: string = ""): string { // La valeur par défaut de "where" est une chaîne vide
        let sql = `SELECT 
            DISTINCT(p.code_prod),
            p.lib_prod,
            p.type,
            p.origine,
            p.conditionnement,
            p.tarif_ht`;

        if (where !== "") {
            sql += " WHERE " + where;
        }

        sql += `
            FROM 
            produit p, ligne l`;

        return sql;
    }

    private load(result: APIsql.TdataSet): TProduits {
        // à partir d’un TdataSet, conversion en tableau d’objets UneProduit
        let produits: TProduits = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const produit = new UnProduit(item['code_prod'], item['lib_prod'], item['type'],
                item['origine'],item["conditionnement"], item["tarif_ht"]);
            produits[produit.code] = produit;	// clé d’un élément du tableau : num produit
        }
        return produits;
    }

    all(): TProduits {	// renvoie le tableau d’objets contenant toutes les salles
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));

    }

    toArray(produits: TProduits): APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in produits) {
            T.push(produits[id].toArray());
        }
        return T;
    }

/*    ajoutAFacture(numFacture: string, produit: UnProduit): boolean {
        let sql = "INSERT INTO ligne(num_fact, code_prod, qte_prod) VALUES(?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [numFacture, produit.code, produit.qte]);
    }

    modifierDansFacture(numFacture: string, produit: UnProduit): boolean {
        let sql = "UPDATE ligne SET code_prod = ?, qte_prod = ?";
        sql += " WHERE num_facture = ?";
        return APIsql.sqlWeb.SQLexec(sql, [produit.code, produit.qte, numFacture]);
    }

    suppDansFacture(numFacture: string, produit: UnProduit): boolean {
        let sql = "DELETE FROM ligne WHERE num_fact = ? AND code_prod = ?";
        return APIsql.sqlWeb.SQLexec(sql, [numFacture, produit.code]);
    }*/

}

class UnProduitDansFacture {
    private _code: string;
    private _nom: string;
    private _origine: string;
    private _type: string;
    private _cond: string;
    private _prixUnit: string;
    private _qte: string;

    constructor(code: string, nom: string, origine: string, type: string, cond: string, prixUnit: string, qte: string) {
        this._code = code;
        this._nom = nom;
        this._origine = origine;
        this._type = type;
        this._cond = cond;
        this._prixUnit = prixUnit;
        this._qte = qte;
    }

    prixTotal(): string {
        return (parseInt(this._prixUnit, 10) * parseInt(this._qte, 10)).toString();
    }

    get code(): string {
        return this._code;
    }

    get nom(): string {
        return this._nom;
    }

    get origine(): string {
        return this._origine;
    }

    get type(): string {
        return this._type;
    }

    get cond(): string {
        return this._cond;
    }

    get prixUnit(): string {
        return this._prixUnit;
    }

    get qte(): string {
        return this._qte;
    }

    set code(code: string) {
        this._code = code;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    set origine(origine: string) {
        this._origine = origine;
    }

    set type(type: string) {
        this._type = type;
    }

    set cond(cond: string) {
        this._cond = cond;
    }

    set prixUnit(prixUnit: string) {
        this._prixUnit = prixUnit;
    }

    set qte(qte: string) {
        this._qte = qte;
    }

    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau: APIsql.TtabAsso = {
            'code': this._code, 'nom': this._nom, 'origine': this._origine,
            'type': this._type, 'cond': this._cond,
            'prixUnit': this._prixUnit, 'qte': this._qte,
        };
        return tableau;
    }
}


type TProduitDansFacture = { [key: string]: UnProduitDansFacture };		// tableau d’objets UnProduit

class LesProduitsDansFacture {

    private _numFacture: string;

    constructor(numFacture: string) {
        this._numFacture = numFacture;
    }

    private prepare(where: string = ""): string { // La valeur par défaut de "where" est une chaîne vide
        let sql = `SELECT num_fact,
            l.code_prod,
            p.lib_prod,
            p.origine,
            p.type, 
            p.conditionnement,
            p.tarif_ht,
            qte_prod`;


        if (where !== "") {
            sql += " WHERE l.num_facture = " + where + " AND l.code_prod = p.code_prod";
        }

        sql += `
            FROM 
            ligne l, produit p`;

        return sql;
    }

    private load(result: APIsql.TdataSet): TProduitDansFacture {
        // à partir d’un TdataSet, conversion en tableau d’objets UneProduit
        let produitsDansFacture: TProduitDansFacture = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const produitDansFacture = new UnProduitDansFacture(item['code_prod'], item['lib_prod'], item["origine"],
                item['type'], item["conditionnement"], item["tarif_ht"], item["qte_prod"]);
            produitsDansFacture[produitDansFacture.code] = produitDansFacture;	// clé d’un élément du tableau : num produit
        }
        return produitsDansFacture;
    }

    all(): TProduitDansFacture {	// renvoie le tableau d’objets contenant toutes les salles
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(this._numFacture), []));

    }

    toArray(unProduitDansFacture: TProduitDansFacture): APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in unProduitDansFacture) {
            T.push(unProduitDansFacture[id].toArray());
        }
        return T;
    }



}

export { UnProduitDansFacture };
export { LesProduitsDansFacture };
export { TProduitDansFacture };

export { UnProduit };
export { DesProduits };
export { TProduits };
