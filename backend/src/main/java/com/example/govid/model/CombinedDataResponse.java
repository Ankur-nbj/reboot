package com.example.govid.model;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString

public class CombinedDataResponse {
    private Map<String, Object> dummyData;
    private Map<String, Object> osicData;
}
