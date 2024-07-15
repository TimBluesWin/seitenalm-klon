// Importierung der erfordelichen Modulen.

import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import laender from '../assets/countries-de.json';
import flatpickr from "flatpickr";

// Importierung der deutschen Sprache für flatpickr.
import  { German } from "flatpickr/dist/l10n/de.js";
// Ich entschiede mich, die Länderliste von einer JSON-Datei zu importieren.
// Diese Datei bekomme ich von dieser Website: https://stefangabos.github.io/world_countries/
// Ich habe auch das Kosovo manuell hinzugefügt, weil es nicht in der Liste war.


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
  // Der Grund ist, dass es eine Empfehlung von Angular-Team ist.
  // Zusätzlich ist es gründsätzlich einfacher, und es gibt wenigere Abhängigkeit von ngModules.
  // Quelle: https://blog.angular.dev/introducing-angular-v17-4d7033312e4b#586d
  standalone: true,
  // Importierung der erfordelichen Modulen.
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AppComponent {

  // Das Workaround für die Fehlermeldung "window is not defined".
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Die Länderliste, die ich von einer JSON-Datei importiert habe.
  laenderList = laender;
  // Titel für diese Applikation.
  title = "seitenalm";
  // Die Auswahloptionen für Geschlecht.
  geschlechtList = [
    {name: "Männlich", value: "M"},
    {name: "Weiblich", value: "W"},
  ];

  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      // Hier benutze ich flatpickr für das Datumauswahl.
      // Die CSS habe ich in der angular.json Datei importiert.
      flatpickr("#reiseZeitRaum", {
        "locale": German,
        "mode": "range",
        "showMonths": 2
      });
    }
  }
  anmeldungForm = new FormGroup({
    // Form Control für Anzahl der Erwachsene. Es ist erforderlich, und es muss mindestens 1 sein.
    erwachsene: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
    // Form Control für Reisezeitraum. Es ist erforderlich.
    reiseZeitRaum: new FormControl("", [Validators.required]),
    // Ich bekomme dieses Regex für die Validierung der Namen von dieser Website:
    // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
    // Vorname und Nachname sind erforderlich.
    // Das Array für Kinder. Es hat Name und Geburtstag. 
    kinder: new FormArray([
      new FormGroup({
        kindName: new FormControl("", [Validators.required]),
        tag: new FormControl("", [Validators.required, Validators.min(1), Validators.max(31)]),
        monat: new FormControl("", [Validators.required, Validators.min(1), Validators.max(12)]),
        jahr: new FormControl("", [Validators.required, Validators.min(2006), Validators.max(2024)])
      })
    ]),
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
    // Form Control für Land. Es ist erforderlich.
    land: new FormControl("", [Validators.required]),
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

  // Erhalten der Kinder von dem Formular.
  public get kindern()
  {
    return this.anmeldungForm.get('kinder') as FormArray;
  }

  // Das Kind zum Formular hinzufügen.
  public kindHinzufuegen(){
    const neuesKind = new FormGroup({
      kindName: new FormControl("", [Validators.required]),
      tag: new FormControl("", [Validators.required, Validators.min(1), Validators.max(31)]),
      monat: new FormControl("", [Validators.required, Validators.min(1), Validators.max(12)]),
      jahr: new FormControl("", [Validators.required, Validators.min(2006), Validators.max(2024)])
    })
    this.kindern.push(neuesKind)
  }

  // Kind im letzten Position entfernen
  public kindEntfernung(){
    this.kindern.removeAt((this.kindern.length) - 1)
  }

  // Wenn die Anfragenform abgeschickt wird, wird die Eingaben von dem Benutzer in der Konsole angezeigt.
  onSubmit() {
    console.log(this.anmeldungForm.value);
  }
}
