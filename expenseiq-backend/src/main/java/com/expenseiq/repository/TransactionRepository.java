package com.expenseiq.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expenseiq.entity.Transaction;
import com.expenseiq.entity.User;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Used by DashboardService
    List<Transaction> findByUser(User user);

    // Used by TransactionController
    List<Transaction> findByUserId(Long userId);

    // Keep your other methods
    List<Transaction> findByCategory(String category);

    List<Transaction> findByType(String type);

    List<Transaction> findByTitleContainingIgnoreCase(String title);

}