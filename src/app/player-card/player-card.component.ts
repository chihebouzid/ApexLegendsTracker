import { Component, Input, OnInit } from '@angular/core';

export interface PlayerData {
  name: string;
  level: string;
  kills: string;
  damage: string;
  rank: {
    iconUrl: string;
    rankName: string;
  };
  avtiveLegendBGImg: string;
}

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() players: PlayerData[] = [];

  constructor() {}

  ngOnInit(): void {}

  deletePlayer(playerName: string) {
    console.log('onDelete', playerName);
    let playerIndex = this.players.findIndex((player) => {
      return player.name === playerName;
    });

    this.players.splice(playerIndex, 1);
  }
}
