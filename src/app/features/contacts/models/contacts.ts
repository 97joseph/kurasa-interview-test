export interface IContact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  favorite: boolean;
  group?: string;
  image?: string;
  lastViewed?: Date;
  phone: string;
  deleted?: boolean;
  isSubmitting?: boolean;
}

export interface ContactFilterOptions {
  searchTerm?: string;
  showDeleted?: boolean;
}

