import React from 'react';
import { ConfigProvider } from 'sula';
import { history } from 'umi';

const baseSeparator = '{{{baseSeparator}}}' || '-';
const formatLangFile = (lang) => lang && lang.replace(baseSeparator, '_');

const supportLanguages = {
  zh_CN: () => import('sula/es/localereceiver/zh_CN'),
  en_US: () => import('sula/es/localereceiver/en_US'),
};

function getLocale() {
  const lang = '{{{default}}}' || `en${baseSeparator}US`;
  const langFile = formatLangFile(lang);

  let locale;
  try {
    locale = supportLanguages[langFile].then(l => l);
    locale = locale.default || locale;
  } catch (error) {}
  return locale;
}

export const rootContainer = (container) => {
  return (
    <ConfigProvider locale={getLocale()} history={history}>
      {container}
    </ConfigProvider>
  );
};
