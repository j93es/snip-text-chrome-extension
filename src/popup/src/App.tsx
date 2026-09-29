import "./App.css";
import TestMessage from "./component/TestMessage";
import TestSmartTemplate from "./component/TestSmartTemplate";

function App() {
  return (
    <div>
      <TestMessage vendorName="GOOGLE" />
      <TestMessage vendorName="NAVER" />
      <TestSmartTemplate />
    </div>
  );
}

export default App;
