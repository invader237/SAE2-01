import { vueFactureListe } from "./class_facture_liste";

vueFactureListe.init( { 
    divTitre: document.querySelector('[id=div_facture_liste_titre]')
    ,btnAjouter: document.querySelector('[id=btn_facture_ajouter]')
    ,tableFacture: document.querySelector('[id=table_facture]')
    });
