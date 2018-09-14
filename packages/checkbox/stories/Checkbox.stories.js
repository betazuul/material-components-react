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
  .add('Unchecked with label', () => (
    <FormField>
      <Checkbox
        id="checkbox-1-id"
        label="My Checkbox"
        name="checkbox-1-name"
        value="checkbox-1-value"
      />
    </FormField>
  ))
  .add('Indeterminate', () => (
    <Checkbox
      id="checkbox-1-id"
      name="checkbox-1-name"
      value="checkbox-1-value"
      indeterminate
    />
  ))
  .add('Indeterminate with label', () => (
    <FormField>
      <Checkbox
        id="checkbox-1-id"
        label="My Checkbox"
        name="checkbox-1-name"
        value="checkbox-1-value"
        indeterminate
      />
    </FormField>
  ))
  .add('Checked', () => (
    <Checkbox
      id="checkbox-1-id"
      name="checkbox-1-name"
      value="checkbox-1-value"
      checked
    />
  ))
  .add('Checked with label', () => (
    <FormField>
      <Checkbox
        id="checkbox-1-id"
        label="My Checkbox"
        name="checkbox-1-name"
        value="checkbox-1-value"
        checked
      />
    </FormField>
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
