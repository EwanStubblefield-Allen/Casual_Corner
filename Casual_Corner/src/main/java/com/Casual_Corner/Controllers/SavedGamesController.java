package com.Casual_Corner.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Casual_Corner.Models.Game;
import com.Casual_Corner.Services.SavedGamesService;

@RestController
@RequestMapping("api/savedGames")
public class SavedGamesController {
  @Autowired
  private final SavedGamesService savedGamesService;

  public SavedGamesController(SavedGamesService savedGamesService) {
    this.savedGamesService = savedGamesService;
  }

  @PostMapping
  public Game createSavedGames(@RequestBody Game gameData) {
    return savedGamesService.createSavedGames(gameData);
  }
}
