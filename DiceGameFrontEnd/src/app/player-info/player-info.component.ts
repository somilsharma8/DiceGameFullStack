import { Component, OnInit } from '@angular/core';
import { SendPlayerCountService } from '../services/send-player-count.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

  gameDetailsForm = new FormGroup({
    players: new FormControl('', Validators.required),
    score: new FormControl('', Validators.required)
  });

  constructor(private sendPlayerCountService: SendPlayerCountService, private router: Router) { }

  ngOnInit(): void {
  }

  async sendPlayerCount() {
    try {
      var n = ((document.getElementById("numberOfPlayers") as HTMLInputElement).value);
      var maxScore = ((document.getElementById("maxScore") as HTMLInputElement).value);

      if (this.gameDetailsForm.get('players').valid && this.gameDetailsForm.get('score').valid && Number(n)>0 && Number(maxScore)>0) {
        console.log(`Values entered are ${n} and ${this.gameDetailsForm.get('players').valid}`);
        let response = await this.sendPlayerCountService.sendPlayerCount(Number(n), Number(maxScore));
        console.log(`Backend response is ${response['gameID']}`);
        this.router.navigate(['gamePage'], { queryParams: { n: n, maxScore: maxScore, gameID: response['gameID'] } });
      }
      else {
        alert('Kindly fill all the required fields with valid inputs to start the game!');
      }
    } catch (err) {
      console.log(err);
    }
    
  }

}
