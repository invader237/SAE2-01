import * as APIsql from "../modele/sqlWeb.js"

APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~e9486u/ihm/SAE/vue/",
						"https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/")
class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec votre nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','e9486u_SAE201', 'e9486u_appli','32314477', 'utf8')
	}
}
let connexion = new Connexion;

export {connexion, APIsql}

