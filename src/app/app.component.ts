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
  hideSearch: string = 'visible';
  currentPlayer: number = 0;
  showSpinner: boolean = false;

  constructor(private trackerAPIService: TrackerAPIService) {}

  onShowPlayerInsights(show: string[]) {
    this.hideSearch = show[1];
    let playerIndex = this.players.findIndex((player) => {
      return player.name === show[0];
    });
    this.players = this.players.slice(playerIndex, playerIndex + 1);
    this.showScrollBar = this.players.length >= 3 ? 'scroll' : 'hidden';

    console.log(this.players);
  }

  goBackToSearch() {
    this.hideSearch = 'visible';
  }

  getUserInput(player: string[]) {
    let playerAlreadyExists = this.players.find((Currentplayer) => {
      return Currentplayer.name === player[0];
    });

    if (!playerAlreadyExists) {
      this.getPlayerData(player[0], player[1]);
    }

    this.showScrollBar = this.players.length >= 2 ? 'scroll' : 'hidden';
  }

  getPlayerData(playerHandle: string, platform: string) {
    this.trackerAPIService
      .getPlayerData(playerHandle, platform)
      .subscribe((data) => {
        console.log(data);
        let activeLegendBGImg = this.getActiveLegend(data.data.segments);
        this.players.unshift(
          this.convertToPlayerSchema(
            data.data.segments[0].stats,
            playerHandle,
            activeLegendBGImg
          )
        );
        this.showSpinner = false;
      });
  }

  convertToPlayerSchema(
    stats: any,
    playerHandle: string,
    activeLegendBGImg: string
  ) {
    let playerData = {
      name: playerHandle || 'Unknown',
      level: stats.level?.displayValue || 'Unknown',
      kills: stats.kills?.displayValue || 'Unknown',
      damage: stats.damage?.displayValue || 'Unknown',
      rank: {
        iconUrl: stats.rankScore?.metadata.iconUrl,
        rankName: stats.rankScore?.metadata.rankName,
      },
      avtiveLegendBGImg: activeLegendBGImg,
      wins: [
        stats.seasonWins?.value || 0,
        stats.season2Wins?.value || 0,
        stats.season3Wins?.value || 0,
        stats.season4Wins?.value || 0,
        stats.season5Wins?.value || 0,
        stats.season6Wins?.value || 0,
        stats.season7Wins?.value || 0,
        stats.season8Wins?.value || 0,
      ],
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
