// track-card.ts (enrichi)
import { Component, input, output } from '@angular/core';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';

@Component({
  selector: 'app-track-card',
  imports: [DurationFormatPipe],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css'
})
export class TrackCard {
  track = input.required<Track>();
  active = input(false);
  select = output<Track>();
  open = output<Track>();
}