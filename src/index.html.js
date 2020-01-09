import '/reset.css'
import '/index.css'
import '/fonts.css'
import stylesheet from '@kaliber/build/lib/stylesheet'
import javascript from '@kaliber/build/lib/javascript'
import polyfill from '@kaliber/build/lib/polyfill'
import App from '/domain/App?universal'

const title = 'React-spring visualizer, tweak your spring configuration'
const description = 'The missing visualizer for your react-spring UI animations. Check scale, translate, rotate, opacity & more'

export default (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:og:site_name" content='React-spring visualizer' />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://react-spring-visualizer.joostkiens.com/static/og-image.png" />
      <meta property="og:image:width" content="2484" />
      <meta property="og:image:height" content="1872" />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {stylesheet}
      {polyfill(['default', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'ResizeObserver'])}
      {javascript}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png?v=rMJr6qL62p" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png?v=rMJr6qL62p" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png?v=rMJr6qL62p" />
      <link rel="manifest" href="/static/site.webmanifest?v=rMJr6qL62p" />
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg?v=rMJr6qL62p" color="#001858" />
      <link rel="shortcut icon" href="/static/favicon.ico?v=rMJr6qL62p" />
      <meta name="msapplication-TileColor" content="#001858" />
      <meta name="msapplication-config" content="/static/browserconfig.xml?v=rMJr6qL62p" />
      <meta name="theme-color" content="#FEF6E4" />
      <link rel="canonical" href="https://react-spring-visualizer.joostkiens.com/" />
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
