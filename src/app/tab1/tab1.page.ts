import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { StorageService } from '../services/storage.service';
import { RequestService } from '../services/request.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonList } from '@ionic/angular';
import {Router} from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']

})
export class Tab1Page implements OnInit {
  alertButtons = ['Ok'];

  public username:string ="";
  public deviceUuid:string ="";
  public location:string ="INSIDE";

  public myForm : FormGroup;




  isModalOpen = false;

  public record={
    attackId: '',
    participantId:'',
    location: '',
    attackDate: ''
  }
  public records:any =[];


  constructor(
    private formBuilder: FormBuilder,
    private storage:StorageService,
    private request:RequestService,
    public router : Router,
    public activeRouter : ActivatedRoute) {
    this.myForm = this.formBuilder.group({
      attackId: [''],
      participantId: storage.get("participantId"),
      location: "'INSIDE'",
      attackDate: ['']
    });
  }
 
  ngOnInit() {
    this.activeRouter.queryParams.subscribe(params => {
      this.loadData();
    });
    
  }


   loadData(){
    this.refreshForm();
    console.log('loadData');
    this.username = this.storage.get("username");
    const participantId =  this.storage.get("participantId")
    this.request.getRecords(participantId).subscribe(data=>{
      this.records = data;
    });
  }

  ionViewWillEnter() {
    
    this.username = this.storage.get("username");

  }

  
  refreshForm(){
    const now = new Date();
    const timezoneOffsetInHours = now.getTimezoneOffset() / 60;
    const localISOTimeString = new Date(now.getTime() - timezoneOffsetInHours * 3600 * 1000).toISOString();
    console.log(localISOTimeString)
    this.myForm.patchValue({
      attackDate: localISOTimeString,
      attackId: '',
      participantId: this.storage.get("participantId"),
      location: "'INSIDE'",
    });
}

  

  setOpen(isOpen: boolean,op:string) {
    this.isModalOpen = isOpen;
    if(op == "add"){
    this.refreshForm();
    }
  }

  clickItem(item:any){
    console.log(item)
    this.myForm.patchValue({
      attackDate: item.attackDate,
      attackId: item.attackId,
      location: item.location,
      participantId: item.participantId
    });
    this.isModalOpen = !this.isModalOpen;

  }

  async onSubmit(){
    
    this.isModalOpen = !this.isModalOpen;
    this.addRecords();

  }

   addRecords(){
    console.log("add record forum---start");
    console.log(this.myForm.value);

    console.log(this.myForm.valid);
    
    this.request.addRecords(this.myForm.value).subscribe(data=>{
      this.loadData();
    });
    console.log("add record forum---over");
  }

  logout() {
    this.storage.remove('username'); 
    this.storage.remove('participantId'); 

    this.router.navigateByUrl('/login');
  }
}
