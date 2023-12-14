package com.Casual_Corner.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.Casual_Corner.Models.Game;
import com.Casual_Corner.Repositories.SavedGamesRepository;

@Service
public class SavedGamesService {
  @Autowired
  private final SavedGamesRepository savedGamesRepository;

  public SavedGamesService(SavedGamesRepository savedGamesRepository) {
    this.savedGamesRepository = savedGamesRepository;
  }

  public List<Game> getSavedGamesByCreatorId(String creatorId) {
    return savedGamesRepository.findAllByCreatorId(creatorId).get();
  }

  public Game getSavedGameById(String gameId) {
    return savedGamesRepository.findById(gameId).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "[NO SAVED GAME MATCHES THE ID: " + gameId + "]"));
  }

  public Game createSavedGame(Game gameData) {
    return savedGamesRepository.save(gameData);
  }
}
