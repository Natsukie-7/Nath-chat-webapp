import { type Accessor } from "solid-js";

type args = string | null | undefined;
export default function classNames(...values: (args | Accessor<args>)[]) {
  return values
    .map((v) => (typeof v === "function" ? v() : v))
    .filter(Boolean)
    .join(" ");
}
