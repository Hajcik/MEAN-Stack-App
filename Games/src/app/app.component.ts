import { Component } from '@angular/core';
import { GameService } from '../app/game/game.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Games';
  games:any
  game:any

  constructor(private gameService: GameService) {}

  ngOnInit(){
    this.retrieveGames()
  }

  retrieveGames(): void {
    this.gameService.GET_Games().subscribe({
      next: (data) => this.games = data,
      error: (err) => console.error(err),
      complete: () => console.info("Gathered games data succesfully")
    })
    }

  retrieveGame(id:any): void {
    this.gameService.GET_Game(id).subscribe({
      next: (data) => this.game = data,
      error: (err) => console.error(err),
      complete: () => console.info("Gathered info about one game succesfully")
    })
  }
}
