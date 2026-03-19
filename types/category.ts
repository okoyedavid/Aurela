export type CategoryProps = {
  id: string;
  name: string;
  count: number | null;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
};

export type CategoryPage = {
  category: CategoryProps;
};

export type CategoryArray = {
  category: CategoryProps[];
};
