import React from 'react';
import { storiesOf } from '@storybook/react';

import { Radio } from '..';
import { FormField } from '../../form-field';
import '../radio.scss';

storiesOf('Radio', module)
  .add('Basic', () => (
    <React.Fragment>
      <FormField>
        <Radio
          id="radio-1-id"
          label="My Radio 1"
          name="radio-name"
          value="radio-1-value"
        />
      </FormField>
      <FormField>
        <Radio
          id="radio-2-id"
          label="My Radio 2"
          name="radio-name"
          value="radio-2-value"
        />
      </FormField>
    </React.Fragment>
  ))
  .add('Disabled', () => (
    <FormField alignEnd>
      <Radio
        id="radio-1-id"
        label="My Radio"
        name="radio-1-name"
        value="radio-1-value"
        disabled
      />
    </FormField>
  ));
