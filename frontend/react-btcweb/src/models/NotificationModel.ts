class NotificationModel {
  id: number;
  title: string;
  message: string;
  date: Date; 

  constructor(id: number, title: string, message: string, date: Date) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.date = date;
  }
}

export default NotificationModel;