import { DonneListe }	from "./class_facture_liste"


type TFactureEditForm = { 
	divDetail:HTMLElement, 
    divTitre:HTMLElement,
	edtNum:HTMLInputElement, 
    edtLib:HTMLInputElement, 
    edtDate:HTMLInputElement, 
    edtClient:HTMLInputElement,
	edtLivraison: HTMLElement,
	edtRemise: HTMLInputElement,
	btnRetour:HTMLInputElement, 
    btnValider:HTMLInputElement, 
    btnAnnuler:HTMLInputElement,
	lblDetailDept:HTMLLabelElement,
	lblNumErreur :HTMLLabelElement, 
    lblEtageErreur:HTMLLabelElement, 
    lblDeptErreur:HTMLLabelElement, 
    lblEquiptErreur:HTMLLabelElement 
	divFacture : HTMLDivElement, 
    divFactureEdit : HTMLDivElement ,
	btnAjouterFacture:HTMLInputElement, 
    lblTotal : HTMLLabelElement, 
    tableContenue : HTMLTableElement
	listeContenue:HTMLSelectElement, 
    edtQte:HTMLInputElement,
	edtContenueQte : HTMLElement
    btnValiderEquipt:HTMLInputElement, 
    btnAnnulerEquipt:HTMLInputElement, 
    lblSelectEquiptErreur:HTMLLabelElement, 
    lblQteErreur:HTMLLabelElement,
}

class DonneListe {
    private _numero: number;
    private _date: Date;
    private _client: number;
    private _nomClient: string;
    private _prix: number;
    private _remise: number;
    private _livraison: number;

    constructor(numero: number, date: Date, client: number, nomClient: string,prix:number, remise: number, livraison: number) {
        this._numero = numero;
        this._date = date;
        this._client = client;
        this._nomClient = nomClient;
        this._prix = prix;
        this._remise = remise;
        this._livraison = livraison;
    }

    avecRemise():number{
        return this._prix-this._prix*this._remise
    }

    get numero():number{
        return this._numero
    }

    get date():Date{
        return this._date
    }

    get client():number{
        return this._client
    }

    get nomClient(): string{
        return this._nomClient
    }
    
    get prix():number{
        return this._prix
    }

    get remise():number{
        return this._remise
    }

    get livraison():number{
        return this._livraison
    }

    set numero(numero:number){
        this._numero=numero
    }
    set date(date:Date){
        this._date=date
    }
    set client(client:number){
        this._client=client
    }
    set nomClient(nomClient:string){
        this._nomClient=nomClient
    }
    set prix(prix:number){
        this._prix=prix
    }
    set remise(remise:number){
        this._remise=remise
    }
    set livraison(livraison:number){
        this._livraison=livraison
    }

}

class UnProduit {
	private _codeProduit:number;
	private _libProduit:string;
	private _typeProduit:string;
	private _condProduit:number;
	private _puProduit:number;
	private _qteProduit:number;

	constructor(codeProduit: number, libProduit: string, typeProduit: string, condProduit: number, puProduit: number, qteProduit: number){
		this._codeProduit = codeProduit;
		this._libProduit = libProduit;
		this._typeProduit = typeProduit;
		this._condProduit = condProduit;
		this._puProduit = puProduit;
		this._qteProduit = qteProduit;
	}

	montant():number{
		return this._puProduit*this._qteProduit
	}

	get codeProduit():number{
		return this._codeProduit
	}

	get libProduit(): string{
		return this._libProduit
	}

	get typeProduit():string{
		return this._typeProduit
	}

	get condProduit():number{
		return this._condProduit
	}

	get puProduit():number{
		return this._puProduit
	}

	get qteProduit():number{
		return this._qteProduit
	}

}

class VueFactureEdit {
	private _form 		: TFactureEditForm
	private _unProduit: UnProduit
	private _params 	: string[];		// paramètres reçus par le fichier HTML 
										// tel que  params[0] :  mode affi, modif, suppr, ajout
										// 			params[1] : id en mode affi, modif, supp

	get form(): TFactureEditForm{ 
        return this._form
    }
	get params(): string[]{ 
        return this._params	
    }


	init(form:TFactureEditForm) {
		this._form=form
		alert("1")
		this.form.listeContenue.style.display = "none";
		this.form.edtContenueQte.style.display = "none";
		this._unProduit= new UnProduit(27,"Evian","eau en bouteille",0.5,8,10)
		this.affichageListe();
		this.ajouterProduit(28,"Christaline","bouteille en plastique",0.75,5,1 )
		this.form.btnAjouterFacture.onclick = function():void{
			vueFactureEdit.afficherFactureEdit();
		}
	}
	afficherFactureEdit():void {
		this.form.listeContenue.style.display = "block";
		this.form.edtContenueQte.style.display = "block";
		this.form.btnAjouterFacture.hidden = false;
		this.form.btnAnnuler.hidden = false;
		this.form.btnValider.hidden = false;
	}

	affichageListe():void{
		const tr = this.form.tableContenue.insertRow();
		let balisea : HTMLAnchorElement; // dÃ©claration balise <a>
		// crÃ©ation balise <a> pour appel page visualisation du dÃ©tail de la salle
		balisea = document.createElement("a")

		tr.insertCell().textContent = this._unProduit.codeProduit.toString();
		tr.insertCell().textContent = this._unProduit.libProduit
		tr.insertCell().textContent = this._unProduit.typeProduit;
		tr.insertCell().textContent = this._unProduit.condProduit.toString();
		tr.insertCell().textContent = this._unProduit.puProduit.toString();
		tr.insertCell().textContent = this._unProduit.qteProduit.toString();
		tr.insertCell().textContent = this._unProduit.montant().toString();
	}

		
}
let vueFactureEdit = new VueFactureEdit;
export { vueFactureEdit };
//# sourceMappingURL=class_salle_edit.js.map