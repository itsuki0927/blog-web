import Image, { type ImageProps } from "next/image";

const shimmer = (w: ImageProps["width"], h: ImageProps["height"]) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window !== "undefined"
    ? window.btoa(str)
    : Buffer.from(str).toString("base64");

export const buildBase64 = (
  width: ImageProps["width"],
  height: ImageProps["height"],
) => toBase64(shimmer(width, height));

type MyImageProps = Omit<ImageProps, "placeholder" | "blurDataURL">;

const MyImage = (props: MyImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      // placeholder="blur"
      // blurDataURL={blurDataURL}
      placeholder={`data:image/svg+xml;base64,${toBase64(
        shimmer(props.width || 700, props.height || 475),
      )}`}
    />
  );
};

export default MyImage;
