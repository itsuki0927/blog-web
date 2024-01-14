import dynamic from "next/dynamic";
import type { PrePropsType } from "./utils";
import { preToCodeBlock } from "./utils";

const CodeBlock = dynamic(() => import("./CodeBlock"));

const Code = (preProps: PrePropsType) => {
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} />;
  }

  return null;
};

export default Code;
