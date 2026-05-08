package com.thatdayfilter.photo.service;

import com.thatdayfilter.filter.FilterType;
import com.thatdayfilter.filter.ImageFilterService;
import com.thatdayfilter.photo.dto.PhotoResponse;
import com.thatdayfilter.photo.entity.Photo;
import com.thatdayfilter.photo.repository.PhotoRepository;
import com.thatdayfilter.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final FileStorageService fileStorageService;
    private final ImageFilterService imageFilterService;

    public PhotoResponse createPhoto(
            Long userId,
            String title,
            String situation,
            String mood,
            MultipartFile file
    ) {
        Path originalPath = fileStorageService.saveOriginalImage(file);
        Path filteredPath = fileStorageService.createFilteredImagePath();

        FilterType filterType = imageFilterService.decideFilter(situation, mood);
        imageFilterService.applyFilter(originalPath, filteredPath, filterType);

        Photo photo = Photo.builder()
                .userId(userId)
                .title(title)
                .originalImageUrl(fileStorageService.toPublicUrl(originalPath))
                .filteredImageUrl(fileStorageService.toPublicUrl(filteredPath))
                .situation(situation)
                .mood(mood)
                .filterType(filterType)
                .filterName(imageFilterService.getFilterName(filterType))
                .build();

        Photo savedPhoto = photoRepository.save(photo);

        return PhotoResponse.from(savedPhoto);
    }

    public List<PhotoResponse> getPhotosByUserId(Long userId) {
        return photoRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(PhotoResponse::from)
                .toList();
    }

    public PhotoResponse getPhoto(Long photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("사진을 찾을 수 없습니다."));

        return PhotoResponse.from(photo);
    }

    public void deletePhoto(Long photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("사진을 찾을 수 없습니다."));

        photoRepository.delete(photo);
    }
}