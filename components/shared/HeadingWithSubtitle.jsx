export default function HeadingWithSubtitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="pb-2 text-center text-xl font-semibold md:text-2xl lg:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-xs text-center text-base text-muted-foreground sm:max-w-md lg:max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
