"use strict";
// dans les outils de dÃ©veloppement, dÃ©sactiver le cache pour forcer le chargement des fichiers js et css 
// sur Firefox : cocher la case "DÃ©sactiver le cache"
// test pour ne dÃ©finir que la classe et l'objet une seule fois sinon redÃ©claration ==> erreur
// dÃ©finition de la classe 
class VueInventaire {
    init() {
        location.href = "salle_liste.html";
    }
}
let vueInventaire = new VueInventaire;
vueInventaire.init();
//# sourceMappingURL=inventaire.js.map