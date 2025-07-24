package com.example.govid.controller;

import com.example.govid.model.CombinedDataResponse;
import com.example.govid.service.ImageStorageService;
import com.example.govid.service.OCRService;
import com.example.govid.service.OsicLookupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/gov-id")
public class GovIdController {

    @Autowired
    private ImageStorageService imageStorageService;

    @Autowired
    private OCRService ocrService;

    @Autowired
    private OsicLookupService osicLookupService;

    @PostMapping("/upload")
    public ResponseEntity<CombinedDataResponse> handleUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("idType") String idType
    ) throws IOException {

        // 1. Save image
        imageStorageService.storeImage(file, idType);

        // 2. Extract dummy OCR data
        Map<String, Object> dummyData = ocrService.extractDummyData(file, idType);

        // 3. Match from OSIC DB
        String name = (String) dummyData.get("Name");
        String dob = (String) dummyData.get("Date_of_Birth");

        Map<String, Object> osicData = osicLookupService.findByNameAndDob(name, dob);

        // 4. Combine
        CombinedDataResponse response = CombinedDataResponse.builder()
                .dummyData(dummyData)
                .osicData(osicData)
                .build();

        return ResponseEntity.ok(response);
    }
}
