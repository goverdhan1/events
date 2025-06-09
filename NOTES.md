# Notes for Event Manager App

## Assumptions
- Users entity is included in the data model but not implemented in this minimal app.
- RSVP status is a simple string and defaults to "pending" when an attendee is added.
- Tags are included in the schema but tag management UI is not implemented in this version.
- In-memory storage is used for simplicity; data will reset on server restart.
- No authentication or authorization is implemented.
- Form validation is basic using Yup for required fields and email format.
- Optimistic UI and responsive design are not implemented but can be added as enhancements.

## Known Issues
- Data persistence is not available due to in-memory storage.
- No pagination or filtering on event list.
- No update or delete functionality for events.
- No update functionality for attendees.
- Minimal styling; UI can be improved for better UX.

## Future Improvements
- Add user authentication and event ownership.
- Implement tag management UI.
- Add update and delete operations for events and attendees.
- Use a persistent database instead of in-memory storage.
- Add optimistic UI updates for better responsiveness.
- Improve styling and add responsive design.
- Add tests for backend and frontend components.
