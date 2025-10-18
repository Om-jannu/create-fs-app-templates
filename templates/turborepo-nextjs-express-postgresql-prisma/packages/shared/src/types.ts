// Additional shared types can be added here

export type Status = 'active' | 'inactive' | 'pending';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
