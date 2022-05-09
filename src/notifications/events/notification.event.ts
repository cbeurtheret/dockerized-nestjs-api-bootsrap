export interface NotificationEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
