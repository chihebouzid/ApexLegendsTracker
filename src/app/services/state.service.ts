import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerData } from '../player-card/player-card.component';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addPlayer, removePlayer, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _players = new BehaviorSubject<PlayerData[]>([]);

  // Expose the observable$ part of the _todos subject (read only stream)
  readonly players$ = this._players.asObservable();

  // the getter will return the last value emitted in _todos subject
  get players(): PlayerData[] {
    return this._players.getValue();
  }

  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
  set players(val: PlayerData[]) {
    this._players.next(val);
  }

  addPlayer(title: string) {
    // we assaign a new copy of todos by adding a new todo to it
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.players = [...this.players];
  }

  // removeTodo(id: number) {
  //   this.players = this.players.filter((todo) => todo.id !== id);
  // }
}
