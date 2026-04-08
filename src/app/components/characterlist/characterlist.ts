import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HarryPotterService } from '../../services/harry-potter';
import { Character } from '../../models/character';
import { HouseColourPipe } from '../../pipes/house-colour-pipe';

@Component({
  selector: 'app-characterlist',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HouseColourPipe
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css',
})
export class Characterlist implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private hpService: HarryPotterService, private router: Router) {}

  ngOnInit() {
    this.hpService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load characters from API. Please try again');
        this.loading.set(false);
      }
    });
  }

  goToDetails(character: Character) {
    this.hpService.setSelectedCharacter(character);
    this.router.navigate(['/character', character.id]);
  }

  getPlaceholder(name: string): string {
    return `https://placehold.co/250?text=${encodeURIComponent(name)}`;
  }

}
