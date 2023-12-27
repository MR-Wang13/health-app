import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { StorageService } from './storage.service';
@Injectable({providedIn: 'root'})

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  private host = "http://my-springboot-env.eba-bkzikp3p.us-east-1.elasticbeanstalk.com";
 
  private paticipantsPostUrl = this.host + "/api/participants"


  private recordsPostUrl = this.host +"/api/attacks"

  private getRecordsUrl = this.host +"/api/attacks/participant/today/"

  private getChartDataUrl = this.host +"/api/attacks/getChartData/"

  
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
