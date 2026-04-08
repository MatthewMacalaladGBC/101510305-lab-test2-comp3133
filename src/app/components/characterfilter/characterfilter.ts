import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HarryPotterService } from '../../services/harry-potter';
import { Character } from '../../models/character';
import { HouseColourPipe } from '../../pipes/house-colour-pipe';

@Component({
  selector: 'app-characterfilter',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HouseColourPipe
  ],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css',
})
export class Characterfilter {
  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  houseControl = new FormControl('Gryffindor');

  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private hpService: HarryPotterService, private router: Router) {
    this.fetchByHouse('Gryffindor');
    this.houseControl.valueChanges.subscribe(house => {
      if (house) this.fetchByHouse(house);
    });
  }

  fetchByHouse(house: string) {
    this.loading.set(true);
    this.error.set('');
    this.hpService.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load characters for this house from API. Please try again');
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

  get houseBackground(): string {
    switch (this.houseControl.value?.toLowerCase()) {
      case 'gryffindor': return '#7f0909';
      case 'slytherin': return '#2a623d';
      case 'hufflepuff': return '#e1b033';
      case 'ravenclaw': return '#222f5b';
      default: return '#000000';
    }
  }
}
