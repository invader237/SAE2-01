import { UneLivraison } from "../modele/data_livraison.js";
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts";

// Tests pour l'identifiant du forfait
Deno.test("Création de livraison avec un identifiant valide", () => {
    const livraison = new UneLivraison("L123", "Livraison Standard", "50.00");
    assertEquals(livraison.idForfait, "L123");
});

Deno.test("Création de livraison avec un identifiant trop court", () => {
    assertThrows(() => {
        new UneLivraison("L1", "Livraison Standard", "50.00");
    }, Error, "L'identifiant doit être entre 3 et 6 caractères.");
});

Deno.test("Création de livraison avec un identifiant trop long", () => {
    assertThrows(() => {
        new UneLivraison("L1234567", "Livraison Standard", "50.00");
    }, Error, "L'identifiant doit être entre 3 et 6 caractères.");
});

// Tests pour le libellé du forfait
Deno.test("Création de livraison avec un libellé valide", () => {
    const livraison = new UneLivraison("L123", "Livraison Express", "100.00");
    assertEquals(livraison.libForfait, "Livraison Express");
});

Deno.test("Création de livraison avec un libellé trop court", () => {
    assertThrows(() => {
        new UneLivraison("L123", "Liv", "100.00");
    }, Error, "Le libellé doit contenir au moins 5 caractères.");
});

// Tests pour le montant du forfait
Deno.test("Création de livraison avec un montant valide", () => {
    const livraison = new UneLivraison("L123", "Livraison Standard", "45.00");
    assertEquals(livraison.mtForfait, "45.00");
});

Deno.test("Création de livraison avec un montant négatif", () => {
    assertThrows(() => {
        new UneLivraison("L123", "Livraison Standard", "-20.00");
    }, Error, "Le montant doit être un réel positif.");
});
