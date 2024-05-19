import { APIsql } from "../modele/connexion.js"

class UneLivraison{
    private _idForfait: string;
    private _libForfait: string;
    private _mtForfait: string;

    constructor(idForfait: string = "", libForfait: string = "", mtForfait: string = ""){
        this._idForfait= idForfait;
        this._libForfait= libForfait;
        this._mtForfait= mtForfait;
    }

    get idForfait(): string{
        return this._idForfait
    }

    get libForfait(): string{
        return this._libForfait
    }

    get mtForfait(): string{
        return this._mtForfait
    }

    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau: APIsql.TtabAsso = {
            'idForfait': this._idForfait, 'libForfait': this._libForfait, 'mtForfait': this._mtForfait};
        return tableau;
    }

}

type TLivraisons = { [key: string]: UneLivraison };	

class DesLivraisons{

    constructor(){

    }

    private prepare(where: string = ""): string { // La valeur par défaut de "where" est une chaîne vide
        let sql = `SELECT
            id_forfait,
            lib_forfait,
            mt_forfait`;

        if (where !== "") {
            sql += " WHERE " + where;
        }

        sql += `
            FROM 
            forfait_livraison;`;

        return sql;
    }

    private load(result: APIsql.TdataSet): TLivraisons{
        // à partir d’un TdataSet, conversion en tableau d’objets UneClient
        let livraisons: TLivraisons = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const livraison = new UneLivraison(item["id_forfait"], item["lib_forfait"], item["mt_forfait"],);
            livraisons[livraison.idForfait] = livraison;	// clé d’un élément du tableau : num client
        }
        return livraisons;
    }

    all(): TLivraisons {	// renvoie le tableau d’objets contenant toutes les salles
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));

    }

    toArray(livraisons: TLivraisons): APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in livraisons) {
            T.push(livraisons[id].toArray());
        }
        return T;
    }

    byNumLivraison (id_forfait : string) : UneLivraison	{ // renvoie lâ€™objet correspondant Ã  la livraison num_livraison
            let livraison = new UneLivraison();
            const livraisons : TLivraisons = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_forfait = ?"),[id_forfait]));
            const lesCles: string[] = Object.keys(livraisons);
            // affecte les clÃ©s du tableau associatif Â« livraisons Â» dans le tableau de chaines Â« lesCles Â»
            if ( lesCles.length > 0) {
                livraison = livraisons[lesCles[0]];	// rÃ©cupÃ©rer le 1er Ã©lÃ©ment du tableau associatif Â« livraisons Â»
            }
            return livraison;
	}

}

export { UneLivraison };
export { DesLivraisons };
export { TLivraisons };
