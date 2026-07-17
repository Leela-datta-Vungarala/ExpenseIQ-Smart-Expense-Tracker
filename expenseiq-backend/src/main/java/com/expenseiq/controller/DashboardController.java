package com.expenseiq.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.expenseiq.dto.DashboardResponse;
import com.expenseiq.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary/{userId}")
    public DashboardResponse getSummary(@PathVariable Long userId){

        return dashboardService.getSummary(userId);

    }

}