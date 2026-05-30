import type { PortableText } from "@/sanity/types";

export function portableTextToPlainText(blocks: PortableText = []) {
  return blocks
    .map((block) => block.children?.map((child) => child.text).join("") ?? "")
    .filter(Boolean)
    .join("\n\n");
}
