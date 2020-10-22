import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root'
})
export class GameEndService {

  constructor(private appHttp: AppHttpService) { }

  async sendGameEndDetails(player: string, gameID: string) {
    try {
      let response = await this.appHttp.post('gameEnd', { player: player, gameID: gameID });
      console.log('Response in game-end sevice is ' + response['status']);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
