import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../services/member-service';
import { MemberDTO } from '../../DTOs/MemberDto';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-detail-member',
  imports: [TabsModule, NgxGalleryModule],
  templateUrl: './detail-member.html',
  styleUrl: './detail-member.css'
})
export class DetailMember implements OnInit{

  member: MemberDTO;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute, private memberService: MemberService){}

  ngOnInit(): void {
    this.loadMember();
    this.loadOptions();
  }
  
   loadOptions(){
    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
   }

   loadMember(){
     let username = this.route?.snapshot?.params['username'];
     this.memberService.getMemberByUserName(username).subscribe(response => {
        this.member = response;
    });
    this.galleryImages = this.getImages();
   }

   getImages() {
      const images : NgxGalleryImage[] = [];
      for (let image of this.member?.photos) {
        images.push({
          big: image.url,
          medium: image.url,
          small: image.url
        });
      }
      return images;
   }

}
