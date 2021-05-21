export interface Card {
  size: 'small' | 'medium' | 'big';
  image: string;
  title: string;
  id: number;
  clickHandler: Function;
}
