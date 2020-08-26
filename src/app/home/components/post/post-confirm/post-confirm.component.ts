import {Component, OnInit} from '@angular/core';
import {PostDataService} from '../post-data.service';
import {Post} from '../../../../models/post';
import {PostService} from '../../../../services/post.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostImageService} from '../../../../services/post-image.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.scss']
})
export class PostConfirmComponent implements OnInit {
  post: Post;
  listImages = [];
  fileImages = [];
  uploadPercent;
  postImage: FormGroup;

  constructor(
    private postDataService: PostDataService,
    private postService: PostService,
    private postImageService: PostImageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getPostData();
  }

  getPostData() {
    this.post = this.postDataService.postData;
    this.listImages = this.postDataService.listImages;
    this.fileImages = this.postDataService.fileImages;
  }

  submit(targetModal) {
    this.postService.createPost(this.post).subscribe(data => {
      if (this.fileImages != null) {
        for (const fileImage of this.fileImages) {
          this.postImage = this.formBuilder.group({
            post: data,
            image: ['']
          });
          const filePath = `${data.title}/${fileImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          this.uploadPercent = this.storage.upload(filePath, fileImage).percentageChanges();
          this.storage.upload(filePath, fileImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.postImage.value.image = url;
                this.postImageService.createPostImage(this.postImage.value).subscribe();
                this.modalService.open(targetModal);
              });
            })
          ).subscribe();
        }
      }
    });
  }

  backToPostForm() {
    this.router.navigateByUrl('/post-form');
  }

  backToHome() {
    this.modalService.dismissAll();
    this.postDataService.postData = undefined;
    this.router.navigateByUrl('/');
  }
}
