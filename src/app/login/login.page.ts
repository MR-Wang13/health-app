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
   

  public participantId:string ="";


  constructor(public router : Router,
    public storage : StorageService,
    public request:RequestService
    ){}

   deviceId: any ;

   ionViewWillEnter(){
    const participantId = this.storage.get("participantId");

    console.log("participantId---"+participantId);
    if(participantId!="" && participantId!=null){
      this.router.navigate(['/tabs/tab1']);
    }
  } 
  async ngOnInit() {
    this.deviceId = Device.getId();

    
  }

 
  async loginBtnClick() {
    console.log((await this.deviceId).identifier);
    this.user.deviceUuid = (await this.deviceId).identifier;
    this.storage.set("username",this.user.username); 
    this.request.addParicipants(this.user);
    this.router.navigate(['/tabs/tab1'],{
      queryParams:{ 
        "deviceUuid": (await this.deviceId).identifier,
        "username": this.user.username
      }
    });

  } 
}
