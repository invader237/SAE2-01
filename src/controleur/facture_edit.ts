import { vueFactureEdit } from "./class_Facture_edit.";

vueFactureEdit.init( {
                     divDetail      :document.querySelector('[id=div_facture_detail]')
                    ,edtNum			:document.querySelector('[id=edt_facture_num]')
                    ,divTitre		:document.querySelector('[id=div_facture_titre]')
                    ,edtCom			:document.querySelector('[id=edt_facture_lib]')
                    ,edtDate		:document.querySelector('[id=edt_facture_date]')
                    ,edtClient	:document.querySelector('[id=edt_facture_num_client]')
                    ,edtLivraison: document.querySelector('[id=edt_delivery]')
                    ,edtRemise: document.querySelector('[id=edt_discount]')
                    ,btnRetour		:document.querySelector('[id=btn_facture_retour]')
                    ,btnValider		:document.querySelector('[id=btn_facture_valider]')
                    ,btnAnnuler		:document.querySelector('[id=btn_facture_annuler]')	
                    ,lblDetailDept	:document.querySelector('[id=lbl_facture_detail_dept]')
                    ,lblNumErreur	:document.querySelector('[id=lbl_erreur_num]')
                    ,lblEtageErreur	:document.querySelector('[id=lbl_erreur_etage]')
                    ,lblDeptErreur	:document.querySelector('[id=lbl_erreur_dept]')
                    ,lblEquiptErreur:document.querySelector('[id=lbl_erreur_equipt]') 
                    ,divFactureEquipt     :document.querySelector('[id=div_facture_equipement]') 
                    ,divFactureEquiptEdit :document.querySelector('[id=div_facture_equipement_edit]')  
                    ,btnAjouterEquipt:document.querySelector('[id=btn_equipement_ajouter]')
                    ,lblTotal       :document.querySelector('[id=lbl_equipement_total]')
                    ,tableEquipement:document.querySelector('[id=table_equipement]')
                    ,listeEquipt    :document.querySelector('[id=select_equipement]')
                    ,edtQte         :document.querySelector('[id=edt_equipement_qte]')
                    ,btnValiderEquipt:document.querySelector('[id=btn_equipement_valider]')
                    ,btnAnnulerEquipt:document.querySelector('[id=btn_equipement_annuler]')
                    ,lblSelectEquiptErreur:document.querySelector('[id=lbl_erreur_select_equipement]')
                    ,lblQteErreur   :document.querySelector('[id=lbl_erreur_qte]')
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
