
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `contient`
-- ----------------------------
DROP TABLE IF EXISTS `contient`;
CREATE TABLE `contient` (
  `num_salle` varchar(5) NOT NULL,
  `id_equipt` int(11) NOT NULL,
  `qte` int(11) NOT NULL,
  PRIMARY KEY (`num_salle`,`id_equipt`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `departement`
-- ----------------------------
DROP TABLE IF EXISTS `DEPARTEMENT`;
CREATE TABLE `DEPARTEMENT` (
  `code_dept` varchar(5) NOT NULL,
  `nom_dept` varchar(50) NOT NULL,
  `resp_dept` varchar(30) NOT NULL,
  PRIMARY KEY (`code_dept`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `salle`
-- ----------------------------
DROP TABLE IF EXISTS `SALLE`;
CREATE TABLE `SALLE` (
  `num_salle` varchar(5) NOT NULL,
  `lib_salle` varchar(30) DEFAULT NULL,
  `etage` varchar(5) NOT NULL,
  `code_dept` varchar(5) NOT NULL,
  PRIMARY KEY (`num_salle`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `type_equipt`
-- ----------------------------
DROP TABLE IF EXISTS `TYPE_EQUIPT`;
CREATE TABLE `TYPE_EQUIPT` (
  `id_equipt` int(11) NOT NULL,
  `lib_equipt` varchar(30) NOT NULL,
  `commentaire` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_equipt`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `contient` VALUES ('F39','1','16'), ('F39','2','1'), ('F39','4','12'), ('F39','5','1'), ('F39','9','16'), ('F39','10','16'), ('F39','11','16')
,('B01','12','1'), ('B09','2','1'), ('B16','4','1'), ('B16','1','17'), ('B16','3','16'), ('C05','4','15'), ('C05','3','1'), ('E27','1','16'), ('E27','2','1')
,('C05','2','1'), ('C05','1','32'), ('C05','7','1'), ('E36','3','32');
INSERT INTO `DEPARTEMENT` VALUES ('GEA','Gestion des Entreprises et Administrations','M. RIBAUD'), ('TC','Techniques de Commercialisation','Mme TRAZONI'), ('INFO','Informatique','M. FLAGORETTE'), ('STID','Statistisques Traitements Informatiques Données','M. STATES'), ('IUT','IUT de Metz','Mme. TRITZ');
INSERT INTO `SALLE` VALUES ('B01','','RdC','TC'), ('B09','','RdC','INFO'), ('C05','','RdC','TC'), ('B16','Labo de langue','1','GEA'), ('E36','','3','INFO'), ('F39','machine PC','3','INFO'), ('E27','','2','STID');
INSERT INTO `TYPE_EQUIPT` VALUES ('1','chaise',''), ('2','bureau',''), ('3','table simple',''), ('4','table double',''), ('5','vidéo-projecteur',''), ('6','tableau VP','spécialement conçu pour VP'), ('7','tableau blanc',''), ('8','tableau craie',''), ('9','ordinateur',''), ('10','souris',''), ('11','clavier',''), ('12','téléviseur','');
