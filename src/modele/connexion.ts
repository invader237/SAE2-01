import * as APIsql from "../modele/sqlWeb.js"

APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~trivino7u/ihm/SAE/vue/",
						"https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/")
class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec votre nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','trivino7u_SAE2-01', 'trivino7u_appli','leadiego', 'utf8')
	}
}
let connexion = new Connexion;

export {connexion, APIsql}

