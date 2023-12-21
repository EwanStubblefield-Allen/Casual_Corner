package com.Casual_Corner.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.Casual_Corner.Models.Game;
import com.Casual_Corner.Repositories.GamesRepository;

@Service
public class GamesService {
  @Autowired
  private final GamesRepository gamesRepository;

  public GamesService(GamesRepository gamesRepository) {
    this.gamesRepository = gamesRepository;
  }

  public List<Game> getGamesByCreatorId(String creatorId) {
    return gamesRepository.findAllByCreatorId(creatorId).get();
  }

  public Game getGameById(String gameId) {
    return gamesRepository.findById(gameId).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "[NO GAME MATCHES THE ID: " + gameId + "]"));
  }

  public Game createGame(Game gameData) {
    String gameId = gamesRepository.save(gameData).getId();
    return getGameById(gameId);
  }

  public Game removeGame(String gameId, String userId) {
    Game gameToDelete = getGameById(gameId);
    if (gameToDelete.getCreatorId() != userId) {
      new ResponseStatusException(HttpStatus.UNAUTHORIZED, "[YOU ARE NOT THE CREATOR OF THIS SAVED GAME]");
    }
    gamesRepository.deleteById(gameId);
    return gameToDelete;
  }
}
