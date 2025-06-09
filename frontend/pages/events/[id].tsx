import { useQuery, useMutation, gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      date
      attendees {
        id
        name
        email
      }
    }
  }
`;

const ADD_ATTENDEE = gql`
  mutation AddAttendee($eventId: ID!, $attendee: AttendeeInput!) {
    addAttendee(eventId: $eventId, attendee: $attendee) {
      id
      name
      email
    }
  }
`;

const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId)
  }
`;

const AttendeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').optional(),
});

export default function EventDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data, refetch } = useQuery(GET_EVENT, {
    variables: { id },
    skip: !id,
    client,
  });

  const [addAttendee] = useMutation(ADD_ATTENDEE, { client });
  const [removeAttendee] = useMutation(REMOVE_ATTENDEE, { client });

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error loading event: {error.message}</p>;
  if (!data?.getEvent) return <p>Event not found</p>;

  const event = data.getEvent;

  const handleRemove = async (attendeeId: string) => {
    try {
      await removeAttendee({ variables: { eventId: event.id, attendeeId } });
      refetch();
    } catch (err) {
      alert('Error removing attendee: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">{event.title}</h1>
      <p className="mb-6 text-center text-gray-700 text-lg">Date: {new Date(event.date).toLocaleDateString()}</p>
      <Link href="/events" className="mb-6 inline-block text-blue-600 hover:underline">
        Back to Events
      </Link>

      <h2 className="text-2xl font-semibold mb-4">Attendees</h2>
      <ul className="mb-6">
        {event.attendees.map((attendee: any) => (
          <li key={attendee.id} className="flex justify-between items-center border border-gray-300 p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition">
            <div>
              <p className="font-semibold text-lg">{attendee.name}</p>
              {attendee.email && <p className="text-sm text-gray-600">{attendee.email}</p>}
            </div>
            <button
              onClick={() => handleRemove(attendee.id)}
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Add Attendee</h2>
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={AttendeeSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addAttendee({ variables: { eventId: event.id, attendee: values } });
            resetForm();
            refetch();
          } catch (err) {
            alert('Error adding attendee: ' + err.message);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
              <Field name="name" type="text" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email (optional)</label>
              <Field name="email" type="email" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Add Attendee
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
