package com.example.govid.service;

import com.example.govid.model.UploadedImage;
import com.example.govid.repository.UploadedImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageStorageService {

    @Autowired
    private UploadedImageRepository imageRepository;

    public UploadedImage storeImage(MultipartFile file, String idType) throws IOException {
        UploadedImage image = UploadedImage.builder()
                .idType(idType)
                .imageData(file.getBytes())
                .build();
        return imageRepository.save(image);
    }
}
