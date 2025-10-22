import type { Accessor } from "solid-js";
import { createEffect, on } from "solid-js";

export function createEffectOn<T>(
  listener: Accessor<T>,
  callback: (value: T, oldValue: T | undefined) => void,
  options?: { defer?: boolean }
) {
  createEffect(on(listener, callback, options || {}));
}
