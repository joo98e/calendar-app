export interface CoreResponse<T> {
  data: {
    data: T
  };
  success: boolean;
}
