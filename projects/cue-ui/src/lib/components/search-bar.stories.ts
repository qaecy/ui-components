import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';
import { Card } from './card.component';
import svgs from './icons/svg.json';
import { Container } from './container.component';

const meta: Meta<SearchBarComponent> = {
  title: 'Search bar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Card, Container],
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
    buttonVariant: 'accent',
    debounceTime: 200,
    showSubmitButton: true,
    submitIcon: 'search',
  },
};

export const Narrow: Story = {
  render: (args: any) => ({
    props: {
      variant: args.variant,
      debounceTime: args.debounceTime,
      placeholder: args.placeholder,
      buttonVariant: args.buttonVariant,
      showSubmitButton: args.showSubmitButton,
      submitIcon: args.submitIcon,
    },
    template: `
    <cue-container width="20em">
      <cue-card variant="primary">
        <cue-search-bar [placeholder]="placeholder" [debounceTime]="debounceTime"
            [submitIcon]="submitIcon" [showSubmitButton]="showSubmitButton"
            [backgroundColor]="backgroundColor" [borderColor]="borderColor"
            [textColor]="textColor" [searchIconBackground]="searchIconBackground"
            (valueChange)="valueChange = $event"
            (valueSubmit)="valueSubmit = $event">
        </cue-search-bar>
      </cue-card>
    </cue-container>
    <p>valueChange: {{valueChange}}</p>
    <p>valueSubmit: {{valueSubmit}}</p>`,
  }),
  args: {
    placeholder: 'Search...',
    variant: 'secondary',
    buttonVariant: 'accent',
    debounceTime: 200,
    showSubmitButton: true,
    submitIcon: 'search',
  },
};
