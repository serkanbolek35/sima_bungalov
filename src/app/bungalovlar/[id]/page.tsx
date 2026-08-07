import BungalowDetailClient from "./BungalowDetailClient";

export function generateStaticParams() {
  return [1, 2, 3, 4].map((n) => ({ id: `bungalow-${n}` }));
}

export default async function BungalowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BungalowDetailClient id={id} />;
}
