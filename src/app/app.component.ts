import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Olivia';
  isMenuOpen = false;
  countdownTarget = '2026-10-18T16:00:00';
  timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  opened = false;
  galleryImages = [
    'assets/gallery/WhatsApp Image 2026-08-01 at 13.31.41.jpeg',
    'assets/gallery/WhatsApp Image 2026-08-01 at 13.31.41 (1).jpeg',
    'assets/gallery/WhatsApp Image 2026-08-01 at 13.31.41 (2).jpeg'
  ];

  ngOnInit(): void {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private updateCountdown(): void {
    const target = new Date(this.countdownTarget).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    this.timeLeft = {
      days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
      minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
      seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000))
    };
  }
}
