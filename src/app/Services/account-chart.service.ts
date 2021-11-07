import { HttpClient } from '@angular/common/http';
import { AccountChart } from './../Models/account-chart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountChartService {

  constructor(private http: HttpClient) { }
  
  baseLink:string ="http://localhost:2264/api/";

  GetAllAccounta(){
    return this.http.get<any>(this.baseLink + 'AccountChart');
  }

  DeleteAccount(id:any){
    return this.http.delete<any>(this.baseLink + 'AccountChart/'+id);
  }

  searchAccounts(searched: any) {
    return this.http.get<AccountChart[]>((this.baseLink + 'AccountChart/search?name='+searched ))
  }

  addDtat(data:any) {
    return this.http.post(this.baseLink + 'AccountChart',data)
  }
}
