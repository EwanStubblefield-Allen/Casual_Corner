package com.Casual_Corner.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Casual_Corner.SecurityConfig;
import com.Casual_Corner.Models.Account;
import com.Casual_Corner.Models.Game;
import com.Casual_Corner.Services.SavedGamesService;

@RestController
@RequestMapping("api/savedGames")
public class SavedGamesController {
  @Autowired
  private final SavedGamesService savedGamesService;
  private final SecurityConfig securityConfig;

  public SavedGamesController(SavedGamesService savedGamesService, SecurityConfig securityConfig) {
    this.savedGamesService = savedGamesService;
    this.securityConfig = securityConfig;
  }

  @GetMapping("{gameId}")
  public Game getSavedGameById(@PathVariable String gameId) {
    return savedGamesService.getSavedGameById(gameId);
  }

  @PostMapping
  public Game createSavedGame(@RequestHeader(name = "Authorization") String token, @RequestBody Game gameData) {
    Account userInfo = securityConfig.getUserInfo(token);
    gameData.setCreatorId(userInfo.getId());
    return savedGamesService.createSavedGame(gameData);
  }
}
