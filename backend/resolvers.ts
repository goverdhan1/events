import { v4 as uuidv4 } from 'uuid';

interface Attendee {
  id: string;
  name: string;
  email?: string;
  rsvpStatus?: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  attendees: Attendee[];
  tags: Tag[];
}

const events: Event[] = [];

export const resolvers = {
  Query: {
    listEvents: () => events,
    getEvent: (_: any, { id }: { id: string }) => events.find(event => event.id === id),
  },
  Mutation: {
    createEvent: (_: any, { input }: { input: { title: string; date: string; tags?: { name: string }[] } }) => {
      const newEvent: Event = {
        id: uuidv4(),
        title: input.title,
        date: input.date,
        attendees: [],
        tags: input.tags ? input.tags.map(tag => ({ id: uuidv4(), name: tag.name })) : [],
      };
      events.push(newEvent);
      return newEvent;
    },
    addAttendee: (_: any, { eventId, attendee }: { eventId: string; attendee: { name: string; email?: string } }) => {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error('Event not found');
      }
      const newAttendee: Attendee = {
        id: uuidv4(),
        name: attendee.name,
        email: attendee.email,
        rsvpStatus: 'pending',
      };
      event.attendees.push(newAttendee);
      return newAttendee;
    },
    removeAttendee: (_: any, { eventId, attendeeId }: { eventId: string; attendeeId: string }) => {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error('Event not found');
      }
      const index = event.attendees.findIndex(a => a.id === attendeeId);
      if (index === -1) {
        throw new Error('Attendee not found');
      }
      event.attendees.splice(index, 1);
      return true;
    },
  },
};
