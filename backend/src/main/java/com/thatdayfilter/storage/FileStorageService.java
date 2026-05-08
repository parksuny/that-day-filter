package com.thatdayfilter.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path uploadRoot;
    private final Set<String> allowedContentTypes = Set.of("image/jpeg", "image/png", "image/webp");

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.uploadRoot = Paths.get(uploadDir).toAbsolutePath().normalize();
        createDirectory(this.uploadRoot.resolve("original"));
        createDirectory(this.uploadRoot.resolve("filtered"));
    }

    public Path saveOriginalImage(MultipartFile file) {
        validateImage(file);

        String extension = getExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID() + "." + extension;
        Path targetPath = uploadRoot.resolve("original").resolve(fileName);

        try {
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            return targetPath;
        } catch (IOException e) {
            throw new RuntimeException("원본 이미지 저장에 실패했습니다.", e);
        }
    }

    public Path createFilteredImagePath() {
        String fileName = UUID.randomUUID() + ".jpg";
        return uploadRoot.resolve("filtered").resolve(fileName);
    }

    public String toPublicUrl(Path path) {
        Path normalizedPath = path.toAbsolutePath().normalize();
        Path relativePath = uploadRoot.relativize(normalizedPath);
        return "/uploads/" + relativePath.toString().replace("\\", "/");
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("이미지 파일이 비어 있습니다.");
        }

        if (file.getSize() > 10 * 1024 * 1024) {
            throw new IllegalArgumentException("이미지는 최대 10MB까지 업로드할 수 있습니다.");
        }

        String contentType = file.getContentType();

        if (contentType == null || !allowedContentTypes.contains(contentType)) {
            throw new IllegalArgumentException("JPG, PNG, WEBP 이미지만 업로드할 수 있습니다.");
        }
    }

    private String getExtension(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) {
            return "jpg";
        }

        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();

        if (extension.equals("jpeg")) {
            return "jpg";
        }

        if (!extension.equals("jpg") && !extension.equals("png") && !extension.equals("webp")) {
            return "jpg";
        }

        return extension;
    }

    private void createDirectory(Path path) {
        try {
            Files.createDirectories(path);
        } catch (IOException e) {
            throw new RuntimeException("업로드 폴더 생성에 실패했습니다.", e);
        }
    }
}