import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../button/Button';
import { Card } from './Card';

export default {
  component: Card,
  title: 'Components/Card',
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'max-w-sm',
  children: (
    <div>
      <img
        src="https://source.unsplash.com/random/?city,night,200x200"
        alt="sample image"
      />
      <h3>Cool Title</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  ),
};

export const Secondary = Template.bind({});
Secondary.args = {
  level: 'secondary',
  className: 'max-w-sm',
  children: (
    <div>
      <img
        src="https://source.unsplash.com/random/?city,night,200x200"
        alt="sample image"
      />
      <h3>Cool Title</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  ),
};

export const tertiary = Template.bind({});
tertiary.args = {
  level: 'secondary',
  className: 'max-w-sm',
  children: (
    <div>
      <img
        src="https://source.unsplash.com/random/?city,night,200x200"
        alt="sample image"
      />
      <h3>Cool Title</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <div className="flex gap-3 mt-8">
        <div className="flex-1">
          <Button className="w-full" level="primary">
            Primary
          </Button>
        </div>
        <div className="flex-1">
          <Button className="w-full" level="secondary">
            Secondary
          </Button>
        </div>
      </div>
    </div>
  ),
};

// tertiary.name = 'Card with buttons';
