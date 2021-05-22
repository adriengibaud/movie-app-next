export interface Card {
  size: 'small' | 'medium' | 'big';
  image: string;
  title?: string;
  text: boolean;
  id: number;
  clickHandler: Function;
}
