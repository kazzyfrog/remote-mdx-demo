import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

const ExampleComponent = () => <p>Example Component</p>;

const components = { ExampleComponent };

interface Props {
  mdxSource: MDXRemoteProps;
}

export default async function TestPage() {
  const mdxSource = "some *mdx* content: <ExampleComponent />";

  return (
    <div>
      <MDXRemote source={mdxSource} components={components} />
    </div>
  );
}
