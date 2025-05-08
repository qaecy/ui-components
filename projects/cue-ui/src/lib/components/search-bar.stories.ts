import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';
import { CardComponent } from './card.component';
import { supportedIcons } from './icon.component';

const meta: Meta<SearchBarComponent> = {
  title: 'Search bar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
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
      options: supportedIcons,
    },
  },
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = {
  render: (args: any) => ({
    props: {
      backgroundColor: args.backgroundColor,
      borderColor: args.borderColor,
      debounceTime: args.debounceTime,
      placeholder: args.placeholder,
      searchIconBackground: args.searchIconBackground,
      showSubmitButton: args.showSubmitButton,
      submitIcon: args.submitIcon,
      textColor: args.textColor,
    },
    template: `<cue-card>
            <cue-search-bar [placeholder]="placeholder" [debounceTime]="debounceTime"  
                [submitIcon]="submitIcon" [showSubmitButton]="showSubmitButton"
                [backgroundColor]="backgroundColor" [borderColor]="borderColor"
                [textColor]="textColor" [searchIconBackground]="searchIconBackground"
                (valueChange)="valueChange = $event"
                (valueSubmit)="valueSubmit = $event">
            </cue-search-bar>
        </cue-card>
        <p>valueChange: {{valueChange}}</p>
        <p>valueSubmit: {{valueSubmit}}</p>`,
  }),
  args: {
    placeholder: 'Search...',
    debounceTime: 200,
    showSubmitButton: true,
    submitIcon: "search",
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: 'var(--cue-info)',
    textColor: 'var(--cue-extra-light-gray)',
    searchIconBackground: 'var(--cue-accent)',
  },
};
