package com.expenseiq.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expenseiq.dto.DashboardResponse;
import com.expenseiq.entity.Transaction;
import com.expenseiq.entity.User;
import com.expenseiq.repository.TransactionRepository;
import com.expenseiq.repository.UserRepository;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public DashboardResponse getSummary(Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        List<Transaction> transactions =
                transactionRepository.findByUser(user);

        double income = 0;
        double expense = 0;

        for(Transaction t : transactions){

            if(t.getType().equalsIgnoreCase("Income")){
                income += t.getAmount();
            }
            else{
                expense += t.getAmount();
            }

        }

        DashboardResponse response = new DashboardResponse();

        response.setTotalIncome(income);
        response.setTotalExpense(expense);
        response.setBalance(income-expense);
        response.setTotalTransactions((long)transactions.size());

        return response;

    }

}