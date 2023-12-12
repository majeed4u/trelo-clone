'use client';
import React from 'react';
interface BoardOptionsProps {
  id: string;
}
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, X } from 'lucide-react';
import { useAction } from '@/hooks/use-action';
import { deleteBoard } from '@/actions/delete-board';
import { toast } from 'sonner';
export default function BoardOptions({ id }: BoardOptionsProps) {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError(error) {
      toast.error(error);
    },
  });
  const onDelete = () => {
    execute({ id });
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className=' h-auto w-auto p-2' variant='transparent'>
            <MoreHorizontal className=' h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='  px-0 pt-3 pb-3'>
          <div className='  text-sm font-medium text-center pb-4 text-neutral-600'>
            Board Actions
          </div>
          <PopoverClose asChild>
            <Button
              variant='ghost'
              className=' h-auto w-auto p-2 top-2 right-2 text-neutral-600 absolute'
            >
              <X className=' h-4 w-4' />
            </Button>
          </PopoverClose>
          <Button
            disabled={isLoading}
            variant='ghost'
            onClick={onDelete}
            className=' rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            Delete this board
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
