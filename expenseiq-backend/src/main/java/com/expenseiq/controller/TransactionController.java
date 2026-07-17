package com.expenseiq.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.expenseiq.dto.TransactionRequest;
import com.expenseiq.entity.Transaction;
import com.expenseiq.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/{userId}")
    public String addTransaction(@PathVariable Long userId,
                                 @RequestBody TransactionRequest request) {

        return transactionService.addTransaction(userId, request);

    }

    @GetMapping("/{userId}")
    public List<Transaction> getTransactionsByUser(@PathVariable Long userId) {

        return transactionService.getTransactionsByUser(userId);

    }

    @PutMapping("/{id}")
    public String updateTransaction(@PathVariable Long id,
                                    @RequestBody TransactionRequest request) {

        return transactionService.updateTransaction(id, request);

    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {

        return transactionService.deleteTransaction(id);

    }

}