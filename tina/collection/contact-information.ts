/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Collection } from 'tinacms';

const ContactInformation: Collection = {
  label: 'Contact Information',
  name: 'contactInformation',
  path: 'content/contact-information',
  format: 'json',
  ui: {
    global: true,
  },
  fields: [
    {
      type: 'string',
      label: 'Street',
      name: 'street',
    },
    {
      type: 'string',
      label: 'Number',
      name: 'number',
    },
    {
      type: 'string',
      label: 'Ort (City)',
      name: 'ort',
    },
    {
      type: 'string',
      label: 'Email',
      name: 'email',
    },
    {
      type: 'string',
      label: 'Phone',
      name: 'phone',
    },
  ],
};

export default ContactInformation;
