"use client";

import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ShareButton({
  url,
  title,
  variant,
  className,
  children,
}) {
  async function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title,
          url,
        })
        .catch((error) => {
          console.error("Error sharing link:", error.message);
        });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Link copied on clipboard."));
    }
  }

  return (
    <Button onClick={handleShare} variant={variant} className={className}>
      {children}
    </Button>
  );
}
