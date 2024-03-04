export function cx(
  ...args: Array<string | undefined | { [key: string]: boolean } | boolean>
): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object" && arg !== null) {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          if (typeof value === "string") {
            classes.push(key);
          } else if (typeof value === "boolean" && value) {
            classes.push(key);
          }
        }
      });
    }
  });

  return classes.join(" ");
}
