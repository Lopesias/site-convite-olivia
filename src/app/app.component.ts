import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Olivia';
  isMenuOpen = false;
  countdownTarget = '2026-10-18T16:00:00';
  timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  opened = false;
  galleryImages = [
    'assets/gallery/foto-1.jpeg',
    'assets/gallery/foto-2.jpeg',
    'assets/gallery/foto-3.jpeg'
  ];

  @ViewChildren('galleryItem', { read: ElementRef }) galleryItems!: QueryList<ElementRef<HTMLElement>>;

  ngOnInit(): void {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  ngAfterViewInit(): void {
    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            galleryObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    this.galleryItems.forEach((item) => galleryObserver.observe(item.nativeElement));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    const sections = document.querySelectorAll('.block, .gallery-card, .map-card, .footer-card, .lineup .row');
    sections.forEach((section) => sectionObserver.observe(section));
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
