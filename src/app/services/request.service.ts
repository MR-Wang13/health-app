import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  //http://my-springboot-env.eba-bkzikp3p.us-east-1.elasticbeanstalk.com
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

  
  addParicipants(user:any): Observable<any>{
    
    return this.http.post(this.paticipantsPostUrl,JSON.stringify(user),this.httpOptions);
  }


  addRecords(form:any) : Observable<any>{
    
    return this.http.post(this.recordsPostUrl,JSON.stringify(form),this.httpOptions);
  }


  
  getRecords(id:any): Observable<any> {
    return this.http.get(this.getRecordsUrl+id);
  }


  getRecordsData(participantId: any) : Observable<any> {
    return this.http.get(this.getChartDataUrl+participantId);
  }
 
}
