import Image from "next/image";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function EmptyState({ src, title, helperText }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 py-10">
      <div>
        <Image
          src={src}
          alt="empty_state_image"
          width={300}
          height={300}
          className="h-24 w-24 object-cover"
        />
      </div>

      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{helperText}</CardDescription>
      </CardHeader>
    </Card>
  );
}
