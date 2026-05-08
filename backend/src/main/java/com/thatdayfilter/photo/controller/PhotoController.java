package com.thatdayfilter.photo.controller;

import com.thatdayfilter.photo.dto.PhotoResponse;
import com.thatdayfilter.photo.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping
    public PhotoResponse createPhoto(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String situation,
            @RequestParam String mood,
            @RequestParam MultipartFile file
    ) {
        return photoService.createPhoto(userId, title, situation, mood, file);
    }

    @GetMapping("/user/{userId}")
    public List<PhotoResponse> getPhotosByUserId(@PathVariable Long userId) {
        return photoService.getPhotosByUserId(userId);
    }

    @GetMapping("/{photoId}")
    public PhotoResponse getPhoto(@PathVariable Long photoId) {
        return photoService.getPhoto(photoId);
    }

    @DeleteMapping("/{photoId}")
    public void deletePhoto(@PathVariable Long photoId) {
        photoService.deletePhoto(photoId);
    }
}