package com.example.shose.server.service.impl;

import com.example.shose.server.infrastructure.poin.ConfigPoin;
import com.example.shose.server.infrastructure.poin.Poin;
import com.example.shose.server.service.PoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author thangdt
 */
@Service
public class PoinServiceImpl implements PoinService {

    @Autowired
    private  ConfigPoin configPoin;

    @Override
    public Poin updatePoin(Poin poin) {
        return configPoin.writeJsonFile(poin);
    }

    @Override
    public Poin getDetailPoin() {
        return configPoin.readJsonFile();
    }
}
