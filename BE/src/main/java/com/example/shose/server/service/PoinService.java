package com.example.shose.server.service;

import com.example.shose.server.infrastructure.poin.Poin;

/**
 * @author thangdt
 */
public interface PoinService {

    Poin updatePoin(Poin poin);

    Poin getDetailPoin();
}
