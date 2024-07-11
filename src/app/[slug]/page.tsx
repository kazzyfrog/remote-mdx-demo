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
const getPostData = async (slug: string) => {
  const filePath = `./_posts/test/${slug}.mdx`;
  const fileContents = fs.readFileSync(filePath, "utf8");
  return fileContents;
};

// rootディレクトリの_posts/test/全てのファイルパスを取得
export async function generateStaticParams() {
  const filePaths = await fs.promises.readdir("./_posts/test");
  return filePaths.map((filePath) => ({
    slug: filePath.replace(/\.mdx$/, ""),
  }));
}
