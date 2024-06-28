import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) { }

  async GetBaseStorageUrl(): Promise<BaseUrl>
  {
    const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
        controller: "files",
        action: "GetBaseStorageUrl"
    });
    return await firstValueFrom(getObservable);
  }
}