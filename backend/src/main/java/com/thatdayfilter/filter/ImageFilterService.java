package com.thatdayfilter.filter;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Path;

@Service
public class ImageFilterService {

    public FilterType decideFilter(String situation, String mood) {
        String text = ((situation == null ? "" : situation) + " " + (mood == null ? "" : mood)).toLowerCase();

        if (text.contains("비") || text.contains("외로") || text.contains("슬픔") || text.contains("우울") || text.contains("rain") || text.contains("sad")) {
            return FilterType.SOFT_RAIN_BLUE;
        }

        if (text.contains("행복") || text.contains("따뜻") || text.contains("설렘") || text.contains("기쁨") || text.contains("햇빛") || text.contains("happy") || text.contains("warm")) {
            return FilterType.WARM_MEMORY;
        }

        if (text.contains("밤") || text.contains("집중") || text.contains("고요") || text.contains("차분") || text.contains("night") || text.contains("focus")) {
            return FilterType.MIDNIGHT_FOCUS;
        }

        if (text.contains("몽환") || text.contains("꿈") || text.contains("흐릿") || text.contains("dream")) {
            return FilterType.DREAM_BLUR;
        }

        return FilterType.NEUTRAL_DIARY;
    }

    public String getFilterName(FilterType filterType) {
        return switch (filterType) {
            case WARM_MEMORY -> "Warm Memory";
            case SOFT_RAIN_BLUE -> "Soft Rain Blue";
            case MIDNIGHT_FOCUS -> "Midnight Focus";
            case DREAM_BLUR -> "Dream Blur";
            case NEUTRAL_DIARY -> "Neutral Diary Tone";
        };
    }

    public void applyFilter(Path originalPath, Path filteredPath, FilterType filterType) {
        try {
            BufferedImage original = ImageIO.read(originalPath.toFile());

            if (original == null) {
                throw new IllegalArgumentException("이미지 파일을 읽을 수 없습니다.");
            }

            BufferedImage rgbImage = toRgbImage(original);
            BufferedImage filtered = switch (filterType) {
                case WARM_MEMORY -> applyWarmMemory(rgbImage);
                case SOFT_RAIN_BLUE -> applySoftRainBlue(rgbImage);
                case MIDNIGHT_FOCUS -> applyMidnightFocus(rgbImage);
                case DREAM_BLUR -> applyDreamBlur(rgbImage);
                case NEUTRAL_DIARY -> applyNeutralDiary(rgbImage);
            };

            ImageIO.write(filtered, "jpg", filteredPath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("필터 이미지 생성에 실패했습니다.", e);
        }
    }

    private BufferedImage toRgbImage(BufferedImage source) {
        BufferedImage rgbImage = new BufferedImage(source.getWidth(), source.getHeight(), BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = rgbImage.createGraphics();
        graphics.drawImage(source, 0, 0, Color.WHITE, null);
        graphics.dispose();
        return rgbImage;
    }

    private BufferedImage applyWarmMemory(BufferedImage source) {
        BufferedImage result = new BufferedImage(source.getWidth(), source.getHeight(), BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < source.getHeight(); y++) {
            for (int x = 0; x < source.getWidth(); x++) {
                Color color = new Color(source.getRGB(x, y));

                int r = clamp((int) (color.getRed() * 1.12 + 18));
                int g = clamp((int) (color.getGreen() * 1.05 + 10));
                int b = clamp((int) (color.getBlue() * 0.88));

                r = clamp((int) (r * 1.04));
                g = clamp((int) (g * 1.02));

                result.setRGB(x, y, new Color(r, g, b).getRGB());
            }
        }

        return result;
    }

    private BufferedImage applySoftRainBlue(BufferedImage source) {
        BufferedImage result = new BufferedImage(source.getWidth(), source.getHeight(), BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < source.getHeight(); y++) {
            for (int x = 0; x < source.getWidth(); x++) {
                Color color = new Color(source.getRGB(x, y));

                int gray = (color.getRed() + color.getGreen() + color.getBlue()) / 3;

                int r = clamp((int) (gray * 0.75 + color.getRed() * 0.25));
                int g = clamp((int) (gray * 0.82 + color.getGreen() * 0.18));
                int b = clamp((int) (gray * 0.95 + color.getBlue() * 0.25 + 18));

                r = clamp((int) (r * 0.92));
                g = clamp((int) (g * 0.96));
                b = clamp((int) (b * 1.08));

                result.setRGB(x, y, new Color(r, g, b).getRGB());
            }
        }

        return result;
    }

    private BufferedImage applyMidnightFocus(BufferedImage source) {
        BufferedImage result = new BufferedImage(source.getWidth(), source.getHeight(), BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < source.getHeight(); y++) {
            for (int x = 0; x < source.getWidth(); x++) {
                Color color = new Color(source.getRGB(x, y));

                int r = clamp((int) ((color.getRed() - 20) * 0.82));
                int g = clamp((int) ((color.getGreen() - 10) * 0.88));
                int b = clamp((int) ((color.getBlue() + 24) * 1.08));

                int contrastR = adjustContrast(r, 1.18);
                int contrastG = adjustContrast(g, 1.18);
                int contrastB = adjustContrast(b, 1.18);

                result.setRGB(x, y, new Color(contrastR, contrastG, contrastB).getRGB());
            }
        }

        return result;
    }

    private BufferedImage applyDreamBlur(BufferedImage source) {
        BufferedImage softened = applySoftBlur(source);
        BufferedImage result = new BufferedImage(source.getWidth(), source.getHeight(), BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < softened.getHeight(); y++) {
            for (int x = 0; x < softened.getWidth(); x++) {
                Color color = new Color(softened.getRGB(x, y));

                int r = clamp((int) (color.getRed() * 1.05 + 8));
                int g = clamp((int) (color.getGreen() * 0.98 + 4));
                int b = clamp((int) (color.getBlue() * 1.12 + 12));

                result.setRGB(x, y, new Color(r, g, b).getRGB());
            }
        }

        return result;
    }

    private BufferedImage applyNeutralDiary(BufferedImage source) {
        BufferedImage result = new BufferedImage(source.getWidth(), source.getHeight(), BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < source.getHeight(); y++) {
            for (int x = 0; x < source.getWidth(); x++) {
                Color color = new Color(source.getRGB(x, y));

                int r = clamp((int) (color.getRed() * 1.02 + 3));
                int g = clamp((int) (color.getGreen() * 1.02 + 3));
                int b = clamp((int) (color.getBlue() * 1.01 + 2));

                result.setRGB(x, y, new Color(r, g, b).getRGB());
            }
        }

        return result;
    }

    private BufferedImage applySoftBlur(BufferedImage source) {
        BufferedImage result = new BufferedImage(source.getWidth(), source.getHeight(), BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < source.getHeight(); y++) {
            for (int x = 0; x < source.getWidth(); x++) {
                int red = 0;
                int green = 0;
                int blue = 0;
                int count = 0;

                for (int dy = -1; dy <= 1; dy++) {
                    for (int dx = -1; dx <= 1; dx++) {
                        int nx = x + dx;
                        int ny = y + dy;

                        if (nx >= 0 && nx < source.getWidth() && ny >= 0 && ny < source.getHeight()) {
                            Color color = new Color(source.getRGB(nx, ny));
                            red += color.getRed();
                            green += color.getGreen();
                            blue += color.getBlue();
                            count++;
                        }
                    }
                }

                result.setRGB(x, y, new Color(red / count, green / count, blue / count).getRGB());
            }
        }

        return result;
    }

    private int adjustContrast(int value, double factor) {
        return clamp((int) ((value - 128) * factor + 128));
    }

    private int clamp(int value) {
        return Math.max(0, Math.min(255, value));
    }
}