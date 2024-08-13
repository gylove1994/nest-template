type EmptyValue<T> = T extends string
  ? ''
  : T extends any[]
    ? []
    : T extends object
      ? Record<string, any>
      : T extends number
        ? null
        : null;

export function dv<T>(condition: any, value: T): T | EmptyValue<T> {
  if (condition) {
    return value;
  } else {
    if (typeof value === 'string') {
      return '' as T | EmptyValue<T>;
    } else if (Array.isArray(value)) {
      return [] as T | EmptyValue<T>;
    } else if (typeof value === 'object') {
      return {} as T | EmptyValue<T>;
    } else if (typeof value === 'number') {
      return null as T | EmptyValue<T>;
    } else {
      return null as T | EmptyValue<T>;
    }
  }
}
