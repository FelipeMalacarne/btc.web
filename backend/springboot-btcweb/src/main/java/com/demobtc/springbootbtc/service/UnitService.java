package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.Unit;
import com.demobtc.springbootbtc.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> getAllUnits() {
        return unitRepository.findAll();
    }

    public Unit getUnitById(Long id) {
        return unitRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Unit not found with id: " + id)
        );
    }

    public Unit postNewUnit(Unit unit) {
        return unitRepository.save(unit);
    }

    public Unit updateUniteById(Long id, Unit unit) {
        Unit existingUnit = unitRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Unit not found with id: " + id)
        );
        existingUnit.setName(unit.getName());
        existingUnit.setSymbol(unit.getSymbol());
        return unitRepository.save(existingUnit);
    }

    public void deleteUnitById(Long id) {
        unitRepository.deleteById(id);
    }

}
