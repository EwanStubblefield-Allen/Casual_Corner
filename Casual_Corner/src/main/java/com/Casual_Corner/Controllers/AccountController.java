package com.Casual_Corner.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Casual_Corner.Models.Account;
import com.Casual_Corner.Services.AccountService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("account")
public class AccountController {
  private final AccountService accountService;

  @Autowired
  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  @GetMapping
  public Object get() {
    return accountService.getOrCreateProfile();
  }

  @PutMapping
  @Transactional
  public Account update(@RequestBody Account userInfo) {
    return accountService.update(userInfo);
  }

  @DeleteMapping(path = "{accountId}")
  public void remove(@PathVariable("accountId") Long accountId) {

  }
}
