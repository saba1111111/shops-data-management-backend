import { z } from 'nestjs-zod/z';
import { SortProps } from '../enums';

export function paginationSchema(possibleFields: string[]) {
  const sortDirections = z.enum(Object.values(SortProps) as [string]);
  const validFields = z.enum(possibleFields as [string]);

  return z.object({
    page: z.coerce.number().positive().default(1),
    itemsPerPage: z.coerce.number().positive().max(100).default(10),
    fields: z.array(validFields).optional(),
    sort: z.array(z.tuple([validFields, sortDirections])).optional(),
  });
}
