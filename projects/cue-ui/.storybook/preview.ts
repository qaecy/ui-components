import { componentWrapperDecorator, type Preview } from '@storybook/angular';
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { themes } from '@storybook/theming';
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

setCompodocJson(docJson);

const channel = addons.getChannel();

// Track the current theme
let currentTheme = channel.last(DARK_MODE_EVENT_NAME) || false;

const applyThemeToIframe = (darkMode: boolean) => {
  const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement;
  
  if (iframe) {
    // Wait for iframe to load if needed
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      updateIframeTheme(iframe, darkMode);
    } else {
      iframe.addEventListener('load', () => {
        updateIframeTheme(iframe, darkMode);
      }, { once: true });
    }
  }
};

const updateIframeTheme = (iframe: HTMLIFrameElement, darkMode: boolean) => {
  const iframeDoc = iframe.contentDocument;
  if (iframeDoc) {
    iframeDoc.body.classList.remove('dark', 'light');
    iframeDoc.body.classList.add(darkMode ? 'dark' : 'light');
    
    // Also apply to the root element
    iframeDoc.documentElement.classList.remove('dark', 'light');
    iframeDoc.documentElement.classList.add(darkMode ? 'dark' : 'light');
  }
};

// Listen for theme changes
channel.on(DARK_MODE_EVENT_NAME, (darkMode: boolean) => {
  currentTheme = darkMode;
  applyThemeToIframe(darkMode);
});

// Watch for story changes to reapply theme
channel.on('storyChanged', () => {
  setTimeout(() => applyThemeToIframe(currentTheme), 100);
});

const preview: Preview = {
  decorators: [
    componentWrapperDecorator((story) => {
      // Apply theme immediately when story renders
      setTimeout(() => applyThemeToIframe(currentTheme), 0);
      return story;
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { ...themes.dark, appBg: '#1D2530' },
      light: { ...themes.normal, appBg: '#F1F1F1' },
      stylePreview: true
    },
  }
};

export default preview;