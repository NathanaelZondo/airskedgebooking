import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Profile } from '../profile';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ControlsService } from '../controls.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.page.html',
  styleUrls: ['./updateprofile.page.scss'],
})
export class UpdateprofilePage implements OnInit {
  profiles = [];
  name;
  surname;
  image;
  about;
  cell;
  uid;
  styleImage;
  sub = false;
  storage = firebase.storage().ref();
  uploadprogress;
  isuploading: false;
  constructor(private camera: Camera, public control: ControlsService, public backend: BackendService) {
    this.profiles=[];
      
      this.profiles =this.backend.profiles;
      


      this.profile.name = this.profiles[0].name;
      this.profile.surname = this.profiles[0].surname;
      this.profile.cell = this.profiles[0].cell;
      this.profile.about = this.profiles[0].about;
      this.profile.image = this.profiles[0].image;
      //this.profile.TokenID = this.profile[0].tokenID;
      console.log("Dis d name", this.profile);
  }
  profile: Profile = {
    name: this.name,
    surname: this.surname,
    cell: this.cell,
    about: this.about,
    image: this.image,
    TokenID: ""
  };
  ngOnInit() {
    console.log();
  }
  picurl;
  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    await this.camera.getPicture(options).then(res => {
      console.log(res);
      const image = `data:image/jpeg;base64,${res}`;
      this.styleImage = image;
      const filename = Math.floor(Date.now() / 1000);
      let file = 'Userprofiles/' + firebase.auth().currentUser + '.jpg';
      const UserImage = this.storage.child(file);
      const upload = UserImage.putString(image, 'data_url');
      upload.on('state_changed', snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadprogress = progress;
        if (progress == 100) {
          this.isuploading = false;
        }
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(downUrl => {
          this.profile.image = downUrl;
          console.log('Image downUrl', downUrl);
        });
      });
    }, err => {
      console.log("Something went wrong: ", err);
    });
  }







  updateprofile(profile)
   {
  
    let uid = firebase.auth().currentUser.uid;
    this.backend.profiles = [];
    if(profile.name =="" ||profile.name ==undefined)
    {
     console.log("entername") 
    }
    else if(profile.surname=="" ||profile.surname ==undefined){
      console.log("entersurname") 
    }
    else if(profile.about=="" ||profile.about ==undefined){
      console.log("enterabout") 
    }
    else if(profile.cell=="" ||profile.cell ==undefined){
      console.log("entercell") 
    }
    else
    {



      firebase.firestore().collection('userprofile').doc(uid).update(profile).then(val => {
        console.log(val);
      });
      this.control.ProfileupdateToast();
  
      this.control.navCtrl.setDirection('root');
      this.control.navCtrl.navigateRoot('/navigation'); 
    
    }

    }
  

    
}



