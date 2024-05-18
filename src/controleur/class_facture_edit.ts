import { UneFacture, LesFactures, TFactures } from "../modele/data_facture"
import { UnClient, DesClients, TClients } from "../modele/data_client"
import { UnProduit, DesProduits, TProduits } from "../modele/data_produit"
import { UnProduitDansFacture, LesProduitsDansFacture, TProduitDansFacture } from "../modele/data_produit"
import { UneLivraison, DesLivraisons, TLivraisons } from "../modele/data_livraison"



type TFactureEditForm = {
    divDetail: HTMLElement,
    divTitre: HTMLElement,
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

type TUnProduitDansFacture = {

}

class VueFactureEdit {
    private _grille: TUnProduitDansFacture
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

    get grille(): TUnProduitDansFacture {
        return this._grille
    }

    init(form: TFactureEditForm) {
        this._form = form

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

        this.afficheSelectLivraison()
        //this.affichageListe();
        //this.selectLivraison();
        //this.initMsgErreur();

        this.form.edtClient.onchange = function(): void {
            vueFactureEdit.detailClient()
        }
        this.form.listeContenue.onchange = function(): void {
            vueFactureEdit.detailProduit()
        }
        this.form.btnAjouterFacture.onclick = function(): void {
            vueFactureEdit.afficherFactureEdit();
        }
        this.form.btnRetour.onclick = function(): void {
            vueFactureEdit.retourClick();
        }

        this.form.edtLivraison.onchange = function(): void {
            vueFactureEdit.changerPrixLivraison();
        }

        this.form.btnValiderContenue.onclick = function(): void {
            vueFactureEdit.afficherContenue();
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
            , listeEquipt: {
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
    }

    affichageProduit(): void {
        const dataProduit = this._dataProduit;
        for (let num in dataProduit) {
            const unProduit: UnProduit = dataProduit[num];
            this._form.listeContenue.options.add(new Option(unProduit.nom, unProduit.code));
        }
    }

    detailClient(): void {
        // a réecrire/améliorer
        const dataClient = this._dataClient;
        const detail = this.form.lblDetailClient;
        const valeur = vueFactureEdit.form.edtClient.value
        const detailClient = dataClient[valeur];
        (detailClient["nom"])
        if (detailClient["nom"] !== "") {	// département trouvé 
            detail.textContent
                = detailClient["civ"] + " " + detailClient["nom"] + " " + detailClient["prenom"] + "\r\n" + detailClient["adr"] + " - " + detailClient["cp"] + " " + detailClient["commune"] + "\r\n" + detailClient["mel"] + "\r\n" + "taux de remise maximum accordé : " + detailClient["remiseMax"] + "%";
        }
    }

    detailProduit(): void {
        // a réecrire/améliorer
        const dataProduit = this._dataProduit;
        const detail = this.form.lblDetailProduit;
        const valeur = this.form.listeContenue.value
        const detailProduit = dataProduit[valeur];
        (detailProduit["nom"])
        if (detailProduit["nom"] !== "") {	// département trouvé 
            detail.textContent
                = detailProduit["type"] + "\r\n" + detailProduit["cond"] + "cl" + "\r\n" + detailProduit["origine"] + "\r\n" + detailProduit["prixUnit"] + "€";
        }
    }

    afficheSelectLivraison() {
        const dataLivraisons = this._dataLivraisons;
        for (let num in dataLivraisons) {
            const uneLivraisons: UneLivraison = dataLivraisons[num];
            this._form.edtLivraison.options.add(new Option(uneLivraisons.libForfait, uneLivraisons.idForfait));
        }
    }

    changerPrixLivraison() {
        const id = this.form.edtLivraison.value;
        this.form.prixLivraison.textContent = this._dataLivraisons[id].mtForfait + "€";

    }

    retourClick(): void {
        location.href = "salle_liste.html";
    }

    afficherContenue() {
        const produitValue = this.form.listeContenue.value
        const unProduit = this._dataProduit[produitValue]

        const qte = this.form.edtQte.value

        const table = this.form.tableContenue as HTMLTableElement;
        const tr = table.insertRow()

        tr.insertCell().textContent = unProduit["code"];
        tr.insertCell().textContent = unProduit.nom;
        tr.insertCell().textContent = unProduit.type;
        tr.insertCell().textContent = unProduit.cond;
        tr.insertCell().textContent = unProduit.prixUnit;
        tr.insertCell().textContent = qte;
        tr.insertCell().textContent = unProduit.prixTotal(qte);

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
    }

    creerFacture() {
        const com = this.form.edtLib.value
        const date = this.form.edtDate.value
        const numClient = this.form.edtClient.value
        const livraison = this.form.edtLivraison.value
        const remise = this.form.edtRemise.value

        const facture = new UneFacture('10', date.toString(), com.toString(), numClient.toString(), "", "",
            remise.toString(), livraison.toString());
        alert(facture.numero + facture.date + facture.commentFact + facture.remise + facture.client + facture.livraison)
        const lesFactures = new LesFactures;
        lesFactures.insert(facture)
    }



    modifierProduitClick(id: string): void {
        // Afficher la section d'édition du produit
        this.affichageProduit();

        // Remplir les champs du formulaire avec les détails du produit
        const dataProduit = this._dataProduit;
        const num = id
        for (let num in dataProduit) {
            const unProduit: UnProduit = dataProduit[num];
            this._form.listeContenue.options.add(new Option(unProduit.nom, unProduit.code));

        }
    }

    supprimerProduitClick(id: string): void {

    }

    convertir_date(date:string): string {
        jour, mois, annee = date.split('/')
        return f"{annee}/{mois}/{jour}"
    }
}
let vueFactureEdit = new VueFactureEdit;
export { vueFactureEdit };
//# sourceMappingURL=class_salle_edit.js.map
