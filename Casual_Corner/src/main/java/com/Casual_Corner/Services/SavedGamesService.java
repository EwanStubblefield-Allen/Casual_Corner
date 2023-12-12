package com.Casual_Corner.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Casual_Corner.Models.Game;
import com.Casual_Corner.Repositories.SavedGamesRepository;

@Service
public class SavedGamesService {
  @Autowired
  private final SavedGamesRepository savedGamesRepository;

  public SavedGamesService(SavedGamesRepository savedGamesRepository) {
    this.savedGamesRepository = savedGamesRepository;
  }

  public Game createSavedGames(Game gameData) {
    return savedGamesRepository.save(gameData);
  }
}
