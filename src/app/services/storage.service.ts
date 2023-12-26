import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  

  get(key: string)
  {
    const value = localStorage.getItem(key);
    if(value != null){
      return JSON.parse(value || '');
    }else{
      return "";
    }
    
  }

  set(key: string,value: any)
  {
      localStorage.setItem(key,JSON.stringify(value));
  }

  remove(key: string)
  {
      localStorage.removeItem(key);

  }
}
