"use client"; // This ensures it's a Client Component

import { Provider } from "react-redux";
import store from "../../../../utility/store/store";
// import store from "@/utility/store/store";

export default function Providers({ children }) {
return <Provider store={store}>{children}</Provider>;
}