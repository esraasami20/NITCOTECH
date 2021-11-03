import { AccountChartService } from './../../Services/account-chart.service';
import { Component, OnInit } from '@angular/core';
import { AccountChart } from 'src/app/Models/account-chart';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private service:AccountChartService) { }
  rowInRunTime:any =[];
  selectedValue:any;
  public accountChart:AccountChart[]|undefined;
  addRows(){
    this.rowInRunTime.length +=5;
  }
  deleteRow(item:any){
    

    if(confirm("^_^ Are You Sure ^_^")){
      this.service.DeleteAccount(item.id).subscribe(data=>{
        this.getAll()
      });
    }
    
  }
  getAll(){

    this.service.GetAllAccounta().subscribe(data=>{
      this.accountChart=data; 
      // console.log(this.accountChart);
    });
  }
  ngOnInit(): void {
    this.getAll()
  }
  refresh(){
    location.reload()
  }
  add(){
    let description= <HTMLInputElement>document.getElementById('description');
    let spanmessage = <HTMLInputElement>document.getElementById('spanmessage');
    let date= <HTMLInputElement>document.getElementById('date');
    let spandate= <HTMLInputElement>document.getElementById('spandate');
    let spantype= <HTMLInputElement>document.getElementById('spantype');
    // let type=<HTMLInputElement>document.getElementById('type')
    if((description).value==""||(description).value==null){      
      description.focus();
      spanmessage.style.display = 'block';
    }
    if((date).value==""||(date).value==null){      
      date.focus();
      spandate.style.display = 'block';
    }
    if(this.selectedValue==""||this.selectedValue==null){      
      
      spantype.style.display = 'block';
    }
  }

  select(event:any){}
  makeDebtorZero(event:any){

    (<HTMLInputElement>document.getElementById("Creditor"+event.id)).value = "0";
  }
  makeCreditorZero(event:any){

    (<HTMLInputElement>document.getElementById("Debtor"+event.id)).value = "0";
  }

  
}
