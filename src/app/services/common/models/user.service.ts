import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../Entities/User';
import { Create_User } from 'src/app/contracts/Users/Create_User';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from 'src/app/contracts/Token/token';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<Create_User>
  {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users",
    }, user)

    return await firstValueFrom(observable) as Create_User;
  }

  
}
