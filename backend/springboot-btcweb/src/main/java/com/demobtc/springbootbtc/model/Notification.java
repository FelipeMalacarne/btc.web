package com.demobtc.springbootbtc.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "noti_id")
    private Long id;

    @NotNull
    @Column(name = "noti_title")
    private String title;

    @NotNull
    @Column(name = "noti_message")
    private String message;

    @NotNull
    @Column(name = "noti_date")
    private Timestamp date;
}
