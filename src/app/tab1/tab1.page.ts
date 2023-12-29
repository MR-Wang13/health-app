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



  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

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
    public router : Router) {
    this.myForm = this.formBuilder.group({
      attackId: [''],
      participantId: storage.get("participantId"),
      location: "'INSIDE'",
      attackDate: ['']
    });
  }
 
  ngOnInit() {
    this.loadData();
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
    

  }
  refreshForm(){
    this.myForm.patchValue({
      attackDate: (new Date()).toJSON(),
      attackId: '',
      participantId: this.storage.get("participantId"),
      location: "'INSIDE'",
    });
}

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setOpen(isOpen: boolean) {
    this.refreshForm();
    this.isModalOpen = isOpen;
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
