import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.page.html',
  styleUrls: ['./input-modal.page.scss'],
})

export class InputModalPage implements OnInit {
  userID: any;
  user: any;
constructor(private modalController: ModalController, private navParams: NavParams,
            public http: HttpClient,
            public alertController: AlertController
            ) { }

  ngOnInit() {
    this.clear();
    this.userID = this.navParams.data.userID;
    if (this.userID) {
      this.editUser(this.userID);
    }
   }

  closeModal() {

    this.modalController.dismiss();
  }


  clear() {
    this.user = {
      name: '',
      email: '',
      stream: '',
      gender: '',
      about: '',
      experience: '',
    };
  }

  save() {
    this.http.post('https://click-on-kaduna.herokuapp.com/api/student', this.user)
    .subscribe((response)  => {
      const res: any = response;
      this.closeModal();
      this.presentAlert(res.meassage);
    });
    }

  editUser(id) {
    this.http.get('https://click-on-kaduna.herokuapp.com/api/student/' + id)
    .subscribe((response) => {
      const res: any = response;
      this.user = {
        name: res.data.name,
        email: res.data.email,
        stream: res.data.stream,
        gender: res.data.gender,
        about: res.data.about,
        experience: res.data.experience
      };
  });
}

update() {
  this.http.get('https://click-on-kaduna.herokuapp.com/api/student/' + this.userID, this.user)
  .subscribe((response) => {
    const res: any = response;
    this.closeModal();
    this.presentAlert(res.message);

  });
}

async presentAlert(msg) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: msg,
    buttons: ['ok']
  });
  await alert.present();
}
}
