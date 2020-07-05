import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  user: any = {};

  constructor(
    public navCtrl: NavController, 
    private googlePlus: GooglePlus, 
    private http: HttpClient,
    private route: Router) { }

  ngOnInit() {
    document.getElementById("entrada-dados").style.display = "none";
    document.getElementById("entrada").style.display = "block";
    document.getElementById("saida").style.display = "none";
  }

  entrar() {
    this.route.navigateByUrl('/tabs/tab1')
  }

  googleLogin(): void {
    this.googlePlus.login({})
      .then(res =>{
        this.user = res;
        this.getData();
        document.getElementById("entrada-dados").style.display = "block";
        document.getElementById("entrada").style.display = "none";
        document.getElementById("saida").style.display = "block";
      })
      .catch(err => console.error(err));
    console.log("aqui");
  }

  getData() {
    this.http.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + this.user.acessToken)
      .subscribe( (data: any) => {
        this.user.name = data.displayName;
        this.user.picture = data.imageUrl;
      });
  }

  googleLgout() {
    this.googlePlus.logout()
      .then(() => {
        console.log("logged out");
        document.getElementById("entrada-dados").style.display = "none";
        document.getElementById("entrada").style.display = "block";
        document.getElementById("saida").style.display = "none";
      });
  }

}
