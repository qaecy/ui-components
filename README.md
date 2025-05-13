# UI Components

[View online](https://qaecy.github.io/ui-components)

This library contains all Cue UI components.

## Backward compatability

Create separate branches for major Angular versions and use npm tags (e.g., v19, v20).

## Storybook

Serve: `npm run storybook`
Build: `npm run build-storybook`

## CUE-Theme

- all cue related css properties are prefixed with "cue"
- base css is located under projects/cue-ui/src/theme/; since :ng-deep should be avoided, this can not be put at component level
- use cue-typography for displaying type whenever possible, or use the corresponding css properties

## Dark mode

Dark mode is applied by setting the class `dark` on the body. In order to get this to work with Storybook which uses an iframe for the current story a hack had to be implemented in `.storybook/preview.ts`

## Icons

a node cli script under tools/iconconvert minmizes the svg files located under tools/iconconvert/icons/
after adding new svg icon files, run node convert.js and commit
this will overwrite projects/cue-ui/src/lib/components/icons/types.ts and projects/cue-ui/src/lib/components/icons/svg.json

## Roadmap

- Build all components used in Figma [Wireframes 1](https://www.figma.com/design/h5fVJbtTez0KZyVrj5uw2K/User-Interface?node-id=102-2085&m=dev) and [Wireframes 2](https://www.figma.com/design/qPs1KmEVp6guLV8rfTc9YJ/250410_CUE_Interface?node-id=1-2219&t=7pdDck1Eawi4U0up-0)
