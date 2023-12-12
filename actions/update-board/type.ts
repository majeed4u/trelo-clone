import { z } from 'zod';
import { Board } from '.prisma/client';
import { updateBoardSchema } from './schema';
import { ActionState } from '@/lib/create-safe-action';
export type InputType = z.infer<typeof updateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
