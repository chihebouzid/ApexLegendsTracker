import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerData } from '../player-card/player-card.component';

interface Platform {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  selectedPlatform: string = 'origin';
  playerHandle: string = 'Chihebouzid';
  platforms: Platform[] = [
    { value: 'origin', viewValue: 'PC' },
    { value: 'xbl', viewValue: 'Xbox' },
    { value: 'psn', viewValue: 'Playstation' },
  ];
  players: PlayerData[] = [];
  constructor() {}
  @Output() userInput = new EventEmitter<string[]>();

  ngOnInit(): void {}

  getUserInput(playerHandle: string, platform: string) {
    let playerData = [playerHandle, platform];
    this.userInput.emit(playerData);
  }
}
