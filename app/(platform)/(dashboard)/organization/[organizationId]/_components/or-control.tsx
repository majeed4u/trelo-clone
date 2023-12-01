'use client';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useOrganizationList } from '@clerk/nextjs';
export default function OrControl() {
  const params = useParams();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (!setActive) return;
    setActive({
      organization: params.organizationId as string,
    });
  }, [params.organizationId, setActive]);
  return null;
}
