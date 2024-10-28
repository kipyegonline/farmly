import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import ContentfulImage from "./contentful-image";

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

interface AssetLink {
  block: Asset[];
}

interface Content {
  json: any;
  links: {
    assets: AssetLink;
  };
}

function RichTextAsset({
  id,
  assets,
}: {
  id: string;
  assets: Asset[] | undefined;
}) {
  const dims = globalThis?.window
    ? window.matchMedia("(max-width:1280px)").matches
    : false;
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return (
      <ContentfulImage src={asset.url} width={dims ? 1000 : 480} height={400} />
    ); //<Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
}

export function Markdown({ content }: { content: Content }) {
  return documentToReactComponents(content.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
    },
  });
}
