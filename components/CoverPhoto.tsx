import Image from "next/image";

/**
 * A photo that fills and covers its parent container (which sets the aspect
 * ratio). Uses next/image for automatic resizing, modern formats, and lazy
 * loading. Photos live in /public/images and come from the original site.
 */
export function CoverPhoto({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 820px) 92vw, 560px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      style={{ objectFit: "cover" }}
    />
  );
}
