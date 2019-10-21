import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../controls.service';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import * as firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal/ngx';
 import { Device } from '@ionic-native/device/ngx';
import { PopoverController } from '@ionic/angular';
import {ZeroPage} from '../zero/zero.page'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {
  private versionType:any;
  loaderAnimate = true;
  constructor(public popoverController:PopoverController,public control:ControlsService,public router:Router,public backend:BackendService,    private oneSignal: OneSignal,private device: Device) { 
this.versionType  = device.version;

console.log('version', this.versionType)
   }
profiles =[];
  ngOnInit() {
    console.log("id of the id",this.backend.userId);
    this.getReviews();
  
    this.profiles =[];
    this.backend.profiles=[];
    firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).onSnapshot(val=>{
     console.log(val.data())
      if(val.data()==undefined)
      {
        this.control.profileToast()
        this.control.navCtrl.setDirection('root');
        this.control.navCtrl.navigateRoot('/createprofile');
      }
      else{
        this.profiles =[];
        this.backend.profiles =[];
       this.profiles.push(val.data());
       this.backend.profiles =this.profiles;
       console.log("Profile data =",this.profiles)
      this.backend.setuserdata(this.profiles[0].name, this.profiles[0].surname, this.profiles[0].personalNumber)
      }  
    
    })
    setTimeout(()=>{
      this.loaderAnimate = false
    },2000)
  }

 
getReviews(){
  let num = -1 ;
  if( num == -1){
    
    console.log('its in')
  }else{
    console.log('nothing');
    
  }
}




  home()
  {
  this.router.navigate([('maps')]);  
  }
  map()
  {

this.router.navigate(['home']);
  }

  profile()
  {

this.router.navigate(['/reviews']);
  }

  bookings()
  {

this.router.navigate(['booking']);
  }

  info()
  {

this.router.navigate(['info']);
  }

  signout() {
    this.backend.signout();
    this.control.router.navigate(['login']);
  }
 











  
}
