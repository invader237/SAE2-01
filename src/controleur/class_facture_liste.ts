type TFactureListeForm = {
    divTitre: HTMLElement;
    btnAjouter: HTMLInputElement;
    tableFacture: HTMLTableElement;
}

class DonneListe {
    private _numero: number;
    private _date: Date;
    private _client: number;
    private _nomClient: string;
    private _prix: number;
    private _remise: number;
    private _livraison: number;

    constructor(numero: number, date: Date, client: number, nomClient: string,prix:number, remise: number, livraison: number) {
        this._numero = numero;
        this._date = date;
        this._client = client;
        this._nomClient = nomClient;
        this._prix = prix;
        this._remise = remise;
        this._livraison = livraison;
    }

    avecRemise():number{
        return this._prix-this._prix*this._remise
    }   

    get numero():number{
        return this._numero
    }

    get date():Date{
        return this._date
    }

    get client():number{
        return this._client
    }

    get nomClient(): string{
        return this._nomClient
    }
    
    get prix():number{
        return this._prix
    }

    get remise():number{
        return this._remise
    }

    get livraison():number{
        return this._livraison
    }

    set numero(numero:number){
        this._numero=numero
    }
    set date(date:Date){
        this._date=date
    }
    set client(client:number){
        this._client=client
    }
    set nomClient(nomClient:string){
        this._nomClient=nomClient
    }
    set prix(prix:number){
        this._prix=prix
    }
    set remise(remise:number){
        this._remise=remise
    }
    set livraison(livraison:number){
        this._livraison=livraison
    }

}

export { DonneListe };

class VueFactureListe {
    private _form : TFactureListeForm;
    private _donneListe: DonneListe;

    constructor(){
    }

    get form() : TFactureListeForm { 
        return this._form 
    }

    get donneListe():DonneListe{
        return this._donneListe
    }

    init(form: TFactureListeForm) : void {
        this._form=form
        const dateString: Date = new Date('2024-05-13');
        this._donneListe= new DonneListe(15,dateString ,46,"Bozo",150,0.5,86)
        this.affichageListe();
        this.form.btnAjouter.onclick = function(): void {
            vueFactureListe.ajouterFactureClick();
        }
    }
    detailFactureClick(code : string,  noLigne = -1):void {
        location.href = "facture_edit.html?affi&" +encodeURIComponent(code);
    }
    modifierFactureClick(code : string):void {
        location.href = "facture_edit.html?modif&" +encodeURIComponent(code);
    }
    supprimerFactureClick(code : string):void {
        location.href = "facture_edit.html?suppr&" +encodeURIComponent(code);
    }
    ajouterFactureClick():void {
        alert("test2")
        location.href = "facture_edit.html?ajout";
    }

    affichageListe():void{
            alert("1")
        	const tr = this.form.tableFacture.insertRow();
            let balisea : HTMLAnchorElement; // dÃ©claration balise <a>
			// crÃ©ation balise <a> pour appel page visualisation du dÃ©tail de la salle
			balisea = document.createElement("a")
			balisea.classList.add('img_visu')
            alert("2")
			tr.insertCell().appendChild(balisea)

			tr.insertCell().textContent = this.donneListe.numero.toString();
			tr.insertCell().textContent = this.donneListe.date.toString();
			tr.insertCell().textContent = this.donneListe.client.toString();
            tr.insertCell().textContent = this.donneListe.nomClient;
            tr.insertCell().textContent = this.donneListe.prix.toString();
			tr.insertCell().textContent = this.donneListe.avecRemise().toString();
            tr.insertCell().textContent = this.donneListe.livraison.toString();

            // crÃ©ation balise <a> pour appel page modification du dÃ©tail de la salle
			balisea = document.createElement("a")
			balisea.classList.add('img_modification')
			balisea.onclick = function():void { vueFactureListe.modifierFactureClick(vueFactureListe.donneListe.numero.toString()); }
			tr.insertCell().appendChild(balisea)
			// crÃ©ation balise <a> pour appel page suppression d'une salle
			balisea = document.createElement("a")
			balisea.classList.add('img_corbeille')
			balisea.onclick = function():void { vueFactureListe.supprimerFactureClick(vueFactureListe.donneListe.numero.toString()); }
			tr.insertCell().appendChild(balisea)	
			
    }

}

let vueFactureListe = new VueFactureListe;

export {vueFactureListe}