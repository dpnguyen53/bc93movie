import { memo } from "react";

function ChildCompoment() {
  console.log("ChildCompoment render");

  return (
    <div>
      <h1>ChildCompoment</h1>
    </div>
  );
}

export default memo(ChildCompoment);
