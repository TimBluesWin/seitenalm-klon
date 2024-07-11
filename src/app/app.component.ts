import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AppComponent {
  anmeldungForm = new FormGroup({
    // Ich bekomme dieses Regex für die Validierung der Namen von dieser Website:
    // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
    vorname: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z\xC0-\uFFFF]+([ \\-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$")
    ]),
    nachname: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z\xC0-\uFFFF]+([ \\-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$")
    ]),
    // Ich benutze keine FormGroup, weil es aussieht, dass das originale
    // Formular keine Formgroup verwendet (kein Headings usw.)

    strasse: new FormControl("", [
      Validators.required,
    ]),
    stadt: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    // Eigentlich glaube ich besser, wenn die PLZ nicht 4 Zahlen muss.
    // Ein Beispiel: In Deutschland hat die PLZ 5 Digits.
    plz: new FormControl("", [Validators.required, 
      Validators.pattern("^[0-9]{4}$"),]),
    telefon: new FormControl(""),
    fragen: new FormControl("")
  });

  onSubmit() {
    console.log(this.anmeldungForm.value);
  }
}
