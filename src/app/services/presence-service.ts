import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from '../DTOs/UserDto';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PresenceService {

  private hubUrl = "https://localhost:7024/hubs";
  private hubConnection: HubConnection;

  private usersOnline = new BehaviorSubject<string[]>([]);
  public usersOnline$ = this.usersOnline.asObservable();

  constructor(private toast: ToastrService, private router: Router){}

  createHubConnection(user: UserDto){
    this.hubConnection = new HubConnectionBuilder().withUrl(
      `${this.hubUrl}/presence`, {
        accessTokenFactory: () => user.token,
      }
    ).withAutomaticReconnect().build();

    this.hubConnection.start()
    .then(() => console.log('Connection started'))
    .catch(err => console.error('Error while starting connection: ' + err));

    this.hubConnection.on("UserIsOnline", (userName: string) => {
      this.toast.success(userName + ' is online');
    });

    this.hubConnection.on("UserIsOffline", (userName: string) => {
      this.toast.error(userName + ' is offline');
    });

    this.hubConnection.on("GetOnlineUsers", (users: string[]) => {
      this.usersOnline.next(users);
      console.log(users);
    });

    this.hubConnection.on("NewMessageReceived", ({userName, content}) => {
      this.toast.info(userName + " sent you a message").onTap.pipe(take(1)).subscribe(() => {
        this.router.navigateByUrl('/member/' + userName + '?tab=2');
      })
    });
  }

  stopHubConnection(){
    this.hubConnection.stop().catch(err => {
      this.toast.error("stop hub connection error")
    });
  }
}
