import React from 'react';
import { storiesOf } from '@storybook/react';

import { Checkbox } from '../../checkbox';
import { FormField } from '..';
import '../form-field.scss';

storiesOf('Form Field', module)
  .add('Basic', () => (
    <FormField>
      <Checkbox
        id="checkbox-1-id"
        label="My Checkbox"
        name="checkbox-1-name"
        value="checkbox-1-value"
      />
    </FormField>
  ))
  .add('Align End', () => (
    <FormField alignEnd>
      <Checkbox
        id="checkbox-1-id"
        label="My Checkbox"
        name="checkbox-1-name"
        value="checkbox-1-value"
        indeterminate
      />
    </FormField>
  ));
