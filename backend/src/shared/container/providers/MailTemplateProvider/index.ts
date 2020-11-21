import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTempleteProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
