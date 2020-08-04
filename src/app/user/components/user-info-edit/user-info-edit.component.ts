import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Role} from '../../../models/role';
import {Post} from '../../../models/post';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.scss']
})
export class UserInfoEditComponent implements OnInit {
  infoEditForm: FormGroup;
  userId: number;
  user: User;
  selectedFile: File = null;
  imageUrl = '';
  downloadURL: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.infoEditForm = this.formBuilder.group({
      id: [''],
      name: [''],
      address: [''],
      phoneNumber: [''],
      email: [''],
      avatar: [''],
      status: [''],
      activated: [''],
      role: [''],
      createdAt: [''],
      updatedAt: [''],
      posts: ['']
    });

    this.getUserById();
  }

  getUserById() {
    this.activatedRoute.params.subscribe(param => {
      this.userId = param.id;
      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data;
        this.infoEditForm.patchValue(this.user);
      });
    });
  }

  detectFile(event) {
    this.selectedFile = event.target.files[0];

    // Show image preview
    const reader = new FileReader();
    reader.onload = (data: any) => {
      this.imageUrl = data.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadFile() {
    const myTest = this.angularFirestore.collection('test').ref.doc();
    console.log(myTest.id);

    const file = this.selectedFile;
    const filePath = `${myTest.id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;

          // myTest.set({
          //   categoria: this.forma.value.categoria,
          //   imagenes : this.downloadURL,
          //   myId : myTest.id
          // })

          console.log( this.downloadURL );
        }).catch(err => { console.log(err); });
      })
    )
      .subscribe();
  }
}
