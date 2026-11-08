import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const routes = [
  { file: 'index.html', pathname: '/' },
  { file: 'philosophy.html', pathname: '/philosophy.html' },
  { file: 'tool-lab.html', pathname: '/tool-lab.html' },
  { file: 'work.html', pathname: '/work.html' },
  { file: 'timeline.html', pathname: '/timeline.html' },
  { file: 'audit.html', pathname: '/audit.html' },
  { file: 'contact.html', pathname: '/contact.html' },
];

const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const { default: PortfolioV2 } = await vite.ssrLoadModule('/src/portfolio-v2.tsx');

  for (const route of routes) {
    globalThis.window = { location: { pathname: route.pathname } };
    const pageMarkup = renderToString(React.createElement(PortfolioV2));
    const htmlPath = fileURLToPath(new URL(`../dist/${route.file}`, import.meta.url));
    const html = await readFile(htmlPath, 'utf8');
    const emptyRoot = '<div id="root"></div>';

    if (!html.includes(emptyRoot)) {
      throw new Error(`Expected an empty #root in dist/${route.file}`);
    }

    await writeFile(htmlPath, html.replace(emptyRoot, `<div id="root">${pageMarkup}</div>`));
    console.log(`Pre-rendered ${route.pathname}`);
  }
} finally {
  delete globalThis.window;
  await vite.close();
}
