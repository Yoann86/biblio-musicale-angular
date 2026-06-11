import { Component, inject, output, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap, catchError, of, delay } from 'rxjs';
import { TrackService } from '../services/track-service';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-search',
  imports: [],
  templateUrl: './track-search.html',
  styleUrl: './track-search.css',
})
export class TrackSearch {
  private service = inject(TrackService);
  protected term = signal('');
  searched = output<Track[]>();

  private results = toSignal(
    toObservable(this.term).pipe(
      distinctUntilChanged(),
      switchMap((q) =>
        !q
          ? this.service.getTracks()
          : of(null).pipe(
              delay(300),
              switchMap(() => this.service.search(q)),
              catchError(() => of([] as Track[])),
            ),
      ),
    ),
    { initialValue: [] as Track[] },
  );

  constructor() {
    // émet les résultats au parent à chaque changement
    toObservable(this.results).subscribe((r) => this.searched.emit(r));
  }
}
