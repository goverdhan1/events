import { useMutation, gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      date
    }
  }
`;

const EventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  date: Yup.date().required('Date is required'),
});

export default function NewEventPage() {
  const router = useRouter();
  const [createEvent] = useMutation(CREATE_EVENT, { client });

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Create New Event</h1>
      <Link href="/events" className="mb-6 inline-block text-blue-600 hover:underline">
        Back to Events
      </Link>
      <Formik
        initialValues={{ title: '', date: '' }}
        validationSchema={EventSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { data } = await createEvent({ variables: { input: values } });
            router.push(`/events/${data.createEvent.id}`);
          } catch (error) {
            alert('Error creating event: ' + error.message);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
              <Field name="title" type="text" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="date" className="block text-lg font-semibold mb-2">Date</label>
              <Field name="date" type="date" className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="date" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Event
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
