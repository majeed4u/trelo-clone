import { z } from 'zod';

export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required.',
      invalid_type_error: 'Title must be a string.',
    })
    .min(3, { message: 'Title is too short.' }),
});
