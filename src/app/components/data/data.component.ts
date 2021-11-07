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
  saveSellerValue:any="";
  CreditorBalance=0;
  DebtorBalance=0;
  division=0;
  saveInfoValue:any="";
  public accountChart:AccountChart[]|undefined;
  public accountChartNames:AccountChart[]|undefined;
  addRows(){
    this.rowInRunTime.length +=5;
   
  }
  deleteRow(i:any){
    // console.log(item,item:any)

   let x= (<HTMLInputElement>document.getElementById("seller"+i));
   let y= (<HTMLInputElement>document.getElementById("info"+i));
    if( ( x.value=='' || x.value==null ) && ( y.value=='' || y.value==null ) ){
      alert("it's empty")
    }else{
      if(confirm("^_^ Are You Sure ^_^")){
        for(var j=0;j< this.rowInRunTime.length;j++){

          if(i==j)
          // console.log(this.rowInRunTime);
            this.rowInRunTime.splice(j,1)

            (<HTMLInputElement>document.getElementById("seller"+i)).value="";
            (<HTMLInputElement>document.getElementById("info"+i)).value="";
        }
        // this.service.DeleteAccount(item.id).subscribe(data=>{
          // this.getAll()
        // });
      }
    }   
    
  }
  saveSeller(event:any,i:any){
    this.saveSellerValue=event.target.value;
    sessionStorage.setItem('saveSellerValue', this.saveSellerValue)
  }
  saveInfo(event:any,i:any){
    this.saveInfoValue=event.target.value;
    sessionStorage.setItem('saveInfoValue',this.saveInfoValue)
  }
  getAll(){
    this.service.GetAllAccounta().subscribe(data=>{
      this.accountChart=data; 
      console.log(this.accountChart);
    });
  }
  ngOnInit(): void {
    this.saveInfoValue=sessionStorage.getItem('saveInfoValue');
    this.saveSellerValue=sessionStorage.getItem('saveSellerValue');
    this.getAll()
    this.addRows()
    this.getSumOfDebtor()
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

  searchName(event:any){
    // console.log(event.target.value)
    let x=(<HTMLInputElement>document.getElementById("name"+event)).value
    this.accountChart=[]
    this.service.searchAccounts(x).subscribe(data=>{
      // console.log(data)
      
      (<HTMLInputElement>document.getElementById("number"+event)).value = data[event].number

      // this.accountChart=data; 
      // 2111017
      // console.log(this.accountChart);
    });
  }
  searchNumber(event:any){
    let x=(<HTMLInputElement>document.getElementById("number"+event)).value
    this.accountChart=[]
    this.service.searchAccounts(event).subscribe(data=>{
      // this.accountChartNames=data; 
      // console.log(data);
      (<HTMLInputElement>document.getElementById("name"+event)).value = data[event].nameAr
      // console.log(this.accountChartNames);
    });
  }
  select(event:any){}
  makeDebtorZero(event:any){

    (<HTMLInputElement>document.getElementById("Creditor"+event)).value = "0";
    this.getSumOfDebtor()
    this.getSumOfCreditor()
    this.getDivision()

  }
  makeCreditorZero(event:any){

    (<HTMLInputElement>document.getElementById("Debtor"+event)).value = "0";
    this.getSumOfCreditor()
    this.getSumOfDebtor()
    this.getDivision()

  }

  addData(){
    if(this.DebtorBalance== this.CreditorBalance){
      let data={}
      this.service.addDtat(data).subscribe(data=>{
      })
    }else{
      alert('can\'t be added')
    }
  }

  getSumOfDebtor(){
    this.DebtorBalance=0;

    for(var i=0; i<this.rowInRunTime.length;i++){
      this.DebtorBalance += parseInt((<HTMLInputElement>document.getElementById("Debtor"+i)).value);
    }
  }

  getSumOfCreditor(){
    this.CreditorBalance=0;

    for(var i=0; i<this.rowInRunTime.length;i++){
      this.CreditorBalance += parseInt((<HTMLInputElement>document.getElementById("Creditor"+i)).value);
    }
  }

  getDivision(){
    this.division=0
    this.division = Math.abs(this.DebtorBalance - this.CreditorBalance) 
  }
  
}
