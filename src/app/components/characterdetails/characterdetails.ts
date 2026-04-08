import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HarryPotterService } from '../../services/harry-potter';
import { Character } from '../../models/character';
import { HouseColourPipe } from '../../pipes/house-colour-pipe';

@Component({
  selector: 'app-characterdetails',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    HouseColourPipe
  ],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css',
})
export class Characterdetails implements OnInit {
  character = signal<Character | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(private hpService: HarryPotterService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const char = this.hpService.selectedCharacter();
    const id = this.route.snapshot.paramMap.get('id');

    if (char && char.id === id) {
      this.character.set(char);
      this.loading.set(false);
    } else if (id) {
      this.hpService.getCharacterById(id).subscribe({
        next: (data) => {
          this.character.set(data[0]);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load the selected character details from the API. Please try again.');
          this.loading.set(false);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getPlaceholder(name: string): string {
    return `https://placehold.co/250?text=${encodeURIComponent(name)}`;
  }

  get houseBackground(): string {
    switch (this.character()?.house?.toLowerCase()) {
      case 'gryffindor': return '#7f0909';
      case 'slytherin': return '#2a623d';
      case 'hufflepuff': return '#e1b033';
      case 'ravenclaw': return '#222f5b';
      default: return '#ffffff';
    }
  }
}
