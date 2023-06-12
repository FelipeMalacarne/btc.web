import { useEffect, useState } from "react";
import NotificationModel from "../models/NotificationModel";
import authHeader from "../services/AuthHeader";

export const useNotifications = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);

  const fetchNotifications = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const Url = envUrl + '/api/notifications';
    const token = authHeader().Authorization;

    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(Url, requestOptions);
    const responseData = await response.json();
    const loadedNotifications: NotificationModel[] = [];
    for (const key in responseData) {
      loadedNotifications.push({
        id: responseData[key].id,
        title: responseData[key].title,
        message: responseData[key].message,
        date: responseData[key].date,
      })
    }
    setNotifications(loadedNotifications);
    setIsLoading(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      })
    }, 10000);

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, []);

  return { notifications, setNotifications, isLoading, httpError}
}
