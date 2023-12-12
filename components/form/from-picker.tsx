'use client';
import { useState, useEffect } from 'react';
import { unsplash } from '@/lib/unsplash';
import { Check, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { defaultImages } from '@/constants/images';
import Link from 'next/link';
import { FormErrors } from './form-errors';
interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });
        if (result && result.response) {
          setImages(result.response as Array<Record<string, any>>);
        } else {
          console.error('No response from Unsplash');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, []);

  if (isLoading) {
    return (
      <div className=' p-6 flex items-center justify-center'>
        <Loader2 className=' h-6 w-6  text-sky-700 animate-spin' />
      </div>
    );
  }

  return (
    <div className=' relative'>
      <div className=' grid grid-cols-3 gap-2 mb-2'>
        {images.slice(0, 9).map((image) => (
          <div
            key={image.id}
            className={cn(
              ' cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              alt='unsplash image'
              src={image.urls.small}
              className=' object-cover rounded-sm'
            />
            {selectedImageId === image.id && (
              <div className=' absolute inset-0 w-full h-full  bg-black/30 flex items-center justify-center'>
                <Check className=' w-8 h-8 text-white' />
              </div>
            )}
            <Link
              prefetch={false}
              href={image.links.html}
              target='_blank'
              className=' opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-right hover:underline p-1 bg-black/50 text-white'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors errors={errors} id='image' />
    </div>
  );
}
