import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { StorageService } from './storage.service';
@Injectable({providedIn: 'root'})

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  

  private paticipantsPostUrl = "/api/participants"


  private recordsPostUrl = "/api/attacks"

  private getRecordsUrl = "/api/attacks/participant/"

  private getChartDataUrl = "/api/attacks/getChartData/"

  
  public result:any ;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'
    })
      };

  constructor(private http:HttpClient,
    private storage: StorageService
    ) { }

  
  addParicipants(user:any){
    

    this.http.post(this.paticipantsPostUrl,JSON.stringify(user),this.httpOptions).subscribe(
      (response:any )=>(
        this.storage.set("participantId",response.participantId)
      )
    );
  }


  async addRecords(form:any){
    
    return await this.http.post(this.recordsPostUrl,JSON.stringify(form),this.httpOptions).toPromise();
  }

  async getRecords(id:any){
    return await this.http.get(this.getRecordsUrl+id).toPromise();
    
  }

  async getRecordsData(participantId: any) {
    return await this.http.get(this.getChartDataUrl+participantId).toPromise();
  }
 
}
