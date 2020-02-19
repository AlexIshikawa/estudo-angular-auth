import { User } from "../../models/user/user.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  url: string = "http://localhost:3333";
  constructor(private http: HttpClient) {}

  async login(body: object): Promise<any> {
    return this.http.post(`${this.url}/login`, body).toPromise();
  }

  async create(body): Promise<User> {
    return this.http.post<User>(`${this.url}/register`, body).toPromise();
  }

  public isAuthenticated(): boolean {
    const token: any = localStorage.getItem("token");
    let user: any = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      if (user.type !== "default") {
        localStorage.clear();
        return false;
      }
      if (token && user) return user.active;
    } else return false;
  }

  public BackToken() {
    if (localStorage.getItem("token")) {
      const token: any = localStorage.getItem("token");
      return token;
    } else {
      return null;
    }
  }
}
