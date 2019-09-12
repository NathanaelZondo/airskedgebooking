import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ControlsService } from '../controls.service';
import * as firebase from 'firebase';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})

export class BookingPage implements OnInit {
  userbooking=[];
   low = false;
   surname;
   userdate;
   hairdresser;
   salonname;
   useruid;
  newdata =[];
  ob ={};
   buttonactive ;
  constructor(public backend:BackendService,public control:ControlsService,public modalController:ModalController,public controls:ControlsService) {
   this.newdata =[];
   let v =0;    
   this.control.Loading();
   this.backend.getuserbookings().orderBy("userdate","desc").limit(10).get().then(val=>{
     val.forEach(doc=>{
       console.log("top 10",doc.data())
       this.userbooking.push(doc.data())
     })
   })












   let currentdate = (new Date().getFullYear().toString())+'-'+(new Date().getMonth())+'-'+(new Date().getDate());
    if((new Date().getMonth()+1)<10)
    {

      currentdate = (new Date().getFullYear().toString())+'-0'+(new Date().getMonth()+1)+'-'+(new Date().getDate());
    if((new Date().getDate())<10)
    {
      currentdate = (new Date().getFullYear().toString())+'-0'+(new Date().getMonth()+1)+'-0'+(new Date().getDate());
    }
    }

    firebase.firestore().collection('Bookings').doc(firebase.auth().currentUser.uid).collection('userbookings').where("userdate","==",currentdate).get().then(val =>{
      val.forEach(doc =>{
      this.userbooking.push(doc.data())
     // console.log(doc.data());
     //console.log(doc.data().surname,doc.data().hairdresser,doc.data().userdate,doc.data().salonname)
     this.values(doc.data().salonname,doc.data().hairdresser,doc.data().userdate,currentdate,doc.data().surname) 
    
// if(doc.data().userdate == currentdate && v ==1)
// {
//   console.log("surname is",v ) 
//      this.values(doc.data().salonname,doc.data().hairdresser,doc.data().userdate,currentdate,doc.data().surname)
// }   
 v = v+1;     
  
 

      });
    });

   

  
   }

  ngOnInit() {
    
  }



  cancel(x)
  {
console.log("USER Clicked",x);


x.status ="cancelled";
firebase.firestore().collection('SalonNode').doc(x.salonname).collection('staff').doc(x.hairdresser).collection(x.userdate).doc(x.id).update({
  status: 'cancelled'
}).then(res=>{
  console.log(res)
});

  

  let click = 1;
  let v1;
  let docid;
  
  firebase.firestore().collection('salonAnalytics').doc(x.salonuid).collection('numbers').get().then(val=>{
    console.log("These are the numbers",val)
    val.forEach(qu=> 
  
      {
      docid =qu.id;
      console.log(docid)
      console.log(qu.data().usercancellations)
      v1 =qu.data().usercancellations;
  
      firebase.firestore().collection('salonAnalytics').doc(x.salonuid).collection('numbers').doc(qu.id).update({"usercancellations":v1+click}).then(zet=>{
        console.log(zet)
      })
      })
    })


  }


  values(a,b,c,d,e)
  {
console.log("line 127 ",a,b,c,d);
//this.values(doc.data().salonname,doc.data().hairdresser,doc.data().userdate,currentdate)


firebase.firestore().collection('SalonNode').doc(a).collection('staff').doc(b).collection(c).where("surname","==",e).where("userdate","==",d).get().then(val=>{
  val.forEach(val2=>{
    console.log(val2.data())
var obj ={id:val2.id}

console.log(console.log(obj))









this.newdata.push( { ...obj ,... val2.data()})

console.log("New data = ",this.newdata)



});
});

  }


viewdetails(x)
{
console.log(x)
this.backend.setbookingdetails(x)
 this.presentModal();
}


async presentModal() {
  const modal = await this.modalController.create({
    component: ModalPage
  });
  return await modal.present();
}

back()
{
  this.controls.router.navigate(['navigation']);
}
}
  
  



