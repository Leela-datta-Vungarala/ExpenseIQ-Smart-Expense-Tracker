package com.expenseiq.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expenseiq.dto.TransactionRequest;
import com.expenseiq.entity.Transaction;
import com.expenseiq.entity.User;
import com.expenseiq.repository.TransactionRepository;
import com.expenseiq.repository.UserRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public String addTransaction(Long userId, TransactionRequest request) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        Transaction transaction = new Transaction();

        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());
        transaction.setNotes(request.getNotes());

        transaction.setUser(user);

        transactionRepository.save(transaction);

        return "Transaction Added Successfully";

    }

    public List<Transaction> getTransactionsByUser(Long userId) {

        return transactionRepository.findByUserId(userId);

    }

    public String updateTransaction(Long id, TransactionRequest request) {

        Transaction transaction = transactionRepository.findById(id).orElse(null);

        if (transaction == null) {
            return "Transaction Not Found";
        }

        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());
        transaction.setNotes(request.getNotes());

        transactionRepository.save(transaction);

        return "Transaction Updated Successfully";

    }

    public String deleteTransaction(Long id) {

        transactionRepository.deleteById(id);

        return "Transaction Deleted Successfully";

    }

}