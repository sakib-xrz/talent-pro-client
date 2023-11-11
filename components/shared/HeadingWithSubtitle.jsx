export default function HeadingWithSubtitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="pb-2 text-center text-xl font-semibold md:text-2xl lg:text-3xl">
        {title}
      </h2>
      <p className="mx-auto max-w-xs text-center text-base sm:max-w-md lg:max-w-2xl lg:text-lg">
        {subtitle}
      </p>
    </div>
  );
}
