/* eslint-disable @typescript-eslint/ban-types */
export interface CounterMetadata {
  name: string;
  help: string;
  labelNames?: string[];
}

export function Counter(metadata: CounterMetadata) {
  metadata.labelNames = metadata.labelNames || [];
  return <T extends { new (...args: any[]): {} }>(target: T) => {
    return class extends target {
      counter = true;
      counterMetadata = metadata;
      context = {};
    };
  };
}
