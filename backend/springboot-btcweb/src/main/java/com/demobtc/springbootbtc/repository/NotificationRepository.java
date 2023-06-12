package com.demobtc.springbootbtc.repository;

import com.demobtc.springbootbtc.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {


}
