import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Listbox from './Listbox';
import { useForm } from '../../../../node_modules/react-hook-form';
import Field from '../field/Field';

export default {
  title: 'Components/Form Fields/Listbox',
  component: Listbox,
  argTypes: {
    // backgroundColor: { control: "color" }
  },
} as ComponentMeta<typeof Listbox>;

const Template: ComponentStory<typeof Listbox> = (args) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form>
            <div className="max-w-[20rem]">
              <Listbox {...args}>
                <Field className="input-bordered">Name</Field>
              </Listbox>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  // name: 'name',
  options: [
    { id: 1, label: 'Cool', value: 'cool' },
    { id: 2, label: 'Dropdown', value: 'dropdown' },
    { id: 3, label: 'Bro', value: 'bro' },
  ],
  onSelection: (e: any) => console.log(e),
  onChange: () => {
    console.log('woo');
  },
};

export const Loading = Template.bind({});
Loading.args = {
  // name: 'name',
  loading: true,
  options: [
    { id: 1, label: 'Cool', value: 'cool' },
    { id: 2, label: 'Dropdown', value: 'dropdown' },
    { id: 3, label: 'Bro', value: 'bro' },
  ],
};
