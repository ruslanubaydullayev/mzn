// import Vue from 'vue';
// import VueI18n from '@nuxtjs/i18n';

import en from '../locales/en.json';
import cs from '../locales/cs.json';
import { localize } from 'vee-validate';

// localize({
//   cs, en,
// });
// localize('cs');
// https://i18n.nuxtjs.org/extend-messages
//
// function loadLocaleMessages() {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
//   const messages = {};
//   locales.keys().forEach((key) => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i);
//     if (matched && matched.length > 1) {
//       const locale = matched[1];
//       locales(key).validation = cs.messages;
//       messages[locale] = locales(key);
//     }
//   });
//   return messages;
// }
//
// export default function ({ app }) {
//   VueI18n.messages = loadLocaleMessages();
// }
