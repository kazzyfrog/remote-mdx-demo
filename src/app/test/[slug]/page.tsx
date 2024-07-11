import { compileMDX, MDXRemote } from "next-mdx-remote/rsc";

const ExampleComponent = () => <p>Example Component</p>;
const components = { ExampleComponent };

export default async function CompileMDXTestPage({
  params,
}: {
  params: { slug: string };
}) {
  const postData = await getPostData(params.slug);

  // オプションで、フロントマターオブジェクトの型を定義できる
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: postData,
    components: { ExampleComponent },
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
        // remark-rehypeに渡すオプション（オプション）；
        // allowDangerousHtmlオプションは常にtrueに設定され、MDXノード（nodeTypes参照）が渡されます；
        // 特に、コンテンツが英語でない場合、脚注の設定を渡したいかもしれません。
        remarkRehypeOptions: {
          // ヘイストツリーで生のHTMLをマークダウンで保持するかどうか (デフォルト: false)。
          allowDangerousHtml: true,
          footnoteLabel: "脚注",
        },
      },
      // MDXからfrontmatterを解析するかどうかを示す。デフォルトは false
      parseFrontmatter: true,
    },
  });

  return (
    <div>
      <h1>{frontmatter.title}</h1>
      {content}
    </div>
  );
}

export const POSTS_PATH = path.join(process.cwd(), "_posts/test");

import fs from "fs";
import path from "path";

// rootディレクトリの_posts/test/{slug}.mdxの内容を取得
const getPostData = async (slug: string) => {
  const mdxFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const mdFilePath = path.join(POSTS_PATH, `${slug}.md`);

  let filePath;

  if (fs.existsSync(mdxFilePath)) {
    filePath = mdxFilePath;
  } else if (fs.existsSync(mdFilePath)) {
    filePath = mdFilePath;
  } else {
    throw new Error("File not found");
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  return fileContents;
};

// rootディレクトリの_posts/test/全てのファイルパス（slug）を取得（mdxとmdの混合）
export async function generateStaticParams() {
  const filePaths = await fs.promises.readdir(POSTS_PATH);
  return filePaths.map((filePath) => ({
    slug: filePath.replace(/\.(md|mdx)$/, ""),
  }));
}
