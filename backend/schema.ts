import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [Attendee!]!
    tags: [Tag!]!
  }

  type Attendee {
    id: ID!
    name: String!
    email: String
    rsvpStatus: String
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Query {
    listEvents: [Event!]!
    getEvent(id: ID!): Event
  }

  input AttendeeInput {
    name: String!
    email: String
  }

  input TagInput {
    name: String!
  }

  input CreateEventInput {
    title: String!
    date: String!
    tags: [TagInput!]
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event!
    addAttendee(eventId: ID!, attendee: AttendeeInput!): Attendee!
    removeAttendee(eventId: ID!, attendeeId: ID!): Boolean!
  }
`;
