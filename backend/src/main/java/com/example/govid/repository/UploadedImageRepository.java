package com.example.govid.repository;

import com.example.govid.model.UploadedImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadedImageRepository extends JpaRepository<UploadedImage, Long> {
}
