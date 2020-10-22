import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Chart } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { resolve } from 'url';
import { rejects } from 'assert';
import { GameEndService } from '../services/game-end.service';


@Component({
  selector: 'game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit {

  playersGame = new FormGroup({  });

  //public doughnutChartLabels: Label[] = ['Score'];

  gifDisplay = true;
  buttonDisplay = false;

  n; maxScore; nCurrent = 1; players = []; playerScore = []; totalScore = 0; gameID;
  //@Input() nCurrent: number;

  constructor(private gameEndService: GameEndService , private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(`Query Parameter received is ${data.gameID}`);
      this.n = Number(data.n);
      this.maxScore = Number(data.maxScore);
      this.gameID = data.gameID
    });

    for (let i = 1; i <= this.n; i++) {
      this.players.push({
        player: `Player ${i}`,
        score: 0,
        lastRolled: 0
      });
    }
  }

  ngOnInit(): void {
   // Define pie chart here if you have time left
  }

  displayDiceRoll() {
    this.gifDisplay = !this.gifDisplay;

    let dice = Math.floor((Math.random() * 6) + 1);
    console.log(`The dice roll resulted in a ${dice}`);

    this.totalScore += dice;

    // Check if game should end
    if (this.totalScore >= this.maxScore) {
      dice = dice - (this.totalScore - this.maxScore);
      this.players[this.nCurrent - 1]['score'] += dice;
      console.log(this.players);
      this.gifDisplay = !this.gifDisplay;
      this.buttonDisplay = !this.buttonDisplay;
      this.sendGameEndInfo(this.players[this.nCurrent -1]['player']);

      //Sorting players by rank
      this.players.sort(function (a, b) {
        return b.score - a.score;
      });

      document.getElementById('playerTurnLabel').innerHTML = `Congratulations ${this.players[0]['player']} is the winner!`;
      alert(`The game has ended!`);
    }

    else {
      // Check if turn to be skipped
      if (this.players[this.nCurrent - 1]['lastRolled'] === 7) {
        console.log(`${this.players[this.nCurrent - 1]['player']}'s this chance is being skipped for rolling two consecutive 1s`);

        this.players[this.nCurrent - 1]['lastRolled'] = 0;

        if (this.nCurrent === this.n)
          this.nCurrent = 1;
        else
          this.nCurrent++;
      }

      else {
        this.promise().then(() => {
          this.gifDisplay = !this.gifDisplay;

          /*if (this.playerScore[this.nCurrent] > 1)
            this.playerScore[this.nCurrent] += dice;
          else
            this.playerScore[this.nCurrent] = dice;*/

          // Check 1 rolled condition
          if (this.players[this.nCurrent - 1]['lastRolled'] === 1 && dice === 1) {
            alert(`Since ${this.players[this.nCurrent - 1]['player']} rolled "1" twice, consecutively, their next turn is skipped!`);
            this.players[this.nCurrent - 1]['lastRolled'] = 7;
          }
          else {
            this.players[this.nCurrent - 1]['lastRolled'] = dice;
          }

          this.players[this.nCurrent - 1]['score'] += dice;
          console.log(this.players);

          console.log(`The score for ${this.players[this.nCurrent - 1]['player']} is ${typeof (this.players[this.nCurrent - 1]['score'])}`);

          //Sorting players by rank
          this.players.sort(function (a, b) {
            return b.score - a.score;
          });

          // Check 6 rolled condition and or update nCurrent value
          if (this.nCurrent === this.n)
            this.nCurrent = 1;
          else if (dice === 6)
            alert('Player rolled a 6 so they get another chance!');
          else
            this.nCurrent++;
        });
      }
    }
  }

  promise() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  }

  async sendGameEndInfo(player: string) {
    console.log(`Sending post request for game end ${this.gameID}`);
    let response = await this.gameEndService.sendGameEndDetails(player, this.gameID);
    console.log(response);
  }



}
