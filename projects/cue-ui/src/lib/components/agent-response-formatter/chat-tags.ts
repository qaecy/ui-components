/**
 * These are all the parsers supported by the bot response viewer
 * Each provider will be lazy loaded when needed
 */
export const chatTags = [
  {
    component: {
      importPromise: () =>
        import('./chat-components/bim-viewer/bim-viewer.component'),
      importName: 'InChatBIMViewer',
    },
    selector: 'bim-viewer',
  },
  {
    component: {
      importPromise: () =>
        import('./chat-components/map/map.component'),
      importName: 'InChatMap',
    },
    selector: 'map',
  },
  {
    component: {
      importPromise: () =>
        import('./chat-components/inline-ref/inline-ref.component'),
      importName: 'InlineRefComponent',
    },
    selector: 'ref',
  },
  {
    component: {
      importPromise: () =>
        import('./chat-components/table-simple/table-simple.component'),
      importName: 'InChatTableSimple',
    },
    selector: 'table-simple',
  },
];
