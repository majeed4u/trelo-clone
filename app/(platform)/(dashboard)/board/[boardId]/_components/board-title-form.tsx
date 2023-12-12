'use client';

import { Board } from '.prisma/client';
import { updateBoard } from '@/actions/update-board';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';

interface BoardTitleFormProps {
  data: Board;
}

export default function BoardTitleForm({ data }: BoardTitleFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [title, setTitle] = useState(data?.title);
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success(`Board "${data.title}" updated`);
      setTitle(data.title);
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    },
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 1);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const onSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const id = data?.id;
    execute({ id, title });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className=' flex items-center gap-2'
        ref={formRef}
      >
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          defaultValue={title}
          className=' text-lg font-bold px-[7px] bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none rousm'
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant='transparent'
      className=' font-bold text-lg h-auto w-auto p-q px-2'
    >
      {title}
    </Button>
  );
}
