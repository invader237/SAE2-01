import { UnClient } from "../modele/data_client.js";
import {
  assertEquals  ,assertThrows,

} from "https://deno.land/std@0.220.0/assert/mod.ts";

// Test de validation des civilités
Deno.test("Test civilite valide (M.)", () => {
    const client = new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "123 Main St, Anytown", "12345", "Anytown", "10");
    assertEquals(client.civ, "M.");
  });
  
  Deno.test("Test civilite valide (Mme)", () => {
    const client = new UnClient("1", "Mme", "Doe", "Jane", "jane.doe@example.com", "123 Main St, Anytown", "12345", "Anytown", "10");
    assertEquals(client.civ, "Mme");
  });
  
  Deno.test("Test civilite invalide", () => {
    assertThrows(() => {
      new UnClient("1", "Ms", "Doe", "Jane", "jane.doe@example.com", "123 Main St, Anytown", "12345", "Anytown", "10");
    }, Error, "La civilité indiquée n'est pas autorisée !");
  });
  
  // Tests pour l'email valide et invalide
  Deno.test("Test email valide", () => {
    const client = new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "123 Main St, Anytown", "12345", "Anytown", "10");
    assertEquals(client.mel, "john.doe@example.com");
  });
  
  Deno.test("Test email invalide", () => {
    assertThrows(() => {
      new UnClient("1", "M.", "Doe", "John", "johndoecom", "123 Main St, Anytown", "12345", "Anytown", "10");
    }, Error, "L'adresse email doit contenir un '@'.");
  });
  
  // Tests pour la validation de l'adresse
  Deno.test("Test adresse valide", () => {
    const client = new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "123 Main Street, Anytown", "12345", "Anytown", "10");
    assertEquals(client.adr, "123 Main Street, Anytown");
  });
  
  Deno.test("Test adresse invalide (trop courte)", () => {
    assertThrows(() => {
      new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "Main St", "12345", "Anytown", "10");
    }, Error, "L'adresse doit contenir au moins 15 caractères.");
  });
  
  // Tests pour la commune
  Deno.test("Test commune valide", () => {
    const client = new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "123 Main Street, Anytown", "12345", "Anytown", "10");
    assertEquals(client.commune, "Anytown");
  });
  
  Deno.test("Test remiseMax valide", () => {
    const client = new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "123 Main Street, Anytown", "12345", "Anytown", "90");
    assertEquals(client.remiseMax, "90");
  });
  
  Deno.test("Test remiseMax invalide (supérieur à 100)", () => {
    assertThrows(() => {
      new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "123 Main Street, Anytown", "12345", "Anytown", "101");
    }, Error, "Le taux de remise doit être entre 0 et 100.");
  });
  
  // Test pour les noms et prénoms valides et invalides
  Deno.test("Test nom valide", () => {
    const client = new UnClient("1", "M.", "Doe", "John", "john.doe@example.com", "123 Main Street, Anytown", "12345", "Anytown", "10");
    assertEquals(client.nom, "Doe");
  });
  
  Deno.test("Test nom invalide (trop court)", () => {
    assertThrows(() => {
      new UnClient("1", "M.", "D", "John", "john.doe@example.com", "123 Main Street, Anytown", "12345", "Anytown", "10");
    }, Error, "Le nom et le prénom doivent contenir au moins 2 caractères alphabétiques.");
  });
  
  Deno.test("Test prénom invalide (trop court)", () => {
    assertThrows(() => {
      new UnClient("1", "M.", "Doe", "J", "john.doe@example.com", "123 Main Street, Anytown", "12345", "Anytown", "10");
    }, Error, "Le nom et le prénom doivent contenir au moins 2 caractères alphabétiques.");
  });
  
