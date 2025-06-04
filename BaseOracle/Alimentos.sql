--------------------------------------------------------
-- Archivo creado  - miércoles-junio-04-2025   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table ALIMENTOS
--------------------------------------------------------

  CREATE TABLE "CHEDYS"."ALIMENTOS" 
   (	"ID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"NOMBRE" VARCHAR2(100 BYTE), 
	"PRECIO" FLOAT(53), 
	"TIPO" VARCHAR2(20 BYTE), 
	"DESCRIPCION" VARCHAR2(255 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into CHEDYS.ALIMENTOS
SET DEFINE OFF;
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (1,'Enfrijoladas',55,'Comida','Enchiladas mexicanas');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (3,'Tamales de Amarillo',38,'Comida','Tamales tradicionales');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (4,'Coca Cola ',20,'Bebida','Refresco de cola 600 ml');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (5,'Jugo de Naranja',25,'Bebida','Jugo natural de naranja');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (6,'Pastel de Chocolate',35,'Postre','Pastel con cobertura de chocolate');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (7,'Flan',22,'Postre','Flan casero con caramelo');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (21,'Mole Negro',70,'Comida','Mole negro con pollo acompañado con arroz blanco');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (22,'Pizza Pepperoni',120,'Comida','Pizza grande de 8 rebanadas');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (23,'Pizza Hawaiana',120,'Comida','Pizza grande de 8 rebanadas ');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (24,'Empanizado de Pollo',55,'Comida','Pollo empanizado acompañado de arroz blanco y frijoles');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (25,'Huevo con Chorizo',55,'Comida','Huevos con Chorizo acompañados con frijoles');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (26,'Carlota',15,'Postre','Carlota de limón o vainilla');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (27,'Tartaaa',25,'Postre','Tarta de frutas de temporada');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (28,'Sprint',25,'Bebida','Refresco de lata 355 ml');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (29,'Limonada',30,'Bebida','Limonada vaso de 400 ml');
Insert into CHEDYS.ALIMENTOS (ID,NOMBRE,PRECIO,TIPO,DESCRIPCION) values (30,'Ensalada de Frutas',15,'Postre','La ensalada de frutas son manzana, zanaoria y nuez cortado en pedacitos con crema');
--------------------------------------------------------
--  DDL for Index SYS_C007500
--------------------------------------------------------

  CREATE UNIQUE INDEX "CHEDYS"."SYS_C007500" ON "CHEDYS"."ALIMENTOS" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table ALIMENTOS
--------------------------------------------------------

  ALTER TABLE "CHEDYS"."ALIMENTOS" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "CHEDYS"."ALIMENTOS" MODIFY ("NOMBRE" NOT NULL ENABLE);
  ALTER TABLE "CHEDYS"."ALIMENTOS" MODIFY ("PRECIO" NOT NULL ENABLE);
  ALTER TABLE "CHEDYS"."ALIMENTOS" MODIFY ("TIPO" NOT NULL ENABLE);
  ALTER TABLE "CHEDYS"."ALIMENTOS" ADD CHECK (precio >= 0) ENABLE;
  ALTER TABLE "CHEDYS"."ALIMENTOS" ADD CHECK (tipo IN ('Comida', 'Bebida', 'Postre')) ENABLE;
  ALTER TABLE "CHEDYS"."ALIMENTOS" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
