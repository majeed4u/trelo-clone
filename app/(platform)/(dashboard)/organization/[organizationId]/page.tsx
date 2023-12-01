import Info from './_components/info';

export default function OrganizationIdPage({
  params,
}: {
  params: { organizationId: string };
}) {
  return (
    <div className=' w-full mb-20'>
      <Info />
    </div>
  );
}
