import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TrackService } from '../services/track-service';
import { AuthService } from '../services/auth-service';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.html',
  imports: [RouterLink, DurationFormatPipe],
  styleUrl: './track-detail.css',
})
export class TrackDetail {
  id = input.required({ transform: (v: string) => Number(v) });
  private service = inject(TrackService);
  private router = inject(Router);
  protected auth = inject(AuthService);

  protected track = toSignal(
    toObservable(this.id).pipe(switchMap((trackId) => this.service.getTrack(trackId))),
  );

  protected onDelete() {
    this.service.remove(this.id()).subscribe(() => this.router.navigate(['/tracks']));
  }
}