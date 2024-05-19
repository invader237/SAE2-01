import { UneFacture, LesFactures, TFactures } from "../modele/data_facture"
import { UnClient, DesClients, TClients } from "../modele/data_client"
import { UnProduit, DesProduits, TProduits } from "../modele/data_produit"
import { UnProduitDansFacture, LesProduitsDansFacture, TProduitDansFacture } from "../modele/data_produit"
import { UneLivraison, DesLivraisons, TLivraisons } from "../modele/data_livraison"



type TFactureEditForm = {
    divDetail: HTMLElement,
    divTitre: HTMLElement,
    divChoixTitre: HTMLElement
    edtNum: HTMLInputElement,
    edtLib: HTMLInputElement,
    edtDate: HTMLInputElement,
    edtClient: HTMLInputElement,
    edtLivraison: HTMLSelectElement,
    edtRemise: HTMLInputElement,
    btnRetour: HTMLInputElement,
    btnValider: HTMLInputElement,
    btnValiderContenue: HTMLInputElement,
    btnAnnuler: HTMLInputElement,
    lblDetailClient: HTMLLabelElement,
    lblNumErreur: HTMLLabelElement,
    lblEtageErreur: HTMLLabelElement,
    lblDeptErreur: HTMLLabelElement,
    lblEquiptErreur: HTMLLabelElement
    divFacture: HTMLDivElement,
    divFactureEdit: HTMLDivElement,
    btnAjouterFacture: HTMLInputElement,
    lblHt: HTMLLabelElement,
    lblRemise: HTMLLabelElement,
    lblTotal: HTMLLabelElement,
    tableContenue: HTMLTableElement
    listeContenue: HTMLSelectElement,
    edtQte: HTMLInputElement,
    edtContenueQte: HTMLElement
    btnValiderEquipt: HTMLInputElement,
    btnAnnulerEquipt: HTMLInputElement,
    lblDetailProduit: HTMLLabelElement,
    lblSelectEquiptErreur: HTMLLabelElement,
    lblQteErreur: HTMLLabelElement,
    prixLivraison: HTMLSpanElement
}

type TStatutValeur = 'correct' | 'vide' | 'inconnu' | 'doublon'

type TErreur = {
    statut: TStatutValeur,
    msg: { [key in TStatutValeur]: string }
}

class VueFactureEdit {
    private _grille: TProduitDansFacture
    private _form: TFactureEditForm
    private _params: string[];
    private _dataProduit: TProduits;
    private _dataFacture: TFactures;
    private _dataClient: TClients;
    private _dataLivraisons: TLivraisons
    private _erreur: { [key: string]: TErreur }

    get form(): TFactureEditForm {
        return this._form
    }
    get params(): string[] {
        return this._params
    }
    get erreur(): { [key: string]: TErreur } {
        return this._erreur
    }

    get grille(): TProduitDansFacture {
        return this._grille
    }

    set grille(grille: TProduitDansFacture) {
        this._grille = grille
    }

    init(form: TFactureEditForm) {
        this._form = form

        this._params = location.search.substring(1).split('&');
        let titre: string;
        switch (this.params[0]) {
            case 'suppr': titre = "Suppression d'une facture"; break;
            case 'ajout': titre = "Nouvelle facture"; break;
            case 'modif': titre = "Modification d'une facture"; break;
            default: titre = "Détail d'une facture";
        }
        this.form.divTitre.textContent = titre;

        this.form.edtNum.disabled= true;
        this.form.edtDate.disabled= true;
        
        this.form.divChoixTitre.hidden = true;
        this.form.btnRetour.hidden = true;
        this.form.listeContenue.style.display = "none";
        this.form.edtContenueQte.style.display = "none";

        const lesFactures = new LesFactures();
        this._dataFacture = lesFactures.all();

        const desProduits = new DesProduits();
        this._dataProduit = desProduits.all();

        const desClients = new DesClients();
        this._dataClient = desClients.all();

        const lesLivraisons = new DesLivraisons();
        this._dataLivraisons = lesLivraisons.all()

        this.genereNumFacture();
        this.setDateOfToday();

        const affi = this.params[0] === 'affi';
        const modif = this.params[0] === 'modif';
        if (this.params[0] !== 'ajout') {	// affi ou modif ou suppr
            const facture = lesFactures.byNumFacture(this._params[1]);
            const dataLivraisons : TLivraisons= this._dataLivraisons
            const uneLivraisons: UneLivraison = dataLivraisons[facture.livraison];
            this.form.edtNum.value = facture.numero;
            this.form.edtLib.value = facture.commentFact;
            this.form.edtDate.value = facture.date;
            this.form.edtClient.value = facture.client;
            this.form.edtRemise.value = facture.remise;
            this.form.edtLivraison.options.add(new Option(uneLivraisons.libForfait));


            this.form.edtNum.readOnly = true;
            this.form.edtLib.readOnly = affi;
            this.form.edtDate.readOnly = true;
            this.form.edtClient.readOnly = affi;
            this.form.edtRemise.readOnly = affi;
            this.form.edtLivraison.disabled = true;
            this.form.btnAnnuler.hidden = true;
            this.form.btnRetour.hidden = false;
            this.form.btnValider.hidden = true;
            if( this.params[0] ==='modif'){
            this.form.btnValider.hidden = false;
            this.form.edtLivraison.disabled = false;
            this.form.btnAnnuler.hidden = false;
            this.form.btnRetour.hidden = true;

            this.form.btnAnnuler.onclick = function(): void {
                vueFactureEdit.retourClick();
            }
            }
        }

        this.detailClient();
        //this.changerPrixLivraison();
        this.afficherContenue();

        this.afficheSelectLivraison(this._dataLivraisons);
        this.initMsgErreur();


        this.form.lblHt.textContent = "0.00" + "€";
        this.form.edtClient.onchange = function(): void {
            vueFactureEdit.detailClient()
        }
        this.form.listeContenue.onchange= function(): void {
            vueFactureEdit.detailProduit()
        }
        this.form.btnAjouterFacture.onclick = function(): void {
            vueFactureEdit.afficherFactureEdit();
        }
        this.form.btnAnnulerEquipt.onclick = function(): void {
            vueFactureEdit.masquerFactureEdit();
        }
        this.form.btnAnnuler.onclick = function(): void {
            vueFactureEdit.retourClick();
        }

        this.form.btnRetour.onclick = function(): void {
            vueFactureEdit.retourClick();
        }

        this.form.edtLivraison.onchange = function(): void {
            vueFactureEdit.changerPrixLivraison();
        }

        this.form.btnValiderContenue.onclick = function(): void {
            vueFactureEdit.afficherGrille();
        }

        this.form.btnValider.onclick = function(): void {
            vueFactureEdit.creerFacture();
        }
    }



    initMsgErreur(): void {
        this._erreur = {
            edtNum: {
                statut: 'vide', msg: {
                    correct: "",
                    vide: "Le numéro d'identifications doit être renseigné.",
                    inconnu: "Le numéro d'identification ne peut contenir que des chiffres.",
                    doublon: "Le numéro d'identification est déjà attribué."
                }
            }
            , edtEtage: {
                statut: 'vide', msg: {
                    correct: "",
                    vide: "La date doit être renseigné.",
                    inconnu: "",
                    doublon: ""
                }
            }
            , edtCodeClient: {
                statut: 'vide', msg: {
                    correct: "",
                    vide: "Le numéro du client doit être renseigné.",
                    inconnu: "Client inconnu.", doublon: ""
                }
            }
            , equipt: {
                statut: 'vide', msg: {
                    correct: "",
                    vide: "La facture doit contenir au moins un produit.",
                    inconnu: "",
                    doublon: ""
                }
            }
            , listeContenue: {
                statut: 'vide', msg: {
                    correct: "",
                    vide: "Aucun produit choisi",
                    inconnu: "",
                    doublon: ""
                }
            }
            , edtQte: {
                statut: 'vide', msg: {
                    correct: "",
                    vide: "La quantité doit être un nombre entier supérieur à 0",
                    inconnu: "",
                    doublon: ""
                }
            }
        }
    }

    afficherFactureEdit(): void {
        this.affichageProduit();
        this.form.listeContenue.style.display = "block";
        this.form.edtContenueQte.style.display = "block";
        this.form.btnAjouterFacture.hidden = true;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
        this.form.divChoixTitre.hidden = false;
    }

    masquerFactureEdit(): void {
        this.form.listeContenue.style.display = "none";
        this.form.edtContenueQte.style.display = "none";
        this.form.btnAjouterFacture.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
        this.form.divChoixTitre.hidden = true;
    }

    affichageProduit(): void {
        const dataProduit = this._dataProduit;
        for (let num in dataProduit) {
            const unProduit: UnProduit = dataProduit[num];
            this._form.listeContenue.options.add(new Option(unProduit.nom, unProduit.code));
        }
    }

    detailClient(): void {
        const dataClient = this._dataClient;
        const detail = this.form.lblDetailClient;
        const valeur = vueFactureEdit.form.edtClient.value
        const detailClient = dataClient[valeur];
        detail.textContent = "";
        const chaine: string = valeur.trim();
        if (chaine.length > 0) {
            if (detailClient["nom"] !== null) {	// client trouvé 
                detail.textContent
                    = detailClient["civ"] + " " + detailClient["nom"] + " " + detailClient["prenom"] + "\r\n" + detailClient["adr"] + " - " + detailClient["cp"] + " " + detailClient["commune"] + "\r\n" + detailClient["mel"] + "\r\n" + "taux de remise maximum accordé : " + detailClient["remiseMax"] + "%";
            }
        }
    }

    detailProduit(): void {
        const dataProduit = this._dataProduit;
        const detail = this.form.lblDetailProduit;
        const valeur = this.form.listeContenue.value
        const detailProduit = dataProduit[valeur];
        (detailProduit["nom"])
        if (detailProduit["nom"] !== "") {	// produit trouvé 
            detail.textContent
                = detailProduit["type"] + "\r\n" + detailProduit["cond"] + "cl" + "\r\n" + detailProduit["origine"] + "\r\n" + detailProduit["prixUnit"] + "€";
        }
    }

    afficheSelectLivraison(dataLivraisons: TLivraisons) {
        for (let num in dataLivraisons) {
            const uneLivraisons: UneLivraison = dataLivraisons[num];
            this._form.edtLivraison.options.add(new Option(uneLivraisons.libForfait, uneLivraisons.idForfait));
        }
    }

    changerPrixLivraison() {
        const id = this.form.edtLivraison.value;
        this.form.prixLivraison.textContent = this._dataLivraisons[id].libForfait + "," + this._dataLivraisons[id].mtForfait + "€";
    }

    retourClick(): void {
        location.href = "facture_liste.html";
    }

    afficherContenue() {
        while (this.form.tableContenue.rows.length > 1) {
            this.form.tableContenue.rows[1].remove();
        }
        const id = this.form.edtLivraison.value;
        let liv = 0;
        let ht = 0;
        let remise = 0;
        let total = 0;
        const dataProduit = this._dataProduit
        for (let num in this.grille) {
            const unProduitDansFacture = this._grille[num]
            const unProduit = dataProduit[unProduitDansFacture.code]
            const table = this.form.tableContenue as HTMLTableElement;
            const tr = table.insertRow()

            tr.insertCell().textContent = unProduit["code"];
            tr.insertCell().textContent = unProduit.nom;
            tr.insertCell().textContent = unProduit.type;
            tr.insertCell().textContent = unProduit.cond;
            tr.insertCell().textContent = unProduit.prixUnit;
            tr.insertCell().textContent = unProduitDansFacture.qte;
            tr.insertCell().textContent = unProduit.prixTotal(unProduitDansFacture.qte);

            const affi = this.params[0]==='affi'
            if (!affi){
            let balisea: HTMLAnchorElement; // déclaration balise <a>
            // création balise <a> pour appel modification équipement dans salle
            balisea = document.createElement("a")
            balisea.classList.add('img_modification')
            balisea.onclick = function(): void { vueFactureEdit.modifierProduitClick(unProduit.code); }
            tr.insertCell().appendChild(balisea)
            // création balise <a> pour appel suppression équipement dans salle
            balisea = document.createElement("a")
            balisea.classList.add('img_corbeille')
            balisea.onclick = function(): void { vueFactureEdit.supprimerProduitClick(unProduit.code); }
            tr.insertCell().appendChild(balisea)

            liv = parseInt(this._dataLivraisons[id].mtForfait, 10)
            ht += parseInt(unProduit.prixTotal(unProduitDansFacture.qte), 10);
            remise += (parseInt(this.form.edtRemise.value, 10) / 100) * ht;
            total += ht - remise + liv;
            }
        }
        this.form.lblHt.textContent = ht.toFixed(2) + "€";
        this.form.lblRemise.textContent = remise.toFixed(2) + "€";
        this.form.lblTotal.textContent = total.toFixed(2) + "€";
    }

    afficherGrille() {
        //this.verifQte();
        const produitValue = this.form.listeContenue.value;
        const unProduit = this._dataProduit[produitValue];

        const qte = this.form.edtQte.value;
        const nom = unProduit["nom"];
        const code = unProduit["code"];

        if (this._grille){
            this._grille = {};
        }

        const unProduitDansFacture = new UnProduitDansFacture(code.toString(), nom.toString(), qte.toString());

        this._grille[code] = unProduitDansFacture;

        this.afficherContenue();
    }

    creerFacture() {

        const com = this.form.edtLib.value
        const date = this.form.edtDate.value
        const numClient = this.form.edtClient.value
        const livraison = this.form.edtLivraison.value
        const remise = this.form.edtRemise.value

        const facture = new UneFacture("", date.toString(), com.toString(), numClient.toString(), "", "",
            remise.toString(), livraison.toString());
        const numFacture = facture.lastNumFact()
        facture.numero = numFacture;

        for (let num in this.grille) {
            const produit = this._grille[num]
            const unProduitDansFacture = new UnProduitDansFacture(produit.code, produit.nom, produit.qte);
            unProduitDansFacture.ajoutAFacture(numFacture, produit)
        }

        facture.insert();
        location.href = "facture_liste.html";

    }

    modifierProduitClick(id: string): void {
        // Afficher la section d'édition du produit
        this.affichageProduit();

        // Remplir les champs du formulaire avec les détails du produit
        const dataProduit = this._dataProduit;
        for (let num in dataProduit) {
            const unProduit: UnProduit = dataProduit[num];
            this._form.listeContenue.options.add(new Option(unProduit.nom, unProduit.code));

        }
    }

    supprimerProduitClick(code: string): void {
        if (confirm("Confirmez-vous le du produit de cet facture ")) {
            for (let num in this.grille) {
                if (this._grille[num]["code"] === code) {
                    delete this._grille[num];
                    this.afficherContenue();
                }
            }
        }
    }

    /*verifListeEquipt(): void {
        const err = this._erreur.listeContenue;
        err.statut = "correct";
        const cible = this._form.listeContenue;
        if (cible.value === "") {
            err.statut = 'vide'
        }
    }*/

    /*verifQte(): void {
        const err = this._erreur.edtQte
        err.statut = "correct";
        const valeur: string = this._form.edtQte.value;
        if (!((Number.isInteger(Number(valeur))) && (Number(valeur) > 0))) {
            err.statut = 'vide'
        }
    }*/

    setDateOfToday():void{
        const today = new Date();

        // Formater la date au format YYYY-MM-DD (ISO 8601)
        const formattedDate = today.toISOString().slice(0, 10);

        // Définir la valeur par défaut pour le champ de type date
        this.form.edtDate.value = formattedDate;
    }

    genereNumFacture():void{
        const uneFacture = new UneFacture;
        const valeur= uneFacture.lastNumFact()
        this.form.edtNum.value = valeur.toString();
    }
}
let vueFactureEdit = new VueFactureEdit;
export { vueFactureEdit };
//# sourceMappingURL=class_salle_edit.js.map
