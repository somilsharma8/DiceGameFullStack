import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root'
})
export class SendPlayerCountService {

  constructor(private appHttp: AppHttpService) { }

  async sendPlayerCount(n: number, maxScore: number) {
    try {
      let response = await this.appHttp.post('playerCount', { count: n, maxScore: maxScore });
      console.log('Response in send-player-count sevice is ' + response['gameID']);
      return response;
    } catch (err) {
      console.log(err);
    }
    
  }
}
