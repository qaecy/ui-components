import { IconName } from './types';

export const svgs: {
  [K in IconName]: string;
} = {
  unknown: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="currentColor"/>
</svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" fill="currentColor">
<circle cx="12.051" cy="5.63" r="4.235"/>
<circle cx="15.731" cy="17.102" r="5.167"/>
<circle cx="9.331" cy="17.102" r="5.167"/>
</svg>`,
  loading: `<svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke-opacity="0.2"/><path d="M12,1c3.038,0,5.788,1.231,7.778,3.222"/><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0;360" repeatCount="indefinite"/></path></svg>`,
  gear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5" d="M17.246 11.984c0-2.92-2.384-5.287-5.325-5.287s-5.326 2.367-5.326 5.287 2.384 5.287 5.326 5.287 5.325-2.367 5.325-5.287Z"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5" d="m20.161 4.486-2.356-2.33-1.8 1.787a9.02 9.02 0 0 0-1.229-.508V.912H9.069v2.523a9.108 9.108 0 0 0-1.23.508l-1.8-1.787-4.038 4.006 1.812 1.799c-.194.385-.361.79-.496 1.206H.748v5.666h2.596c.139.408.306.801.496 1.179L2 17.838l4.036 4.006 1.854-1.841a9.54 9.54 0 0 0 1.176.482v2.604h5.707v-2.604a9.172 9.172 0 0 0 1.175-.482l1.854 1.841 4.039-4.006-1.84-1.826c.194-.377.361-.774.501-1.183h2.595V9.163h-2.569a8.604 8.604 0 0 0-.496-1.206l2.352-2.334"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" d="M12.034 18.535a6.553 6.553 0 1 0 0-13.106 6.553 6.553 0 0 0 0 13.106ZM12.035 2.721V.836M12.035 23.126V21.24M2.775 11.982H.889M23.181 11.982h-1.886M5.483 18.536l-1.326 1.326M19.914 4.103l-1.326 1.326M18.589 18.536l1.326 1.326M4.157 4.103l1.326 1.326"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" d="M12.034 18.535A6.553 6.553 0 1 0 9.103 6.12s4.821 1.972 4.821 5.863-4.441 6.038-4.441 6.038a6.526 6.526 0 0 0 2.551.515Z"/></svg>`,
  paperplane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="m22.819 1.205-11.4 11.646L1.211 7.33l21.608-6.125Z"/><path d="m22.819 1.205-11.635 11.41 5.518 10.217 6.117-21.627Z"/></svg>`,
};
