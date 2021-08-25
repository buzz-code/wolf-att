import path from 'path';
import app from '../common-modules/server/config/express';
import routes from './routes/index.route';
import swagger from '../common-modules/server/config/swagger';
import * as errorHandler from '../common-modules/server/middlewares/errorHandler';
import joiErrorHandler from '../common-modules/server/middlewares/joiErrorHandler';
import requestLogger from '../common-modules/server/middlewares/requestLogger';
import PACKAGE from '../package.json';

// enable webpack hot module replacement in development mode
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../common-modules/webpack/webpack.config.dev';

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Swagger API documentation
app.get('/swagger.json', (req, res) => {
  res.json(swagger);
});

// Request logger
app.use(requestLogger);

// Router
app.use('/api', routes);

// Landing page
if (process.env.NODE_ENV === 'development') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index-dev.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.render(path.join(__dirname, '../public/index-prod'), { name: PACKAGE.name, title: PACKAGE.displayName, customDomain: PACKAGE.customDomain });
  });
}

// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
