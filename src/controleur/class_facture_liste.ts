
class DonneListe {
    private _numero: number;
    private _date: Date;
    private _client: number;
    private _remise: boolean;
    private _livraison: number;

    constructor(numero: number, date: Date, client: number, remise: boolean, livraison: number) {
        this._numero = numero;
        this._date = date;
        this._client = client;
        this._remise = remise;
        this._livraison = livraison;
    }
}

// Déclaration d'une variable de type Date initialisée à la date et heure actuelles


tabDonne : TDonneListe = {15,let date: Date = new Date(),83,0,101};

class VueFactureListe {
    private _form : TFactureListeForm;

    constructor(){}

    get form() : TFactureListeForm { return this._form }

    init(form: TFactureListeForm) : void {
        this._form=form
    }
    detailFactureClick(code : string,  noLigne = -1):void {
        location.href = "salle_edit.html?affi&" +encodeURIComponent(code);
    }
    modifierFactureClick(code : string):void {
        location.href = "salle_edit.html?modif&" +encodeURIComponent(code);
    }
    supprimerFactureClick(code : string):void {
        location.href = "salle_edit.html?suppr&" +encodeURIComponent(code);
    }
    ajouterFactureClick():void {
        location.href = "salle_edit.html?ajout";
    }

}

let vueFactureListe = new VueFactureListe;

export {vueFactureListe}