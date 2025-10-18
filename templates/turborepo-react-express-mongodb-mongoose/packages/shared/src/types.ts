// Additional shared types

export type Status = 'active' | 'inactive' | 'pending';

export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

