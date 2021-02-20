import { Component, Input } from '@angular/core';
import { PlayerData } from './player-card/player-card.component';
import { TrackerAPIService } from './services/trackerggAPI.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ApexTracker';
  players: PlayerData[] = [];
  showScrollBar: string = '';

  constructor(private trackerAPIService: TrackerAPIService) {}

  getUserInput(player: string[]) {
    this.getPlayerData(player[0], player[1]);
    this.showScrollBar = this.players.length >= 2 ? 'scroll' : 'hidden';
  }

  getPlayerData(playerHandle: string, platform: string) {
    this.trackerAPIService
      .getPlayerData(playerHandle, platform)
      .subscribe((data) => {
        console.log(data);
        let activeLegendBGImg = this.getActiveLegend(data.data.segments);
        this.players.push(
          this.convertToPlayerSchema(
            data.data.segments[0].stats,
            playerHandle,
            activeLegendBGImg
          )
        );
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
    return activeLegend[0].metadata.bgImageUrl;
  }

  deletePlayer(playerName: string) {
    let playerIndex = this.players.findIndex((player) => {
      return player.name === playerName;
    });

    this.players.splice(playerIndex, 1);
    this.showScrollBar = this.players.length >= 3 ? 'scroll' : 'hidden';
  }
}
