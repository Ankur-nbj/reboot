package com.example.govid.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class OCRService {

    // Dummy extractor
    public Map<String, Object> extractDummyData(MultipartFile file, String idType) {
        Map<String, Object> data = new HashMap<>();
        if (idType.equalsIgnoreCase("passport")) {
            data.put("isValid", true);
            data.put("Name", "John Doe");
            data.put("Date_of_Birth", "1985-07-15");
        } else if (idType.equalsIgnoreCase("driving_license")) {
            data.put("Name", "Sarah Morgan");
            data.put("Date_of_Birth", "1976-03-11");
        } else {
            data.put("Name", "Unknown Person");
            data.put("Date_of_Birth", "1990-01-01");
        }
        return data;
    }
}
