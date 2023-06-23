package com.example.shose.server.repository;

import com.example.shose.server.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification,String> {
}
