import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function FileUpload({
  id,
  helperText,
  name,
  label,
  title = "Select a file to upload, or drag and drop",
  accept,
  onChange,
}) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col justify-center gap-1">
        {label && (
          <label className="text-sm font-semibold text-primary">{label}</label>
        )}
        <div className="flex w-full items-center justify-center">
          <label
            id={id}
            name={name}
            className="bg-primary-0 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6"
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <CloudArrowUpIcon className="h-8 w-8 rounded-lg text-primary/80 sm:h-12 sm:w-12" />
              <div className="space-y-1">
                <p className="text-center text-sm font-semibold text-primary sm:text-base">
                  {title}
                </p>
                <p className="text-center text-xs font-medium text-muted-foreground sm:text-sm">
                  {helperText}
                </p>
                <input
                  accept={accept}
                  type="file"
                  className="hidden"
                  onChange={onChange}
                />
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
