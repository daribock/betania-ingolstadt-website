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
      description: 'Street name of the church address',
    },
    {
      type: 'string',
      label: 'Number',
      name: 'number',
      description: 'House/building number',
    },
    {
      type: 'string',
      label: 'Ort (City)',
      name: 'ort',
      description: 'City and postal code',
    },
    {
      type: 'string',
      label: 'Email',
      name: 'email',
      description: 'Contact email address',
    },
    {
      type: 'string',
      label: 'Phone',
      name: 'phone',
      description: 'Contact phone number',
    },
  ],
};

export default ContactInformation;
