import { useQuery, gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import Link from 'next/link';

const LIST_EVENTS = gql`
  query ListEvents {
    listEvents {
      id
      title
      date
      attendees {
        id
      }
    }
  }
`;

export default function EventsPage() {
  const { loading, error, data } = useQuery(LIST_EVENTS, { client });

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Events</h1>
      <div className="flex justify-end mb-6">
        <Link href="/events/new" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Create New Event
        </Link>
      </div>
      <ul className="space-y-4">
        {data.listEvents.map((event: any) => (
          <li key={event.id} className="border border-gray-300 p-6 rounded-lg shadow hover:shadow-lg transition">
            <Link href={`/events/${event.id}`} className="text-2xl font-semibold text-blue-700 hover:underline">
              {event.title}
            </Link>
            <p className="text-gray-600 mt-2">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Attendees: {event.attendees.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
