import { MDXRemote } from "next-mdx-remote/rsc";

const ExampleComponent = () => <p>Example Component</p>;
const components = { ExampleComponent };

export default async function TestPage() {
  const mdxSource = "some *mdx* content: <ExampleComponent />";

  const postData = await getPostData();

  return (
    <div>
      <MDXRemote source={mdxSource} components={components} />
      <MDXRemote source={postData} components={components} />
    </div>
  );
}

// rootディレクトリの_posts/test/test.mdxを取得
import fs from "fs";
const getPostData = async () => {
  const filePath = "./_posts/test/test.mdx";
  const fileContents = fs.readFileSync(filePath, "utf8");
  return fileContents;
};
