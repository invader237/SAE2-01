import {UneSalle, LesSalles, TSalles}	from "../modele/data_salle.js"
import {LesDepts}						from "../modele/data_departement.js"
import {LesTypEquiptsBySalle}			from "../modele/data_equipement.js"

type TSalleListeForm = { 
	divTitre:HTMLElement, btnAjouter:HTMLInputElement, tableSalle : HTMLTableElement 
}

class VueSalleListe {	// tableau contenant le rÃ©sultat d'une requÃªte retournant un tableau de lignes ; chaque ligne contenant un tableau associatif
	private _form   	: TSalleListeForm;
	
	constructor() {
	// rien								
    }

	get form()  :TSalleListeForm 	{ return this._form		}

	init(form : TSalleListeForm ):void {
		this._form   = form;

		const lesSalles = new LesSalles;
		const data : TSalles = lesSalles.all();	
		const lesDepts				= new LesDepts();
		const lesTypEquiptsBySalle	= new LesTypEquiptsBySalle();

		// construction du titre
		this.form.divTitre.textContent = 'Liste des factures';

		for (let num in data) {
			const uneSalle : UneSalle = data[num];
			const tr = this.form.tableSalle.insertRow();

			let balisea : HTMLAnchorElement; // dÃ©claration balise <a>
			// crÃ©ation balise <a> pour appel page visualisation du dÃ©tail de la salle
			balisea = document.createElement("a")
			balisea.classList.add('img_visu')
			balisea.onclick = function():void { vueSalleListe.detailSalleClick(uneSalle.numSalle); }

			tr.insertCell().appendChild(balisea)

			tr.insertCell().textContent = uneSalle.numSalle;
			tr.insertCell().textContent = uneSalle.libSalle;
			tr.insertCell().textContent = uneSalle.etage;
			tr.insertCell().textContent = uneSalle.codeDept;
			tr.insertCell().textContent = lesDepts.byCodeDept(uneSalle.codeDept).nomDept;	
			tr.insertCell().textContent = lesTypEquiptsBySalle.getTotalNbEquipt(lesTypEquiptsBySalle.byNumSalle(num));	

			// crÃ©ation balise <a> pour appel page modification du dÃ©tail de la salle
			balisea = document.createElement("a")
			balisea.classList.add('img_modification')
			balisea.onclick = function():void { vueSalleListe.modifierSalleClick(uneSalle.numSalle); }
			tr.insertCell().appendChild(balisea)
			// crÃ©ation balise <a> pour appel page suppression d'une salle
			balisea = document.createElement("a")
			balisea.classList.add('img_corbeille')
			balisea.onclick = function():void { vueSalleListe.supprimerSalleClick(uneSalle.numSalle); }
			tr.insertCell().appendChild(balisea)	
		}

		// dÃ©finition Ã©vÃ©nement onclick sur bouton "ajouter"  
		this.form.btnAjouter.onclick = function():void { vueSalleListe.ajouterSalleClick(); }

	}
	
	detailSalleClick(num : string,  noLigne = -1):void {
		location.href = "salle_edit.html?affi&" +encodeURIComponent(num);
	}
	
	modifierSalleClick(num : string):void {
		location.href = "salle_edit.html?modif&" +encodeURIComponent(num);		
	}
	supprimerSalleClick(num : string):void {
		location.href = "salle_edit.html?suppr&" +encodeURIComponent(num);		
	}
	ajouterSalleClick():void {
		location.href = "salle_edit.html?ajout";		
	}	
}	

let vueSalleListe = new VueSalleListe;

export {vueSalleListe}