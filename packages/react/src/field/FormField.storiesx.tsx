// import React, { useMemo } from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

// import Field from '.';
// import { useForm } from 'react-hook-form';

// export default {
//   title: 'Components/Form Fields/Text Fields',
//   component: Field,
//   argTypes: {},
// } as ComponentMeta<typeof Field>;

// const Template: ComponentStory<typeof Field> = (args) => {
//   const {
//     register,
//     handleSubmit,
//     getValues,
//     formState: { isDirty, isValid, errors },
//   } = useForm({
//     mode: 'onChange',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       name: '',
//     },
//   });

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col">
//           <form>
//             <Field
//               {...args}
//               {...register('name', {
//                 required: true,
//                 pattern: /[A-Za-z]{2}$/i,
//               })}
//               fieldErrors={errors.name ? true : false}
//               errorLabel={errors.name && 'Valid email is required!'}
//             >
//               {args.children}
//             </Field>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const TextField = Template.bind({});
// TextField.args = {
//   name: 'name',
//   floatLabel: true,
//   autoComplete: 'off',
//   placeholder: 'Type Here',
// };

// export const TextFieldBordered = Template.bind({});
// TextFieldBordered.args = {
//   name: 'name',
//   className: 'input-bordered',
//   placeholder: 'Type Here',
//   autoComplete: 'off',
// };

// export const TextFieldFloatLabel = Template.bind({});
// TextFieldFloatLabel.args = {
//   name: 'name',
//   floatLabel: true,
//   className: 'input-bordered',
//   autoComplete: 'off',
//   children: 'Name',
// };

// export const TextArea = Template.bind({});
// TextArea.args = {
//   name: 'name',
//   floatLabel: true,
//   autoComplete: 'off',
//   type: 'textarea',
// };

// export const TextAreaBordered = Template.bind({});
// TextAreaBordered.args = {
//   name: 'name',
//   floatLabel: true,
//   autoComplete: 'off',
//   className: 'input-bordered',
//   type: 'textarea',
// };

// export const TextAreaFloatLabel = Template.bind({});
// TextAreaFloatLabel.args = {
//   name: 'name',
//   floatLabel: true,
//   autoComplete: 'off',
//   className: 'input-bordered',
//   type: 'textarea',
//   children: 'Name',
// };
export {};
