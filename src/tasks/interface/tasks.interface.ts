import { Category } from 'src/categories/interface/category.interface';

export interface Tasks {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  categoryId: string;
  category: Category;
  updatedAt: Date;
  createdAt: Date;
}
