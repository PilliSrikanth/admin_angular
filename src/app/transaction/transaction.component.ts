import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  tab = 'all';

months = [
  {
    month: "10/2025",
    transactions: [
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'paytm'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'phonepe'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'upi'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'gpay'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'visa'},
    ]
  },
  {
    month: "09/2025",
    transactions: [
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'paytm'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'phonepe'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'upi'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'gpay'},
      {name:"Mekala Ravi Teja",time:"July 14 6:35 PM",amount:250,method:'visa'},
    ]
  }
];

getTotal(list:any[]){
  return list.reduce((a,b)=>a+b.amount,0);
}

getIcon(method:string){
  if(method=='paytm') return 'assets/paytm.png';
  if(method=='phonepe') return 'assets/phonepe.png';
  if(method=='upi') return 'assets/upi.png';
  if(method=='gpay') return 'assets/gpay.png';
  return 'assets/visa.png';
}


}
