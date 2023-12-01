import React from 'react';
import OrControl from './_components/or-control';

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrControl />
      {children}
    </>
  );
}
