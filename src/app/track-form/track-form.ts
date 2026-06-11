import { Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { TrackService } from '../services/track-service';

@Component({
  selector: 'app-track-form',
  imports: [FormField, RouterLink],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  id = input(undefined, { transform: (v: string | undefined) => v ? Number(v) : undefined });

  private service = inject(TrackService);
  private router = inject(Router);

  protected isEdit = false;
  protected model = signal({
    title: '',
    artist: '',
    album: '',
    genre: '',
    durationSeconds: 0,
    year: new Date().getFullYear(),
    rating: 5,
    favorite: false,
    coverUrl: `https://picsum.photos/seed/${Date.now()}/300`,
  });

  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0);
    max(path.rating, 10);
    min(path.year, 1900);
    max(path.year, new Date().getFullYear());
    min(path.durationSeconds, 0);
  });

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.isEdit = true;
        this.service.getTrack(id).subscribe((t) =>
          this.model.set({
            title: t.title,
            artist: t.artist,
            album: t.album ?? '',
            genre: t.genre ?? '',
            durationSeconds: t.durationSeconds ?? 0,
            year: t.year ?? new Date().getFullYear(),
            rating: t.rating,
            favorite: t.favorite,
            coverUrl: t.coverUrl ?? '',
          })
        );
      }
    });
  }

  onDelete() {
    const id = this.id();
    if (!id) return;
    this.service.remove(id).subscribe(() => this.router.navigate(['/tracks']));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.trackForm().valid()) return;

    const id = this.id();
    const data = this.model();

    const request$ = id
      ? this.service.update(id, data)
      : this.service.create(data);

    request$.subscribe(() => this.router.navigate(['/tracks']));
  }
}
