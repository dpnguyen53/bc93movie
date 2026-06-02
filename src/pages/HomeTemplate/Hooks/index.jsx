import { useState, useEffect, useCallback, useMemo } from "react";
import ChildCompoment from "./child";

export default function Hooks() {
  console.log("Hooks render");

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(
      "useEffect - chạy 1 lần duy nhất sau lần render đầu tiên - khi array dependencies rỗng",
    );

    const getListProductApi = () => {
      console.log("getListProductApi - gọi api lấy danh sách sản phẩm");
    };

    getListProductApi();
  }, []);

  useEffect(() => {
    console.log("useEffect - chạy sau mỗi lần render - khi mảng khác rỗng");
    const getListProductApiPage = () => {
      console.log(
        "getListProductApiPage - gọi api lấy danh sách sản phẩm theo page",
        count,
      );
    };
    getListProductApiPage();
  }, [count]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Hello Cybersoft");
    }, 1000);

    return () => {
      console.log("chạy khi component bị hủy");
      clearInterval(intervalId);
    };
  }, []);

  const handleTest = () => {
    console.log("handleTest");
  };

  // cache handleTest => Không bị khởi tạo khi component cha re-render
  const handleTestCallback = useCallback(handleTest, []);

  const countUp = () => {
    let i = 0;
    while (i < 1000) {
      i++;
    }
    console.log("countUp", i);
    return i;
  };

  // cache giá trị => Không tính toán lại khi component cha re-render
  const countUpMemo = useMemo(() => countUp(), []);

  return (
    <div>
      <h1>Hooks</h1>
      <p>Count: {count}</p>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        increment
      </button>
      <h1>Count up: {countUpMemo}</h1>
      <hr />
      <ChildCompoment onTest={handleTestCallback} />
    </div>
  );
}
