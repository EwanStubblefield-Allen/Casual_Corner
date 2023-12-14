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
import com.Casual_Corner.Services.GamesService;

@RestController
@RequestMapping("api/Games")
public class GamesController {
  @Autowired
  private final GamesService GamesService;
  private final SecurityConfig securityConfig;

  public GamesController(GamesService GamesService, SecurityConfig securityConfig) {
    this.GamesService = GamesService;
    this.securityConfig = securityConfig;
  }

  @GetMapping("{gameId}")
  public Game getGameById(@PathVariable String gameId) {
    return GamesService.getGameById(gameId);
  }

  @PostMapping
  public Game createGame(@RequestHeader(name = "Authorization") String token, @RequestBody Game gameData) {
    Account userInfo = securityConfig.getUserInfo(token);
    gameData.setCreatorId(userInfo.getId());
    return GamesService.createGame(gameData);
  }
}
