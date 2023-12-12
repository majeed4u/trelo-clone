'use client';
import { createBoard } from '@/actions/create-board';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import FormPicker from '@/components/form/from-picker';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}
export function FormPopover(
  {
    children,
    side = 'bottom',
    align = 'start',
    sideOffset = 0,
  }: FormPopoverProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const router = useRouter();
  const { data, execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success('Board created');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError(error) {
      console.log({ error });
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;

    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        sideOffset={sideOffset}
        side={side}
        align={align}
        className=' w-80 pt-3'
      >
        <div className=' text-xs font-medium text-center text-neutral-600 pb-4'>
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant='ghost'
            size='sm'
            className=' h-auto w-auto absolute top-2 right-2 p-2'
          >
            <X className=' w-4 h-4' />
          </Button>
        </PopoverClose>
        <form className=' space-y-4' action={onSubmit}>
          <div className=' space-y-4'>
            <FormPicker id='image' errors={fieldErrors} />
            <FormInput
              errors={fieldErrors}
              id='title'
              label='Board title'
              type='text'
            />
          </div>
          <FormSubmit className='w-full'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
