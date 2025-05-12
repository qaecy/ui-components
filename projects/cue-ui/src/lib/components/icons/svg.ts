import { IconName } from './types';

export const svgs: {
  [K in IconName]: string;
} = {
  '3d_rotation': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h80q0 115 72.5 203T418-166l-58-58 56-56L598-98q-29 10-58.5 14T480-80Zm20-280v-240h120q17 0 28.5 11.5T660-560v160q0 17-11.5 28.5T620-360H500Zm-200 0v-60h100v-40h-60v-40h60v-40H300v-60h120q17 0 28.5 11.5T460-560v160q0 17-11.5 28.5T420-360H300Zm260-60h40v-120h-40v120Zm240-60q0-115-72.5-203T542-794l58 58-56 56-182-182q29-10 58.5-14t59.5-4q83 0 156 31.5T763-763q54 54 85.5 127T880-480h-80Z"/></svg>`,
  arrow_back: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>`,
  fullscreen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/></svg>`,
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
