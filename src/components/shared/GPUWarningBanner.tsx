import { getIsGPUSupported } from "@/lib/shared/utils";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function GPUWarningBanner() {
  const [isGPUSupported, setIsGPUSupported] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    getIsGPUSupported().then(setIsGPUSupported);
  }, []);

  if (isGPUSupported || isDismissed) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 bg-warning p-4">
      <p className="flex-grow text-center text-warning-foreground">
        GPU is not supported. It will take longer to run models.
      </p>
      <button
        className="text-warning-foreground"
        onClick={() => setIsDismissed(true)}
      >
        <XIcon />
      </button>
    </div>
  );
}
