import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { StorageService } from '../services/storage.service';
import { RequestService } from '../services/request.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonList } from '@ionic/angular';

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
  public records =[{attackId:'1',participantId:'117',location:'INSIDE',attackDate:''}];


  constructor(private activatedRoute :ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage:StorageService,
    private request:RequestService) {
    this.myForm = this.formBuilder.group({
      attackId: [''],
      participantId: storage.get("participantId"),
      location: [''],
      attackDate: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
 
  ngOnInit() {
    this.username = this.storage.get("username");
  }


  ionViewWillEnter() {
    this.refreshForm();
  }
  refreshForm(){
    this.myForm.patchValue({
      attackDate: (new Date()).toJSON(), 
    });
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    this.message = `Hello, ${ev.detail.data}!`;
  }
}

setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

  onSubmit(){
    console.log("add record forum---");
    console.log(this.myForm);
    this.request.addRecords(this.myForm.value);
    this.isModalOpen = !this.isModalOpen;

  }
}
