import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Device } from '@capacitor/device';
import { StorageService } from '../services/storage.service';
import { RequestService } from '../services/request.service';



const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo();

  console.log(info);
};
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 public user:any = {
    username : '',
    deviceUuid: ''

 }
   
 showError: boolean = false; 
 usernameTaken: boolean = false;



  constructor(public router : Router,
    public storage : StorageService,
    public request:RequestService
    ){}

   deviceId: any ;

  ionViewWillEnter(){
    
  } 
  async ngOnInit() {
    this.deviceId = (await Device.getId()).identifier;  
  }

 
  loginBtnClick() {
    this.showError = false;
    this.usernameTaken = false;

    if (this.user.username.trim() === '') {
      this.showError = true;
      return;
    }
    console.log(this.deviceId);
    this.user.deviceUuid = this.deviceId;
    this.storage.set("username",this.user.username); 
    this.request.addParicipants(this.user).subscribe(
      (response:any)=>{
        console.log(response);
        if (response.taken) {
          this.usernameTaken = true;
        } else {
        this.storage.set("participantId",response.participantId);
        this.router.navigate(['/tabs/tab1'],{
          queryParams:{ 
            "deviceUuid": this.deviceId,
            "username": this.user.username
          }
        });
        }
        
      }
    );
    
  } 
}
