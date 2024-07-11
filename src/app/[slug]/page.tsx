import { MDXRemote } from "next-mdx-remote/rsc";

const ExampleComponent = () => <p>Example Component</p>;
const components = { ExampleComponent };

export default async function DynamicTestPage({
  params,
}: {
  params: { slug: string };
}) {
  const postData = await getPostData(params.slug);

  return (
    <div>
      <MDXRemote source={postData} components={components} />
    </div>
  );
}

// rootディレクトリの_posts/test/{slug}.mdxを取得
import fs from "fs";
import path from "path";
const getPostData = async (slug: string) => {
  const mdxFilePath = path.join("./_posts/test", `${slug}.mdx`);
  const mdFilePath = path.join("./_posts/test", `${slug}.md`);

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

// rootディレクトリの_posts/test/全てのファイルパスを取得（mdxとmdの混合）
export async function generateStaticParams() {
  const filePaths = await fs.promises.readdir("./_posts/test");
  return filePaths.map((filePath) => ({
    slug: filePath.replace(/\.(md|mdx)$/, ""),
  }));
}
