package com.thatdayfilter.photo.entity;

import com.thatdayfilter.filter.FilterType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String title;

    @Column(nullable = false, length = 1000)
    private String originalImageUrl;

    @Column(nullable = false, length = 1000)
    private String filteredImageUrl;

    @Column(columnDefinition = "TEXT")
    private String situation;

    @Column(columnDefinition = "TEXT")
    private String mood;

    @Enumerated(EnumType.STRING)
    private FilterType filterType;

    private String filterName;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}