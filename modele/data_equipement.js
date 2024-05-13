import { connexion, APIsql } from "../modele/connexion.js";
class UnTypEquipt {
    constructor(id_equipt = "", lib_equipt = "", commentaire = "") {
        this._idEquipt = id_equipt;
        this._libEquipt = lib_equipt;
        this._commentaire = commentaire;
    }
    get idEquipt() {
        return this._idEquipt;
    }
    set idEquipt(id_equipt) {
        this._idEquipt = id_equipt;
    }
    get libEquipt() {
        return this._libEquipt;
    }
    set libEquipt(lib_equipt) {
        this._libEquipt = lib_equipt;
    }
    get commentaire() {
        return this._commentaire;
    }
    set commentaire(commentaire) {
        this._commentaire = commentaire;
    }
    toArray() {
        let tableau = { 'idEquipt': this._idEquipt, 'libEquipt': this._libEquipt,
            'commentaire': this._commentaire };
        return tableau;
    }
}
class LesTypEquipts {
    constructor() {
        // rien
    }
    load(result) {
        let typEquipts = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const typEquipt = new UnTypEquipt(item['id_equipt'], item['lib_equipt'], item['commentaire']);
            typEquipts[typEquipt.idEquipt] = typEquipt;
        }
        return typEquipts;
    }
    prepare(where) {
        let sql;
        sql = "SELECT id_equipt, lib_equipt, commentaire";
        sql += " FROM TYPE_EQUIPT";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY lib_equipt ASC ";
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byIdEquipt(id_equipt) {
        let typEquipt = new UnTypEquipt;
        const typEquipts = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_equipt	= ?"), [id_equipt]));
        const lesCles = Object.keys(typEquipts);
        if (lesCles.length > 0) {
            typEquipt = typEquipts[lesCles[0]];
        }
        return typEquipt;
    }
    toArray(typEquipts) {
        let T = [];
        for (let id in typEquipts) {
            T.push(typEquipts[id].toArray());
        }
        return T;
    }
}
// Classe représentant la relation « contient » 
// Le nom de la classe sera composée des noms des relations détail – maître,
// pour notre cas « TypEquiptBySalle ». 
// Cela indique que l’accès aux données de la relation détail « TYPE_EQUIPT » 
// se fait par l’identifiant « num_salle » de la relation maître « SALLE »
class UnTypEquiptBySalle {
    constructor(unTypEquipt = null, qte = "") {
        this._unTypEquipt = unTypEquipt;
        this._qte = qte;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get qte() { return this._qte; }
    set qte(qte) { this._qte = qte; }
    get unTypEquipt() { return this._unTypEquipt; }
    set unTypEquipt(unTypEquipt) { this._unTypEquipt = unTypEquipt; }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = this.unTypEquipt.toArray(); // appel de la méthode « toArray » de « UnTypEquipt »
        tableau['qte'] = this.qte;
        return tableau;
    }
}
class LesTypEquiptsBySalle {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
        const typEquiptsBySalle = {};
        const lesTypEquipts = new LesTypEquipts();
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const unTypEquipt = lesTypEquipts.byIdEquipt(item['id_equipt']);
            const typEquiptBySalle = new UnTypEquiptBySalle(unTypEquipt, item['qte']);
            typEquiptsBySalle[typEquiptBySalle.unTypEquipt.idEquipt] = typEquiptBySalle;
        }
        return typEquiptsBySalle;
    }
    prepare(where) {
        let sql;
        sql = "SELECT id_equipt, qte";
        sql += " FROM	contient";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    /*
        private load(result : APIsql.TdataSet) :	TTypEquiptsBySalle	{
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
            let typEquiptsBySalle : TTypEquiptsBySalle = {};
            for (let i=0; i<result.length; i++) {
                const item:APIsql.TtabAsso = result[i];
                const typEquiptBySalle = new UnTypEquiptBySalle(new UnTypEquipt(item['id_equipt'], item['lib_equipt'] , item['commentaire'])
                                                                , item['qte']);
                typEquiptsBySalle[typEquiptBySalle.unTypEquipt.idEquipt] = typEquiptBySalle;
            }
            return typEquiptsBySalle;
        }
    
        private prepare(where:string):string {
            let sql : string;
            sql	= "SELECT contient.id_equipt as id_equipt, lib_equipt, commentaire, qte";
            sql += " FROM	contient  JOIN  TYPE_EQUIPT  ON contient.id_equipt=TYPE_EQUIPT.id_equipt";
            if (where.trim() !== "")
            {
                sql	+= " WHERE " +where;
            }
            sql	+= " ORDER BY lib_equipt ";
            return sql;
        }
    */
    byNumSalle(num_salle) {
        // renvoie le tableau d’objets contenant tous les équipements de la salle num salle
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_salle = ?"), [num_salle]));
    }
    byNumSalleIdEquipt(num_salle, id_equipt) {
        // renvoie l’objet de l’équipement id_equipt contenu dans la salle num_salle
        let typEquiptBySalle = new UnTypEquiptBySalle;
        const typEquiptsBySalle = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_salle = ? and id_equipt = ?"), [num_salle, id_equipt]));
        if (!typEquiptsBySalle[0] === undefined) {
            typEquiptBySalle = typEquiptsBySalle[0];
        }
        return typEquiptBySalle;
    }
    toArray(typEquipts) {
        let T = [];
        for (let id in typEquipts) {
            T.push(typEquipts[id].toArray());
            delete T[T.length - 1].commentaire; // pas besoin du commentaire pour l'affichage dans le tableau
        }
        return T;
    }
    getTotalNbEquipt(typEquipts) {
        // renvoie la quantité totale d’équipements d’une salle
        let total = 0;
        for (let id in typEquipts) {
            total += Number(typEquipts[id].qte);
        }
        return total.toString();
    }
    delete(num_salle) {
        let sql;
        sql = "DELETE	FROM	contient	WHERE	num_salle = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_salle]); // requête de manipulation : utiliser SQLexec
    }
    insert(num_salle, typEquipts) {
        // requête d’ajout d’un équipement avec une quantité dans « contient » pour la salle num_salle
        let sql;
        let separateur = "";
        sql = "INSERT INTO contient(num_salle,id_equipt, qte) VALUES ";
        for (let cle in typEquipts) {
            sql += separateur + "('" + num_salle + "','" + typEquipts[cle].unTypEquipt.idEquipt + "','" + typEquipts[cle].qte + "')";
            separateur = ",";
        }
        return APIsql.sqlWeb.SQLexec(sql, []);
    }
}
export { connexion };
export { UnTypEquipt };
export { LesTypEquipts };
export { UnTypEquiptBySalle };
export { LesTypEquiptsBySalle };
//# sourceMappingURL=data_equipement.js.map