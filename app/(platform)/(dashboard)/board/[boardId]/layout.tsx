import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import { startCase } from 'lodash';
import BoardNavbar from './_components/board-navbar';
export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: 'Board',
    };
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  return {
    title: startCase(board?.title || 'board'),
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className=' relative h-full bg-cover bg-no-repeat bg-center '
    >
      <BoardNavbar data={board} />
      <div className=' absolute inset-0 bg-black/30' />
      <main className=' pt-28 relative h-full'>{children}</main>;
    </div>
  );
}
