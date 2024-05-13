import { LesSalles } from "../modele/data_salle.js";
import { LesDepts } from "../modele/data_departement.js";
import { LesTypEquiptsBySalle } from "../modele/data_equipement.js";
class VueSalleListe {
    constructor() {
        // rien								
    }
    get form() { return this._form; }
    init(form) {
        this._form = form;
        const lesSalles = new LesSalles;
        const data = lesSalles.all();
        const lesDepts = new LesDepts();
        const lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
        // construction du titre
        this.form.divTitre.textContent = 'Liste des factures';
        for (let num in data) {
            const uneSalle = data[num];
            const tr = this.form.tableSalle.insertRow();
            let balisea; // dÃ©claration balise <a>
            // crÃ©ation balise <a> pour appel page visualisation du dÃ©tail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_visu');
            balisea.onclick = function () { vueSalleListe.detailSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea);
            tr.insertCell().textContent = uneSalle.numSalle;
            tr.insertCell().textContent = uneSalle.libSalle;
            tr.insertCell().textContent = uneSalle.etage;
            tr.insertCell().textContent = uneSalle.codeDept;
            tr.insertCell().textContent = lesDepts.byCodeDept(uneSalle.codeDept).nomDept;
            tr.insertCell().textContent = lesTypEquiptsBySalle.getTotalNbEquipt(lesTypEquiptsBySalle.byNumSalle(num));
            // crÃ©ation balise <a> pour appel page modification du dÃ©tail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_modification');
            balisea.onclick = function () { vueSalleListe.modifierSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea);
            // crÃ©ation balise <a> pour appel page suppression d'une salle
            balisea = document.createElement("a");
            balisea.classList.add('img_corbeille');
            balisea.onclick = function () { vueSalleListe.supprimerSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea);
        }
        // dÃ©finition Ã©vÃ©nement onclick sur bouton "ajouter"  
        this.form.btnAjouter.onclick = function () { vueSalleListe.ajouterSalleClick(); };
    }
    detailSalleClick(num, noLigne = -1) {
        location.href = "salle_edit.html?affi&" + encodeURIComponent(num);
    }
    modifierSalleClick(num) {
        location.href = "salle_edit.html?modif&" + encodeURIComponent(num);
    }
    supprimerSalleClick(num) {
        location.href = "salle_edit.html?suppr&" + encodeURIComponent(num);
    }
    ajouterSalleClick() {
        location.href = "salle_edit.html?ajout";
    }
}
let vueSalleListe = new VueSalleListe;
export { vueSalleListe };
//# sourceMappingURL=class_salle_liste.js.map