export interface Todo {
  id: string; // Eindeutige ID des Todos
  title: string; // Titel des Todos
  description?: string; // Optionale Beschreibung
  completed: boolean; // Status: erledigt oder nicht
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; // Priorität
  createdAt?: string; // Erstellungsdatum (ISO-Format)
  updatedAt?: string; // Letzte Aktualisierung (ISO-Format)
}

export interface TodoCreate {
  title: string; // Titel des neuen Todos
  description?: string; // Optionale Beschreibung
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; // Priorität
}

export interface TodoUpdate {
  title?: string; // Optionaler neuer Titel
  description?: string; // Optionale neue Beschreibung
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; // Optionale neue Priorität
  completed?: boolean; // Optionaler neuer Status
}
