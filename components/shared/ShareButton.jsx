"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

export default function ShareButton({ url, title, variant, mini = false }) {
  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing link:", error.message);
    }
  }

  return (
    <>
      {mini ? (
        <Share2 onClick={handleShare} className="w-4.5 h-4.5 cursor-pointer" />
      ) : (
        <Button
          onClick={handleShare}
          className={"flex w-full items-center justify-center gap-2"}
          variant={variant}
        >
          <Share2 className="w-4" />
          <p className="font-semibold">Share Job</p>
        </Button>
      )}
    </>
  );
}
