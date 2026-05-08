package com.thatdayfilter.photo.dto;

import com.thatdayfilter.photo.entity.Photo;

import java.time.LocalDateTime;

public record PhotoResponse(
        Long id,
        Long userId,
        String title,
        String originalImageUrl,
        String filteredImageUrl,
        String situation,
        String mood,
        String filterType,
        String filterName,
        LocalDateTime createdAt
) {

    public static PhotoResponse from(Photo photo) {
        return new PhotoResponse(
                photo.getId(),
                photo.getUserId(),
                photo.getTitle(),
                photo.getOriginalImageUrl(),
                photo.getFilteredImageUrl(),
                photo.getSituation(),
                photo.getMood(),
                photo.getFilterType().name(),
                photo.getFilterName(),
                photo.getCreatedAt()
        );
    }
}