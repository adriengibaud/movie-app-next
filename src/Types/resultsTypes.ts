export interface Results {
  size: 'small' | 'medium' | 'big';
  status: string;
  text: boolean;
  totalPages: number;
  type: 'film' | 'actor';
  moreResults: Function;
  data: {
    id: number;
    original_title?: string;
    poster_path?: string;
  }[];
}
