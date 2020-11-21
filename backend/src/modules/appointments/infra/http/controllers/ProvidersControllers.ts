import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderServices from '@modules/appointments/services/ListProvidersService';

class ProvidersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProviderServices);

    const providers = await listProvider.execute({
      user_id,
    });

    return response.json(classToClass(providers));
  }
}

export default ProvidersControllers;
