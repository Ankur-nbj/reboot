package com.example.govid.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class OsicLookupService {

    private List<Map<String, Object>> osicData;

    public OsicLookupService() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getClassLoader().getResourceAsStream("osic-database.json");
        osicData = mapper.readValue(is, new TypeReference<List<Map<String, Object>>>() {});
    }

    public Map<String, Object> findByNameAndDob(String name, String dob) {
        return osicData.stream()
                .filter(record ->
                        name.equalsIgnoreCase((String) record.get("Name")) &&
                        dob.equalsIgnoreCase((String) record.get("Date_of_Birth"))
                )
                .findFirst()
                .orElse(Collections.emptyMap());
    }
}
