export default function TitleWithDescription({ title, desc }) {
  return (
    <div className="space-y-2">
      <h1 className="text-md font-semibold text-primary md:text-lg">{title}</h1>
      <p className="text-sm font-normal text-accent-foreground md:text-base">
        {desc}
      </p>
    </div>
  );
}
