export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoCreate {
  title: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  completed?: boolean;
}
