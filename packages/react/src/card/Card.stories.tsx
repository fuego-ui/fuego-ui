import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '.';

export default {
  component: Card,
  title: 'Components/Card',
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'max-w-sm bg-primary text-primary-content rounded-none',
  children: (
    <>
      <figure>
        <img
          src="https://source.unsplash.com/random/400x225?city,night"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </>
  ),
};

export const Secondary = Template.bind({});
Secondary.args = {
  level: 'secondary',
  className: 'max-w-sm bg-secondary text-secondary-content',
  children: (
    <>
      <figure>
        <img
          src="https://source.unsplash.com/random/400x225?city,night"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </>
  ),
};

export const tertiary = Template.bind({});
tertiary.args = {
  level: 'tertiary',
  className: 'max-w-sm bg-tertiary text-tertiary-content',
  children: (
    <>
      <figure>
        <img
          src="https://source.unsplash.com/random/400x225?city,night"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </>
  ),
};

// tertiary.name = 'Card with buttons';
