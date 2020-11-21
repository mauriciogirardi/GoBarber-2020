import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMothAvailability = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderMothAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityControllers;
