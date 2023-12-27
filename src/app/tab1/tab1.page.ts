import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { StorageService } from '../services/storage.service';
import { RequestService } from '../services/request.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonList } from '@ionic/angular';

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

  private getRecordsUrl = "/api/attacks/participant/"


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  isModalOpen = false;

  public record={
    attackId: '',
    participantId:'',
    location: '',
    attackDate: ''
  }
  public records:any =[{attackId:'1',participantId:117,location:'INSIDE',attackDate:''}];


  constructor(private activatedRoute :ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage:StorageService,
    private request:RequestService,
    private http:HttpClient) {
    this.myForm = this.formBuilder.group({
      attackId: [''],
      participantId: storage.get("participantId"),
      location: [''],
      attackDate: ['']
    });
  }
 
  ngOnInit() {
    this.refreshForm();
    this.loadData().then(data=>{
      console.log(data);
      this.records = data;
    });
  }


  async loadData(){
    console.log('loadData');
    this.username = this.storage.get("username");
    const participantId =  this.storage.get("participantId")
    let data = await this.request.getRecords(participantId);
    return data;
  }

  ionViewWillEnter() {
    

  }
  refreshForm(){
    this.myForm.patchValue({
      attackDate: (new Date()).toJSON(),
      attackId: '',
      participantId: this.storage.get("participantId"),
      location: [''],
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
    this.addRecords().then(data=>{
        this.loadData().then(data=>{
          console.log('loadData');

          console.log(data);
          this.records = data;
        });
      }
    )

  }

  async addRecords(){
    console.log("add record forum---start");
    console.log(this.myForm);
    let data = await this.request.addRecords(this.myForm.value);
    console.log("add record forum---over");

    return data;
  }
}
