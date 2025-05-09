import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';
import { Card } from './card.component';
import { svgs } from './icons/svg';

const meta: Meta<SearchBarComponent> = {
  title: 'Search bar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Card],
    }),
  ],
  argTypes: {
    debounceTime: {
      control: { type: 'number' },
      defaultValue: 200,
      description:
        'Used to delay valueChange so it only emits after the user stops typing',
    },
    submitIcon: {
      control: {
        type: 'select',
      },
      options: Object.keys(svgs),
    },
  },
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = {
  render: (args: any) => ({
    props: {
      variant: args.variant,
      borderColor: args.borderColor,
      debounceTime: args.debounceTime,
      placeholder: args.placeholder,
      buttonVariant: args.buttonVariant,
      showSubmitButton: args.showSubmitButton,
      submitIcon: args.submitIcon,
    },
    template: `
          <cue-card variant="primary" shadow="true">
              <cue-search-bar
                  [placeholder]="placeholder"
                  [debounceTime]="debounceTime"
                  [variant]="variant"
                  [showSubmitButton]="showSubmitButton"
                  [submitIcon]="submitIcon"
                  [buttonVariant]="buttonVariant"
                  (valueChange)="valueChange = $event"
                  (valueSubmit)="valueSubmit = $event"/>
          </cue-card>
        <p>valueChange: {{valueChange}}</p>
        <p>valueSubmit: {{valueSubmit}}</p>`,
  }),
  args: {
    placeholder: 'Search...',
    variant: 'secondary',
    debounceTime: 200,
    showSubmitButton: true,
    submitIcon: 'paperplane',
    buttonVariant: 'accent',
  },
};
