import { vueFactureEdit } from "./class_facture_edit";

vueFactureEdit.init( {
                     divDetail      :document.querySelector('[id=div_facture_detail]')
                    ,edtNum			:document.querySelector('[id=edt_facture_num]')
                    ,divTitre		:document.querySelector('[id=div_facture_titre]')
                    ,edtLib			:document.querySelector('[id=edt_facture_lib]')
                    ,edtDate		:document.querySelector('[id=edt_facture_date]')
                    ,edtClient	:document.querySelector('[id=edt_facture_num_client]')
                    ,edtLivraison: document.querySelector('[id=edt_delivery]')
                    ,edtRemise: document.querySelector('[id=edt_discount]')
                    ,btnRetour		:document.querySelector('[id=btn_facture_retour]')
                    ,btnValider		:document.querySelector('[id=btn_facture_valider]')
                    ,btnAnnuler		:document.querySelector('[id=btn_facture_annuler]')	
                    ,lblDetailClient:document.querySelector('[id=lbl_facture_detail_client]')
                    ,lblNumErreur	:document.querySelector('[id=lbl_erreur_num]')
                    ,lblEtageErreur	:document.querySelector('[id=lbl_erreur_etage]')
                    ,lblDeptErreur	:document.querySelector('[id=lbl_erreur_dept]')
                    ,lblEquiptErreur:document.querySelector('[id=lbl_erreur_equipt]') 
                    ,divFacture   :document.querySelector('[id=div_facture_contenue]') 
                    ,divFactureEdit :document.querySelector('[id=div_facture_contenue_edit]')  
                    ,btnAjouterFacture:document.querySelector('[id=btn_contenue_ajouter]')
                    ,lblTotal       :document.querySelector('[id=lbl_contenue_total]')
                    ,tableContenue:document.querySelector('[id=table_contenue]')
                    ,listeContenue    :document.querySelector('[id=select_contenue]')
                    ,edtQte         :document.querySelector('[id=edt_equipement_qte]')
                    ,edtContenueQte :document.querySelector('[id=contenue_qte]')
                    ,btnValiderEquipt:document.querySelector('[id=btn_equipement_valider]')
                    ,btnAnnulerEquipt:document.querySelector('[id=btn_equipement_annuler]')
                    ,lblSelectEquiptErreur:document.querySelector('[id=lbl_erreur_select_contenue]')
                    ,lblQteErreur   :document.querySelector('[id=lbl_erreur_qte]')
                    ,prixLivraison : document.querySelector('[id=delivery_fee]')
                    } );


// définition des événements
/*
vueSalleEdit.form.edtCodeDept.addEventListener  ('change',  function () { vueSalleEdit.detailDepartement(vueSalleEdit.form.edtCodeDept.value); });
vueSalleEdit.form.btnRetour.addEventListener    ('click',   function () { vueSalleEdit.retourClick(); });  
vueSalleEdit.form.btnAnnuler.addEventListener   ('click',   function () { vueSalleEdit.retourClick(); });
vueSalleEdit.form.btnValider.addEventListener   ('click',   function () { vueSalleEdit.validerClick(); }); 
vueSalleEdit.form.btnAjouterEquipt.addEventListener   ('click',   function () { vueSalleEdit.ajouterEquiptClick(); }); 
vueSalleEdit.form.btnValiderEquipt.addEventListener   ('click',   function () { vueSalleEdit.validerEquiptClick(); }); 
vueSalleEdit.form.btnAnnulerEquipt.addEventListener   ('click',   function () { vueSalleEdit.annulerEquiptClick(); }); 
*/
