export type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? NonNullable<T>
  : T extends object
    ? { [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>> } // 여기서 -? 가 핵심입니다!
    : NonNullable<T>;
