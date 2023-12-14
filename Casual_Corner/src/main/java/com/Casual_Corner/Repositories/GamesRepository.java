package com.Casual_Corner.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Casual_Corner.Models.Game;

@Repository
public interface GamesRepository extends JpaRepository<Game, String> {
  @Query("SELECT g FROM Game g WHERE g.creatorId = ?1")
  Optional<List<Game>> findAllByCreatorId(String creatorId);
}
