import React from 'react';
import { storiesOf } from '@storybook/react';

import { FormField } from '../../form-field';
import { Checkbox } from '..';
import '../checkbox.scss';

storiesOf('Checkbox', module)
  .add('Unchecked', () => (
    <Checkbox
      id="checkbox-1-id"
      name="checkbox-1-name"
      value="checkbox-1-value"
    />
  ))
  .add('Indeterminate', () => (
    <Checkbox
      id="checkbox-1-id"
      name="checkbox-1-name"
      value="checkbox-1-value"
      indeterminate
    />
  ))
  .add('Checked', () => (
    <Checkbox
      id="checkbox-1-id"
      name="checkbox-1-name"
      value="checkbox-1-value"
      checked
    />
  ))
  .add('Disabled', () => (
    <FormField>
      <Checkbox
        id="checkbox-1-id"
        name="checkbox-1-name"
        label="My Checkbox"
        value="checkbox-1-value"
        disabled
      />
    </FormField>
  ));
