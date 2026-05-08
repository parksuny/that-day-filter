package com.thatdayfilter.photo.repository;

import com.thatdayfilter.photo.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    List<Photo> findByUserIdOrderByCreatedAtDesc(Long userId);
}