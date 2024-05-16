import { UneFacture } from "../modele/data_facture"
import { UnClient,DesClients,TClients } from "../modele/data_client"
import { UnProduit } from "../modele/data_produit"



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
	lblDetailClient:HTMLLabelElement,
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

type TStatutValeur = 'correct' | 'vide' | 'inconnu' | 'doublon'

type TErreur 		=  { 
	statut : TStatutValeur, 
	msg:{ [key in TStatutValeur] : string } 
}


class VueFactureEdit {
	private _form 		: TFactureEditForm
	private _unProduit: UnProduit
	private _unClient: UnClient
	private _uneFacture: UneFacture
	private _params 	: string[];		
	private _erreur	: {	[key:string] : TErreur }							

	get form(): TFactureEditForm{ 
        return this._form
    }
	get params(): string[]{ 
        return this._params	
    }
	get erreur()  :{[key:string]:TErreur}	{ 
		return this._erreur	
	}

	initMsgErreur():void {
			this._erreur = { edtNum		: {statut :'vide', msg:{correct:"", vide:"Le numéro d'identifications doit être renseigné."		 ,inconnu:"Le numéro d'identification ne peut contenir que des chiffres."						,doublon:"Le numéro d'identification est déjà attribué."} }
							,edtEtage	: {statut :'vide', msg:{correct:"", vide:"La date doit être renseigné."					 ,inconnu:""						,doublon:""} }
							,edtCodeClient: {statut :'vide', msg:{correct:"", vide:"Le numéro du client doit être renseigné."			 ,inconnu:"Client inconnu."	,doublon:""} }
							,equipt		: {statut :'vide', msg:{correct:"", vide:"La facture doit contenir au moins un produit.",inconnu:""						,doublon:""} }
							,listeEquipt: {statut :'vide', msg:{correct:"", vide:"Aucun produit choisi"								,inconnu:""	,doublon:""} }
							,edtQte		: {statut :'vide', msg:{correct:"", vide:"La quantité doit être un nombre entier supérieur à 0"	,inconnu:""	,doublon:""} }}
		}

	init(form:TFactureEditForm) {
		this._form=form
		
		this.form.listeContenue.style.display = "none";
		this.form.edtContenueQte.style.display = "none";
		
		this._uneFacture=new UneFacture("1", "2024-05-23", "1", "BOZZO","75", "10", "30")
		this._unProduit= new UnProduit("27","Evian","eau en bouteille","0.5","8","10")
		this._unClient = new UnClient("1","M.","BOZZO","Raoul","bozzo.raoul@gmail.com", "24 rue du cirque","57000","Metz","20")
		

		this.affichageListe();
		this.initMsgErreur();

		this.form.edtClient.onchange = function():void{
			vueFactureEdit.detailClient()
		}
		this.form.btnAjouterFacture.onclick = function():void{
			vueFactureEdit.afficherFactureEdit();
		}
		this.form.btnRetour.onclick = function():void { 
			vueFactureEdit.retourClick(); 
		}  
		const affi = this.params[0] === 'affi';
		if (this.params[0] !== 'ajout')
		{	// affi ou modif ou suppr
			this.form.edtNum.value 			= this._uneFacture.numero;			
			this.form.edtLib.value			= this._uneFacture.nomClient;
			this.form.edtDate.value		= this._uneFacture.date;
			this.form.edtClient.value		= this._unClient.id;
			this.form.edtNum.readOnly 		= true;
			this.form.edtLib.readOnly 		= affi;
			this.form.edtClient.readOnly 	= affi;
			this.erreur.edtNum.statut 		= "correct";
			//this.detailClient();
		}
	}
	afficherFactureEdit():void {
		this.affichageProduit()
		this.form.listeContenue.style.display = "block";
		this.form.edtContenueQte.style.display = "block";
		this.form.btnAjouterFacture.hidden = true;
		this.form.btnAnnuler.hidden = false;
		this.form.btnValider.hidden = false;
	}

	affichageListe():void{
		const tr = this.form.tableContenue.insertRow();
		let balisea : HTMLAnchorElement; // dÃ©claration balise <a>
		// crÃ©ation balise <a> pour appel page visualisation du dÃ©tail de la salle
		balisea = document.createElement("a")

		tr.insertCell().textContent = this._unProduit.code;
		tr.insertCell().textContent = this._unProduit.nom;
		tr.insertCell().textContent = this._unProduit.type;
		tr.insertCell().textContent = this._unProduit.cond;
		tr.insertCell().textContent = this._unProduit.prixUnit;
		tr.insertCell().textContent = this._unProduit.qte;
		tr.insertCell().textContent = this._unProduit.prixTotal();	
	}

	affiGrilleProduit():void {
		const tr = this.form.tableContenue.insertRow();
		let balisea : HTMLAnchorElement; // déclaration balise <a>
				// création balise <a> pour appel modification équipement dans salle
				balisea = document.createElement("a")
				balisea.classList.add('img_modification')
				balisea.onclick = function():void { vueFactureEdit.modifierEquiptClick(id); }
				tr.insertCell().appendChild(balisea)
				// création balise <a> pour appel suppression équipement dans salle
				balisea = document.createElement("a")
				balisea.classList.add('img_corbeille')
				balisea.onclick = function():void { vueFactureEdit.supprimerEquiptClick(id); }
				tr.insertCell().appendChild(balisea)
	}

	affichageProduit(): void {
		//const option = this.form.tableContenue.options();
		//option.insertCell().textContent = this._unProduit.libProduit;
		this._form.listeContenue.options.add(new Option( this._unProduit.nom, this._unProduit.code.toString()));
	}

	detailClient():void {
		const desClient = new DesClients();
		const data_client :TClients = desClient.all();
		const detail = this.form.lblDetailClient;
		const valeur = vueFactureEdit.form.edtClient.value 
		const detailClient = data_client[valeur];
		(detailClient["nom"])
		if (detailClient["nom"] !== "") {	// département trouvé 
			detail.textContent 
			= detailClient["civ"] +" "+ detailClient["nom"] +" "+ detailClient["prenom"]+"\r\n" + detailClient["adr"] + " - " + detailClient["cp"]+" "+ detailClient["commune"]+"\r\n" + detailClient["mel"]+ "\r\n" +"taux de remise maximum accordé : "+ detailClient["remiseMax"]+"%"; 
		}
	}
	
	retourClick():void {
		location.href = "salle_liste.html";		
	}	

	modifierEquiptClick(id : string):void {
		this.afficherFactureEdit();		
		this.form.listeContenue.length = 0;
		this.form.listeContenue.options.add(new Option(this._unProduit.libProduit, this._unProduit.codeProduit.toString()));	// text, value = 0;
		this.form.listeContenue.selectedIndex = 0;
	}	

}

let vueFactureEdit = new VueFactureEdit;
export { vueFactureEdit };
//# sourceMappingURL=class_salle_edit.js.map