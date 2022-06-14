import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../data/web-api';
import { ContactUpdated, ContactViewed } from '../../messages';
import { inject } from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class ContactList {
  contacts;
  selectedId = 0;

  constructor(private api: WebAPI, ea: EventAggregator) {
    ea.subscribe(ContactViewed, (msg: { contact: { id: number; }; }) => this.select(msg.contact));
    ea.subscribe(ContactUpdated, (msg: { contact: { id: number; }; }) => {
      let id = msg.contact.id;
      let found = this.contacts.find((x: { id: number; }) => x.id == id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact: { id: number; }) {
    this.selectedId = contact.id;
    return true;
  }
}
