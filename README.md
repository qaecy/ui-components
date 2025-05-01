# UI Components

This library contains all Cue UI components.

## Backward compatability
Create separate branches for major Angular versions and use npm tags (e.g., v19, v20).

## Storybook
Serve: `ng run cue-ui:storybook`
Build: `npm run build-storybook`

## Color scheme
Color scheme is generated with `ng generate @angular/material:theme-color`
- primary: #2859E1
- secondary: #121C2B
- tertiary: #E2F552
- neutral: #1948CA
- error: #FC2626
- Do you want to generate high contrast value override mixins? No
- Path: projects/cue-ui/src/styles
- Scss? Yes

Each component might override colors but it will always use the `--cue` prefixed variables found in `styles.scss`

## Dark mode
Dark mode is applied by setting the class `dark` on the body. In order to get this to work with Storybook which uses an iframe for the current story a hack had to be implemented in `.storybook/preview.ts`

## Roadmap
- Build all components used in Figma [Wireframes 1](https://www.figma.com/design/h5fVJbtTez0KZyVrj5uw2K/User-Interface?node-id=102-2085&m=dev) and [Wireframes 2](https://www.figma.com/design/qPs1KmEVp6guLV8rfTc9YJ/250410_CUE_Interface?node-id=1-2219&t=7pdDck1Eawi4U0up-0)