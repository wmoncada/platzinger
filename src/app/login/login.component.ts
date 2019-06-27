import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.styl"]
})
export class LoginComponent implements OnInit {
  operation: string = "login";
  email: string = null;
  password: string = null;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  login() {
    this.authenticationService
      .loginWithEmail(this.email, this.password)
      .then(data => {
        alert("Logueado correctamente");
        console.log(data);
      })
      .catch(error => {
        alert("Ocurrion un error");
        console.log(error);
      });
  }

  register() {
    this.authenticationService
      .registerWithEmail(this.email, this.password)
      .then(data => {
        alert("Logueado correctamente");
        console.log(data);
      })
      .catch(error => {
        alert("Ocurrion un error");
        console.log(error);
      });
  }
}
