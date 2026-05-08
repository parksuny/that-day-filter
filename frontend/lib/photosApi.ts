export type BackendPhoto = {
  id: number;
  userId: number;
  title: string;
  originalImageUrl: string;
  filteredImageUrl: string;
  situation: string;
  mood: string;
  filterType: string;
  filterName: string;
  createdAt: string;
};

const API_BASE_URL = "http://localhost:8080";

export async function createPhoto(formData: FormData): Promise<BackendPhoto> {
  const response = await fetch(`${API_BASE_URL}/api/photos`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("사진 업로드와 필터 생성에 실패했습니다.");
  }

  return response.json();
}

export async function getUserPhotos(userId: number): Promise<BackendPhoto[]> {
  const response = await fetch(`${API_BASE_URL}/api/photos/user/${userId}`);

  if (!response.ok) {
    throw new Error("사진 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

export async function getPhoto(photoId: number): Promise<BackendPhoto> {
  const response = await fetch(`${API_BASE_URL}/api/photos/${photoId}`);

  if (!response.ok) {
    throw new Error("사진 상세 정보를 불러오지 못했습니다.");
  }

  return response.json();
}

export function getImageUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}