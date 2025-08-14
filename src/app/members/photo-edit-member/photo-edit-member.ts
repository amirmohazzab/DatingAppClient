import { Component, Input, OnInit } from '@angular/core';
import { MemberDTO } from '../../DTOs/MemberDto';
import {RouterModule} from '@angular/router';
import { AccountService } from '../../services/account-service';
import { UserDto } from '../../DTOs/UserDto';
import { take } from 'rxjs';
import { MemberService } from '../../services/member-service';
import { PhotoDto } from '../../DTOs/PhotoDto';
import { ToastrService } from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-photo-edit-member',
  imports: [RouterModule, CommonModule, FileUploadModule],
  templateUrl: './photo-edit-member.html',
  styleUrl: './photo-edit-member.css'
})

export class PhotoEditMember implements OnInit{

  @Input() member: MemberDTO;
  user: UserDto;
  photos: PhotoDto[];
  photo: PhotoDto;

  constructor(private memberService: MemberService, private toast: ToastrService, private accountService: AccountService){}
    
  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {this.user = user});
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log("Selected file:", this.selectedFile);
    }
  }

   getPhotos(){
     this.memberService.getAllPhotos(this.user.userName).subscribe(member => {
       this.member.photos = member.photos;
      })
    }

  uploadFile() {
    if (!this.selectedFile) {
       alert("Please select a file first.");
       return;
     }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.memberService.addPhoto(formData).subscribe({
         next: (res) => {
          console.log('آپلود موفق', res);
          this.getPhotos();
        },
         error: (err) => console.error('خطا در آپلود', err)
    });

  }
   
  onSetMainPhoto(photoId: number){
    this.memberService.setMainPhoto(photoId).subscribe((photo: PhotoDto) => {
      this.updateUserAndMemberPhotoUrl(photo);
    })
  }

  onDeletePhoto(photoId: number){
    this.memberService.deletePhoto(photoId).subscribe(photo => {
      this.member.photos = this.member.photos.filter(p => p.photoId != photo.photoId);

      //this.member.photos.splice(this.member.photos.findIndex(p => p.id == photo.id),1);

      this.toast.warning("photo delete successful");
    })
  }

  updateUserAndMemberPhotoUrl(photo: PhotoDto){
      this.user.photoUrl = photo.url;
      this.accountService.serCurrentUser(this.user);

      this.member.photoUrl = photo.url;
      this.member.photos.forEach(item => {
        if (item.isMain)
          item.isMain = false;
        if (item.photoId === photo.photoId){
          item.isMain = true;
        }
      })
  }
  
}
