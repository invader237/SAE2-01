import { UneFacture } from "../modele/data_facture.js";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.220.0/assert/mod.ts";

Deno.test("Test création de facture avec numéro valide", () => {
  const facture = new UneFacture("100", "2021-04-01", "Commentaire", "1", "Client A", "1000", "10", "1");
  assertEquals(facture.numero, "100");
});

Deno.test("Test création de facture avec numéro invalide", () => {
  assertThrows(() => {
    new UneFacture("-1", "2021-04-01", "Commentaire", "1", "Client A", "1000", "10", "1");
  }, Error, "Le numéro de la facture doit être un entier supérieur à 0.");
});

Deno.test("Test création de facture avec date valide", () => {
  const facture = new UneFacture("100", "2021-04-01", "Commentaire", "1", "Client A", "1000", "10", "1");
  assertEquals(facture.date, "2021-04-01");
});

Deno.test("Test création de facture avec date invalide", () => {
  assertThrows(() => {
    new UneFacture("100", "2021-02-30", "Commentaire", "1", "Client A", "1000", "10", "1");
  }, Error, "La date de la facture est invalide.");
});

Deno.test("Test taux de remise valide", () => {
  const facture = new UneFacture("100", "2021-04-01", "Commentaire", "1", "Client A", "1000", "10", "1");
  assertEquals(facture.remise, "10");
});

Deno.test("Test taux de remise invalide (hors limites)", () => {
  assertThrows(() => {
    new UneFacture("100", "2021-04-01", "Commentaire", "1", "Client A", "1000", "110", "1");
  }, Error, "Le taux de remise doit être entre 0 et 100.");
});

Deno.test("Test vérification du client associé valide", () => {
  const facture = new UneFacture("100", "2021-04-01", "Commentaire", "1", "Client A", "1000", "10", "1");
  assertEquals(facture.client, "1");
});

Deno.test("Test vérification du forfait livraison associé valide", () => {
  const facture = new UneFacture("100", "2021-04-01", "Commentaire", "1", "Client A", "1000", "10", "1");
  assertEquals(facture.livraison, "1");
});

// Vous pouvez ajouter plus de tests pour d'autres fonctionnalités ou méthodes comme la méthode `avecRemise()`.
