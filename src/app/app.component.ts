// Importierung der erfordelichen Modulen.

import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


/**
 * Hier verwende ich Reactiveformular für folgende Grunde:
 * 1. Ich habe gelesen, dass Templateformular nur für die Abwärtskompabilität zu wahren
 * 2. Reactiveformular erlaubt bessere Skalierbarkeit der Applikation
 */

@Component({
  selector: "app-root",
  // Erhalten unseres View von app.component.html.
  templateUrl: "./app.component.html",
  // Das CSS-Stil für dieses Formular.
  styleUrls: ["./app.component.css"],
  // Wir entwicklen dieses Formular als eine standalone-Komponente.
  standalone: true,
  // Importierung der erfordelichen Modulen.
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AppComponent {
  // Titel für diese Applikation.
  title = "seitenalm";
  // Die Auswahloptionen für Geschlecht.
  geschlechtList = [
    {name: "Männlich", value: "M"},
    {name: "Weiblich", value: "W"},
  ];
  anmeldungForm = new FormGroup({
    // Ich bekomme dieses Regex für die Validierung der Namen von dieser Website:
    // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
    // Vorname und Nachname sind erforderlich.
    vorname: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z\xC0-\uFFFF]+([ \\-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$")
    ]),
    nachname: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z\xC0-\uFFFF]+([ \\-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$")
    ]),
    // Form Control für Geschlecht. Es ist erforderlich.
    geschlecht: new FormControl("", [Validators.required]),
    // Ich benutze keine FormGroup, weil es aussieht, dass das originale
    // Formular keine Formgroup verwendet (kein Headings usw.)

    // Form Control für Straße. Es ist erforderlich.
    strasse: new FormControl("", [
      Validators.required,
    ]),
    // Form Control für Stadt. Es ist erforderlich.
    stadt: new FormControl("", [Validators.required]),
    // Form Control für Email. Es ist erforderlich, und Angular hat eine Built-In Validierung für E-Mail.
    email: new FormControl("", [Validators.required, Validators.email]),
    // Form Control für PLZ. Es ist erforderlich, und sie muss 4 Zahlen haben.
    // Eigentlich glaube ich besser, wenn die PLZ nicht 4 Zahlen muss.
    // Ein Beispiel: In Deutschland hat die PLZ 5 Digits.
    plz: new FormControl("", [Validators.required, 
      Validators.pattern("^[0-9]{4}$"),]),
    // Form Control für Telefonnummer
    telefon: new FormControl(""),
    // Form Control für die Anfrage.
    fragen: new FormControl("")
  });

  onSubmit() {
    console.log(this.anmeldungForm.value);
  }
}
