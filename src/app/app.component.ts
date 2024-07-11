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
    vorname: new FormControl("", [
      Validators.required,
    ]),
    nachname: new FormControl("", [
      Validators.required,
    ]),
    // Ich benutze keine FormGroup, weil es aussieht, dass das originale
    // Formular keine Formgroup verwendet (kein Headings usw.)

    strasse: new FormControl("", [
      Validators.required,
    ]),
    stadt: new FormControl("", [Validators.required]),
    email: new FormControl(""),
    plz: new FormControl(""),
    telefon: new FormControl(""),
    fragen: new FormControl("")
  });

  updateProfile() {
    this.anmeldungForm.patchValue({
      vorname: "Jane",
      nachname: "Smith",
      strasse: "123 1st Street"
    });
  }

  onSubmit() {
    console.log(this.anmeldungForm.value);
  }
}
