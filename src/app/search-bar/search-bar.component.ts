import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerData } from '../player-card/player-card.component';
import { TrackerAPIService } from '../services/trackerggAPI.service';

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
  constructor(private trackerAPIService: TrackerAPIService) {}
  @Output() playerAdded = new EventEmitter<PlayerData[]>();

  ngOnInit(): void {}

  getPlayerData(playerHandle: string, platform: string) {
    this.trackerAPIService
      .getPlayerData(playerHandle, platform)
      .subscribe((data) => {
        console.log('PlayerData:', data);
        let activeLegendBGImg = this.getActiveLegend(data.data.segments);
        this.players.push(
          this.convertToPlayerSchema(
            data.data.segments[0].stats,
            playerHandle,
            activeLegendBGImg
          )
        );
        this.playerAdded.emit(this.players);
      });
  }

  convertToPlayerSchema(
    stats: any,
    playerHandle: string,
    activeLegendBGImg: string
  ) {
    let playerData = {
      name: playerHandle,
      level: stats.level.displayValue,
      kills: stats.kills.displayValue,
      damage: stats.damage.displayValue,
      rank: {
        iconUrl: stats.rankScore.metadata.iconUrl,
        rankName: stats.rankScore.metadata.rankName,
      },
      avtiveLegendBGImg: activeLegendBGImg,
    };
    return playerData;
  }

  getActiveLegend(data: any) {
    let activeLegend = data.filter((legend: any) => {
      return legend.metadata.isActive;
    });
    console.log('activeLegend', activeLegend);
    return activeLegend[0].metadata.bgImageUrl;
  }
}
