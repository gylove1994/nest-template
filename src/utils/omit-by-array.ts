type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type OmitByArray<T, K extends readonly (keyof T)[]> = Pick<
  T,
  Exclude<keyof T, ArrayElement<K>>
>;

export type PickByArray<T, K extends readonly (keyof T)[]> = Pick<
  T,
  ArrayElement<K>
>;
