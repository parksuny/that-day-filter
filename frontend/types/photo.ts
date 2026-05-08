export type Photo = {
  id: number;
  title: string;
  imageUrl: string;
  situation: string;
  mood: string;
  filterName: string;
  date: string;
};

export type FilterResult = {
  name: string;
  css: string;
  description: string;
};