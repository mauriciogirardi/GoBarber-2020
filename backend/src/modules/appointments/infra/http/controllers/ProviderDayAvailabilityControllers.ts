import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProviderDAyAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;

    const listProviderDayAvailability = container.resolve(ListProviderDAyAvailabilityService);

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityControllers;
