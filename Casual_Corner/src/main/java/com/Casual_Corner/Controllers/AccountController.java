package com.Casual_Corner.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Casual_Corner.SecurityConfig;
import com.Casual_Corner.Models.Account;
import com.Casual_Corner.Services.AccountService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("account")
public class AccountController {
  @Autowired
  private final AccountService accountService;
  @Autowired
  private final SecurityConfig securityConfig;

  public AccountController(AccountService accountService, SecurityConfig securityConfig) {
    this.accountService = accountService;
    this.securityConfig = securityConfig;
  }

  @GetMapping
  public Account get(@RequestHeader(name = "Authorization") String token) {
    Account userInfo = securityConfig.getUserInfo(token);
    return accountService.getOrCreateProfile(userInfo);
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
