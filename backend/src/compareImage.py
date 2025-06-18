import face_recognition
import requests
import os
import sys

def download_image_from_url(url, filename='cloud_image.jpg'):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return filename
    else:
        raise Exception("Khong tai duoc anh tu Cloudinary.")

def compare_faces(cloud_url, unknown_image_path, tolerance=0.6):
    known_image_path = download_image_from_url(cloud_url)

    # Load ảnh gốc và ảnh chụp
    known_image = face_recognition.load_image_file(known_image_path)
    unknown_image = face_recognition.load_image_file(unknown_image_path)

    # Mã hóa khuôn mặt
    known_encodings = face_recognition.face_encodings(known_image)
    unknown_encodings = face_recognition.face_encodings(unknown_image)

    if not known_encodings:
        os.remove(known_image_path)
        return 3;#khong tim thay khuon mat trong anh goc
    if not unknown_encodings:
        os.remove(known_image_path)
        return 4;#"khong tim thay khuon mat trong anh chup!"

    known_encoding = known_encodings[0]
    unknown_encoding = unknown_encodings[0]

    # So sánh 2 khuôn mặt
    results = face_recognition.compare_faces([known_encoding], unknown_encoding, tolerance=tolerance)

    os.remove(known_image_path)

    if results[0]:
        return 1
    else:
        return 0

# Ví dụ sử dụng
# print(compare_faces("image_4.jpg", "image_2.jpg"))

if __name__ == '__main__':
    cloud_url = sys.argv[1]
    local_path = sys.argv[2]
    print(compare_faces(cloud_url, local_path))
