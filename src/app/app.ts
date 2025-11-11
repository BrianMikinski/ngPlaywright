import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Hello World - Zoneless Angular App');
  protected readonly searchQuery = signal('');
  
  // Demo data
  private readonly allUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', department: 'Sales' },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', department: 'Engineering' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', department: 'HR' }
  ];
  
  protected readonly filteredUsers = signal<User[]>(this.allUsers);
  
  onSearch(): void {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      this.filteredUsers.set(this.allUsers);
      return;
    }
    
    const filtered = this.allUsers.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)
    );
    this.filteredUsers.set(filtered);
  }
  
  onSearchInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
