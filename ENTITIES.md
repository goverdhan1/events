# Entities

## User
- id: string (unique identifier)
- name: string
- email: string (unique email address)

## Event
- id: string (unique identifier)
- title: string
- date: string (ISO date string)
- attendees: Attendee[] (list of attendees)
- tags: Tag[] (list of tags)

## Attendee
- id: string (unique identifier)
- name: string
- email: string (optional)
- rsvpStatus: string (e.g., "pending", "accepted", "declined")

## Tag
- id: string (unique identifier)
- name: string

# Relationships
- Users can create and manage events (create, view, update, delete)
- Attendees can attend multiple events, but they are not Users
- Each Event can have one or more Tags (e.g., "Internal", "Public", "Team Offsite")
- Attendees may attend multiple events, and their RSVP status is tracked

# Constraints and Indexes
- Unique identifiers for all entities
- Unique email for Users
- Event date stored as ISO string for sorting and filtering
- Join entities not needed due to in-memory storage, but would be needed in a real DB

# Assumptions
- Users are not implemented in this minimal app but included for completeness
- RSVP status is a simple string for demonstration
- Tags are simple labels without hierarchy
