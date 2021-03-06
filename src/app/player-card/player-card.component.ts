import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

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
  wins: number[];
}

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() player: any;
  @Output() deletePlayer = new EventEmitter<string>();
  @Output() showPlayerStats = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit(): void {}

  removePlayer(playerName: string) {
    this.deletePlayer.emit(playerName);
  }

  showInsights(PlayerName: string) {
    this.showPlayerStats.emit([PlayerName, 'hidden']);
  }
}
