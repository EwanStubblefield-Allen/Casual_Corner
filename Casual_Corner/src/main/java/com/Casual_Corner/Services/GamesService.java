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
  private final GamesRepository GamesRepository;

  public GamesService(GamesRepository GamesRepository) {
    this.GamesRepository = GamesRepository;
  }

  public List<Game> getGamesByCreatorId(String creatorId) {
    return GamesRepository.findAllByCreatorId(creatorId).get();
  }

  public Game getGameById(String gameId) {
    return GamesRepository.findById(gameId).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "[NO GAME MATCHES THE ID: " + gameId + "]"));
  }

  public Game createGame(Game gameData) {
    return GamesRepository.save(gameData);
  }
}
