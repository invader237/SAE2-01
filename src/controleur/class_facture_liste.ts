import { UneFacture, LesFactures, TFactures } from "../modele/data_facture";

type TFactureListeForm = {
    divTitre: HTMLElement;
    btnAjouter: HTMLInputElement;
    tableFacture: HTMLTableElement;
}

class VueFactureListe {
    private _form: TFactureListeForm;
    private _donneListe: UneFacture;

    constructor() {

    }

    get form(): TFactureListeForm {
        return this._form
    }

    get donneListe(): UneFacture {
        return this._donneListe
    }

    init(form: TFactureListeForm): void {
        this._form = form

        const lesFactures = new LesFactures;
        const data: TFactures = lesFactures.all();
        this.affichageListe(data);
        this.form.btnAjouter.onclick = function(): void {
            vueFactureListe.ajouterFactureClick();
        }

    }
    detailFactureClick(code: string, noLigne = -1): void {
        location.href = "facture_edit.html?affi&" + encodeURIComponent(code);
    }
    modifierFactureClick(code: string): void {
        location.href = "facture_edit.html?modif&" + encodeURIComponent(code);
    }
    supprimerFactureClick(code: string): void {
        location.href = "facture_edit.html?suppr&" + encodeURIComponent(code);
    }
    ajouterFactureClick(): void {
        location.href = "facture_edit.html?ajout";
    }

    affichageListe(data: TFactures): void {

        for (let num in data) {
            const uneFacture: UneFacture = data[num];

            const tr = this.form.tableFacture.insertRow();
            let balisea: HTMLAnchorElement; // dÃ©claration balise <a>
            // crÃ©ation balise <a> pour appel page visualisation du dÃ©tail de la salle
            balisea = document.createElement("a")
            balisea.classList.add('img_visu')
            tr.insertCell().appendChild(balisea)

            tr.insertCell().textContent = uneFacture.numero;
            tr.insertCell().textContent = uneFacture.date;
            tr.insertCell().textContent = uneFacture.client;
            tr.insertCell().textContent = uneFacture.nomClient;
            tr.insertCell().textContent = uneFacture.prix;
            tr.insertCell().textContent = uneFacture.avecRemise();
            tr.insertCell().textContent = uneFacture.livraison;

            // crÃ©ation balise <a> pour appel page modification du dÃ©tail de la salle
            balisea = document.createElement("a")
            balisea.classList.add('img_modification')
            balisea.onclick = function(): void { vueFactureListe.modifierFactureClick(vueFactureListe.donneListe.numero.toString()); }
            tr.insertCell().appendChild(balisea)
            // crÃ©ation balise <a> pour appel page suppression d'une salle
            balisea = document.createElement("a")
            balisea.classList.add('img_corbeille')
            balisea.onclick = function(): void { vueFactureListe.supprimerFactureClick(vueFactureListe.donneListe.numero.toString()); }
            tr.insertCell().appendChild(balisea)

        }

    }
}

let vueFactureListe = new VueFactureListe;
export { vueFactureListe }
