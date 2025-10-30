package com.farm.service;

import com.farm.entity.FeedSchedule;
import com.farm.entity.FeedStock;
import com.farm.entity.Farm;
import com.farm.exception.NotFoundException;
import com.farm.repository.FeedScheduleRepository;
import com.farm.repository.FeedStockRepository;
import com.farm.repository.FarmRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedService {

    private final FeedStockRepository feedStockRepository;
    private final FeedScheduleRepository feedScheduleRepository;
    private final FarmRepository farmRepository;

    public FeedService(FeedStockRepository feedStockRepository, FeedScheduleRepository feedScheduleRepository, FarmRepository farmRepository) {
        this.feedStockRepository = feedStockRepository;
        this.feedScheduleRepository = feedScheduleRepository;
        this.farmRepository = farmRepository;
    }

    public List<FeedStock> listStock(Long farmId) {
        return farmId == null ? feedStockRepository.findAll() : feedStockRepository.findByFarmId(farmId);
    }

    public List<FeedSchedule> listSchedules(Long goatId, LocalDate start, LocalDate end) {
        return feedScheduleRepository.findByGoatIdAndScheduleDateBetween(goatId, start, end);
    }

    @Transactional
    public FeedStock createFeedStock(FeedStock stock) {
        if (stock.getFarm() != null && stock.getFarm().getId() != null) {
            Farm farm = farmRepository
                    .findById(stock.getFarm().getId())
                    .orElseThrow(() -> new NotFoundException("Farm not found"));
            stock.setFarm(farm);
        }
        if (stock.getRemainingKg() == null) {
            stock.setRemainingKg(stock.getQuantityKg());
        }
        return feedStockRepository.save(stock);
    }

    @Transactional
    public FeedSchedule createFeedSchedule(FeedSchedule schedule) {
        return feedScheduleRepository.save(schedule);
    }

    @Transactional
    public FeedStock updateRemaining(Long stockId, double consumedKg) {
        FeedStock stock = feedStockRepository
                .findById(stockId)
                .orElseThrow(() -> new NotFoundException("Feed stock not found"));
        double remaining = stock.getRemainingKg() == null ? 0.0 : stock.getRemainingKg();
        stock.setRemainingKg(Math.max(0.0, remaining - consumedKg));
        return feedStockRepository.save(stock);
    }
}
