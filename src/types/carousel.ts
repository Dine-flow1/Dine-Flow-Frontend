export interface CarouselItem {
  id: number | string;
  name: string;
  icon: string;
  rating?: number;
  orders?: number;
  trending?: boolean;
  [key: string]: any;
}

export interface CarouselProps {
  items: CarouselItem[];
  itemsPerView?: number;
  cardWidth?: number;
  gap?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  renderItem: (item: CarouselItem, index: number) => React.ReactNode;
  className?: string;
}