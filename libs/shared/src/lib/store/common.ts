export interface Behaviours {
  loading: boolean;
}

export type StateOfType<T> = T & {
  behaviours: Behaviours;
};

export type ResponseOfType<T> = T;

export interface ItemType {
  key: string;
  label: string;
  value: number | string;
  showBold?: boolean;
  showDivider?: boolean;
}
