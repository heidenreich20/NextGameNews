export interface NewsItem {
  id: string;
  title: string;
  text: string;
  image: string;
  author: string;
  category: string;
  type: string;
  console: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface NewsListResponse {
  newsList: NewsItem[];
  totalNewsCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface CategoryResponse {
  newsList: NewsItem[];
  totalNewsCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface ArticleResponse {
  article: NewsItem;
}

export interface SearchResponse {
  newsList: NewsItem[];
  totalNewsCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}
