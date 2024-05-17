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
        this.form.btnAjouterFacture.onclick = function(): void {
            vueFactureEdit.afficherFactureEdit();
        }
        this.form.btnRetour.onclick = function(): void {
            vueFactureEdit.retourClick();
        }
        this.form.edtLivraison.onchange = function(): void {
            vueFactureEdit.changerPrixLivraison();
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

    affichageListe(): void {
        //a terminer 
        const tr = this.form.tableContenue.insertRow();
        //a supp
        let balisea: HTMLAnchorElement; // dÃ©claration balise <a>
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

    /*
    affiGrilleProduit(): void {
        const tr = this.form.tableContenue.insertRow();
        let balisea: HTMLAnchorElement; // déclaration balise <a>
        // création balise <a> pour appel modification équipement dans salle
        balisea = document.createElement("a")
        balisea.classList.add('img_modification')
        balisea.onclick = function(): void { vueFactureEdit.modifierEquiptClick(id); }
        tr.insertCell().appendChild(balisea)
        // création balise <a> pour appel suppression équipement dans salle
        balisea = document.createElement("a")
        balisea.classList.add('img_corbeille')
        balisea.onclick = function(): void { vueFactureEdit.supprimerEquiptClick(id); }
        tr.insertCell().appendChild(balisea)
    } */

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

    afficheSelectLivraison() {
        const dataLivraisons = this._dataLivraisons;
        for (let num in dataLivraisons) {
            const uneLivraisons: UneLivraison = dataLivraisons[num];
            this._form.edtLivraison.options.add(new Option(uneLivraisons.libForfait, uneLivraisons.idForfait));
        }
    }

    changerPrixLivraison() {
        const id = this.form.edtLivraison.value;
        this.form.prixLivraison.textContent = this._dataLivraisons[id].mtForfait;

    }

    retourClick(): void {
        location.href = "salle_liste.html";
    }
/*
    modifierEquiptClick(id: string): void {
        this.afficherFactureEdit();
        this.form.listeContenue.length = 0;
        this.form.listeContenue.options.add(new Option(this._unProduit.nom, this._unProduit.code.toString()));	// text, value = 0;
        this.form.listeContenue.selectedIndex = 0;
    }
*/
}

let vueFactureEdit = new VueFactureEdit;
export { vueFactureEdit };
//# sourceMappingURL=class_salle_edit.js.map
