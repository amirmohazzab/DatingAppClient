import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../services/member-service';
import { MemberDTO } from '../../DTOs/MemberDto';
import {TabDirective, TabsetComponent, TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import { MessageMember } from "../message-member/message-member";
import { MessageService } from '../../services/message-service';
import { Subscription, take} from 'rxjs';
import { AccountService } from '../../services/account-service';
import { UserDto } from '../../DTOs/UserDto';

@Component({
  selector: 'app-detail-member',
  imports: [TabsModule, NgxGalleryModule, MessageMember],
  templateUrl: './detail-member.html',
  styleUrl: './detail-member.css'
})
export class DetailMember implements OnInit, AfterViewInit, OnDestroy{

  private sub = new Subscription();

  member: MemberDTO;
  //messages: MessageDto[] = [];
  currentUser: UserDto;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  @ViewChild('staticTabs', {static : false}) staticTabs: TabsetComponent;
  activeTab: TabDirective;
  tabId = 1;
  //tab: any;
  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService, 
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router){
      const sub$ = this.accountService.currentUser$.pipe(take(1)).subscribe(res => this.currentUser = res);
      this.sub.add(sub$);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }


  ngOnInit(): void {
    this.loadMember();
    this.loadOptions();
    this.route.queryParams.subscribe(params => {
      this.tabId = +params['tab'];
      if (params['tab']) {
        //this.selectTab(this.tabId);
        setTimeout(() => this.selectTab(this.tabId), 0);
      }
    });
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.currentUser = user;
    });
  }

    ngAfterViewInit(): void {
    // وقتی که View کاملاً بارگذاری شد، چک کنید که tabId از قبل تعریف شده باشد
    if (this.tabId) {
      this.selectTab(this.tabId);
    }
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

   selectTab(tabId: number){
    if (this.staticTabs && this.staticTabs.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
   }

   onTabChange(tab: TabDirective){
    this.activeTab = tab ?? null;
    if (this.activeTab){
      if(this?.activeTab?.heading === 'Messages'){
        //this.loadMessageThread();
        this.messageService.createHubConnection(this.currentUser, this.member.userName);
      } 
      else
      {
        this.messageService.stopHubConnection();
      }
    }
    console.log(this.currentUser)
   }

  // loadMessageThread(){
  //   const sub$ = this.messageService.getMessageThread(this.member?.userName).subscribe(res => this.messages = res);
  //   this.sub.add(sub$);
  // }

  ngOnDestroy(): void {
   this.sub.unsubscribe();
   this.messageService.stopHubConnection();
  }

}
