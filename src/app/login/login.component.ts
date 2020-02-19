import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  fb: FormBuilder = new FormBuilder();
  userForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.initiateForm();
  }

  ngOnInit(): void {}

  get name() {
    return this.userForm.get("name");
  }

  get email() {
    return this.userForm.get("email");
  }

  get password() {
    return this.userForm.get("password");
  }

  get provider() {
    return this.userForm.get("provider");
  }

  private initiateForm() {
    this.userForm = this.fb.group({
      name: [, Validators.compose([Validators.required])],
      email: [, Validators.compose([Validators.required])],
      password: [, Validators.compose([Validators.required])]
    });
  }

  public async create() {
    const body = this.userForm.value;
    await this.authService.create(body);
    this.router.navigate(["/home"]);
  }

  async login() {
    try {
      let res: any = await this.authService.login(this.userForm.value);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("company", JSON.stringify(res.company));
      if (res.featuresToken)
        localStorage.setItem(
          "featuresToken",
          JSON.stringify(res.featuresToken)
        );
      this.router.navigate(["painel"]);
    } catch (error) {
      console.log(error)
      );
    }
  }
}
