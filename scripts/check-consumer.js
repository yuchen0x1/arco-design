// Exercise public imports from the installed tarball in the consumer directory.
const assert = require('assert');
const { createRequire } = require('module');
const path = require('path');

const fromApp = createRequire(path.join(process.cwd(), 'package.json'));
const React = fromApp('react');
const { renderToStaticMarkup } = fromApp('react-dom/server');
const { Progress, Space, version } = fromApp('@arco-design/web-react');
const manifest = fromApp('@arco-design/web-react/package.json');

assert.strictEqual(version, process.argv[2]);
assert.strictEqual(manifest.version, version);
for (const file of [manifest.module, manifest.types, manifest.unpkg, 'dist/css/arco.css']) {
  fromApp.resolve(`@arco-design/web-react/${file.replace(/^\.\//, '')}`);
}
fromApp('@arco-design/web-react/icon');
fromApp('@arco-design/web-react/hooks');
const html = renderToStaticMarkup(
  React.createElement(Progress, {
    percent: 100,
    type: 'circle',
    size: 'mini',
    'aria-label': 'Upload',
  })
);
assert.match(html, /role="progressbar"/);
assert.match(html, /aria-label="Upload"/);
assert.match(html, /aria-valuenow="100"/);

const spaceHtml = renderToStaticMarkup(
  React.createElement(
    Space,
    null,
    React.createElement(
      React.Fragment,
      null,
      React.createElement('span', null, 'first'),
      React.createElement('span', null, 'second')
    )
  )
);
assert.strictEqual((spaceHtml.match(/arco-space-item/g) || []).length, 2);
// eslint-disable-next-line no-console
console.log('Consumer imports, version and server rendering passed for', version);
