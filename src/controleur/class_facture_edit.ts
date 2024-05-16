import { UneFacture } from "../modele/data_facture"
import { UnClient } from "../modele/data_client"
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
	private _params 	: string[];		// paramètres reçus par le fichier HTML 
										// tel que  params[0] :  mode affi, modif, suppr, ajout
										// 			params[1] : id en mode affi, modif, supp

	get form(): TFactureEditForm{ 
        return this._form
    }
	get params(): string[]{ 
        return this._params	
    }
	private _erreur		: {	// tableau contenant les messages d'erreur pour chaque type d'erreur pour chaque zone de saisie à vérifier
		[key:string] : TErreur 
	}
	get erreur()  :{[key:string]:TErreur}	{ return this._erreur	}

	initMsgErreur():void { // les erreurs "champ vide", "valeur inconnue", "doublon" sont les trois principales erreurs dans un formulaire
		// pour chaque champ à contrôler (événement onChange), création des 3 messages d'erreur + message pour correct
		// avec chaîne vide si pas d'erreur générée pour un type d'erreur potentielle
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
		this._form.listeContenue.options.add(new Option( this._unProduit.libProduit, this._unProduit.codeProduit.toString()));
	}

	detailClient(valeur : string):void {
		const err = this.erreur.edtCodeClient
		const detail   = this.form.lblDetailClient;
		detail.textContent = "";		
		err.statut = "correct";
		const chaine : string = valeur.trim();
		if (chaine.length > 0) {
			const client : UnClient = DesClient.byCodeDept(chaine); 
			if (this._unClient.id !== "") {	// client trouvé 
				detail.textContent 
				= this._unClient +"\r\n" +this._unClient.civ+this._unClient.nom+this._unClient.prenom+this._unClient.adr+this._unClient.cp+this._unClient.commune+this._unClient.remiseMax; 
			}
			else { 
				err.statut = 'inconnu';
				detail.textContent = err.msg.inconnu;	
			}
		}
		else err.statut = 'vide';		
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