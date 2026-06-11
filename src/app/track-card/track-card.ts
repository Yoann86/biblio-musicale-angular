// track-card.ts (enrichi)
import { Component, input, output } from '@angular/core';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';
import { environment } from '../../environements/environement';

@Component({
  selector: 'app-track-card',
  imports: [DurationFormatPipe],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css'
})
export class TrackCard {
  track = input.required<Track>();
  active = input(false);
  protected features = environment.features;
  
  select = output<Track>();
  open = output<Track>();

  favorite  = input(false);
  toggleFavorite = output<Track>();
}