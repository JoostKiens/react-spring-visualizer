import '/reset.css'
import '/index.css'
import '/fonts.css'
import stylesheet from '@kaliber/build/lib/stylesheet'
import javascript from '@kaliber/build/lib/javascript'
import polyfill from '@kaliber/build/lib/polyfill'
import App from '/domain/App?universal'

export default (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <title>React Spring visualizer</title>
      <meta name='description' content='Visualize your spring config for react-spring.' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {stylesheet}
      {polyfill(['default', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'ResizeObserver'])}
      {javascript}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#ffd369" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffd369" />
      <meta name="msapplication-config" content="/static/browserconfig.xml" />
      <meta name="theme-color" content="#ffd369" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-37283269-2" />
      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-37283269-2', { 'anonymize_ip': true, allowAdFeatures : false, forceSSL : true });
      ` }} />
    </head>
    <body>
      <App />
    </body>
  </html>
)
