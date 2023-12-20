package com.Casual_Corner.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Casual_Corner.Models.Account;
import com.Casual_Corner.Repositories.AccountRepository;

@Service
public class AccountService {
  @Autowired
  private final AccountRepository accountRepository;

  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public Account getOrCreateProfile(Account userInfo) {
    Optional<Account> profileOptional = accountRepository.findById(userInfo.getId());
    if (profileOptional.isEmpty()) {
      if (userInfo.getCoverImg() == null) {
        userInfo.setCoverImg(
            "https://png.pngtree.com/thumb_back/fh260/background/20220428/pngtree-magic-portal-at-winter-landscape-image_1104947.jpg");
      }
      return accountRepository.save(userInfo);
    }
    return profileOptional.get();
  }

  public Account getProfileByEmail(String userEmail) {
    return accountRepository.findByEmail(userEmail).get();
  }

  public Account update(Account userInfo) {
    System.out.println("hi" + userInfo.getEmail());
    Account original = getProfileByEmail(userInfo.getEmail());
    original.setName(userInfo.getName().length() > 0 ? userInfo.getName() : original.getName());
    original.setPicture(userInfo.getPicture().length() > 0 ? userInfo.getPicture() : original.getPicture());
    return original;
  }
}
