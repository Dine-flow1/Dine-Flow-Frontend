export interface CarouselProps {
  items: any[];
  itemsPerView?: number;
  gap?: number;
  cardWidth?: number;
  autoPlayInterval?: number;
}

export interface ResponsiveConfig {
  itemsPerView: number;
  cardWidth: number;
  gap: number;
}