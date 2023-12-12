package com.Casual_Corner.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Casual_Corner.Models.Game;

@Repository
public interface SavedGamesRepository extends JpaRepository<Game, String> {
}
