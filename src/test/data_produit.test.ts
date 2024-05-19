import { UnProduit } from "../modele/data_produit.js";
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts";

// Test pour le code du produit
Deno.test("Création produit avec code valide", () => {
    const produit = new UnProduit("12345", "Eau Minérale", "plate", "France", "50", "1.5");
    assertEquals(produit.code, "12345");
});

Deno.test("Création produit avec code trop court", () => {
    assertThrows(() => {
        new UnProduit("12", "Eau Minérale", "plate", "France", "50", "1.5");
    }, Error, "Le code produit doit contenir entre 3 et 8 caractères.");
});

Deno.test("Création produit avec code trop long", () => {
    assertThrows(() => {
        new UnProduit("123456789", "Eau Minérale", "plate", "France", "50", "1.5");
    }, Error, "Le code produit doit contenir entre 3 et 8 caractères.");
});

// Test pour le nom du produit
Deno.test("Création produit avec nom valide", () => {
    const produit = new UnProduit("1234", "Eau Minérale", "plate", "France", "50", "1.5");
    assertEquals(produit.nom, "Eau Minérale");
});

Deno.test("Création produit avec nom trop court", () => {
    assertThrows(() => {
        new UnProduit("1234", "Eau", "plate", "France", "50", "1.5");
    }, Error, "Le nom du produit doit contenir au moins 4 caractères.");
});

// Test pour le type du produit
Deno.test("Création produit avec type valide", () => {
    const produit = new UnProduit("1234", "Eau Minérale", "plate", "France", "50", "1.5");
    assertEquals(produit.type, "plate");
});

Deno.test("Création produit avec type invalide", () => {
    assertThrows(() => {
        new UnProduit("1234", "Eau Minérale", "gazeuse", "France", "50", "1.5");
    }, Error, "Le type de produit doit être 'plate' ou 'pétillante'.");
});

// Test pour l'origine du produit
Deno.test("Création produit avec origine valide", () => {
    const produit = new UnProduit("1234", "Eau Minérale", "plate", "France", "50", "1.5");
    assertEquals(produit.origine, "France");
});

Deno.test("Création produit avec origine invalide", () => {
    assertThrows(() => {
        new UnProduit("1234", "Eau Minérale", "plate", "Fr", "50", "1.5");
    }, Error, "L'origine du produit doit contenir au moins 3 caractères.");
});

// Test pour le conditionnement
Deno.test("Création produit avec conditionnement valide", () => {
    const produit = new UnProduit("1234", "Eau Minérale", "plate", "France", "50", "1.5");
    assertEquals(produit.cond, "50");
});

Deno.test("Création produit avec conditionnement invalide (trop petit)", () => {
    assertThrows(() => {
        new UnProduit("1234", "Eau Minérale", "plate", "France", "10", "1.5");
    }, Error, "Le conditionnement doit être un nombre entre 25 et 200.");
});

Deno.test("Création produit avec conditionnement invalide (trop grand)", () => {
    assertThrows(() => {
        new UnProduit("1234", "Eau Minérale", "plate", "France", "300", "1.5");
    }, Error, "Le conditionnement doit être un nombre entre 25 et 200.");
});

// Test pour le prix unitaire
Deno.test("Création produit avec prix unitaire valide", () => {
    const produit = new UnProduit("1234", "Eau Minérale", "plate", "France", "50", "1.5");
    assertEquals(produit.prixUnit, "1.5");
});

Deno.test("Création produit avec prix unitaire invalide (négatif)", () => {
    assertThrows(() => {
        new UnProduit("1234", "Eau Minérale", "plate", "France", "50", "-1");
    }, Error, "Le prix unitaire doit être un nombre positif.");
});
