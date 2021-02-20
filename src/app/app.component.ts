import { Component, Input } from '@angular/core';
import { PlayerData } from './player-card/player-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ApexTracker';
  players: PlayerData[] = [];
  showScrollBar: string = '';

  addPlayer(players: PlayerData[]) {
    this.players = players;
    this.showScrollBar = this.players.length >= 3 ? 'scroll' : 'hidden';
    console.log('app component players', players);
  }
}
