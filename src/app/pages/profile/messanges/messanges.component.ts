import { Component } from '@angular/core';
import { Contact } from '../../../models/contact';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messanges.component.html',
  styleUrls: ['./messanges.component.css']
})
export class MessangesComponent {
  contacts: Contact[] = [
    { id: 1, name: 'Ahmed Ben Ali', avatar: 'assets/yassine.jpg', lastMessage: 'Bonjour, je suis intéressé...', lastMessageTime: '10:00' },
    { id: 2, name: 'Sara Toumi', avatar: 'assets/yassine.jpg', lastMessage: 'Pouvez-vous m\'envoyer...', lastMessageTime: '09:30' },
    { id: 3, name: 'Mohamed Salah', avatar: 'assets/yassine.jpg', lastMessage: 'Merci pour votre réponse !', lastMessageTime: '08:45' }
  ];

  selectedContact: Contact | null = null;
  messages: Message[] = [];

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.messages = this.getMessagesForContact(contact.id);
  }

  getMessagesForContact(contactId: number): Message[] {
    // Simuler des messages pour le contact sélectionné
    return [
      { id: 1, senderId: 1, content: 'Bonjour, je suis intéressé par votre propriété.', timestamp: '10:00' },
      { id: 2, senderId: 0, content: 'Bonjour Ahmed, je suis disponible pour une visite.', timestamp: '10:05' },
      { id: 3, senderId: 1, content: 'Parfait, à quelle heure ?', timestamp: '10:10' }
    ];
  }

  sendMessage(message: string) {
    if (this.selectedContact && message.trim()) {
      const newMessage: Message = {
        id: this.messages.length + 1,
        senderId: 0, // 0 = utilisateur actuel
        content: message,
        timestamp: new Date().toLocaleTimeString()
      };
      this.messages.push(newMessage);
    }
  }
}