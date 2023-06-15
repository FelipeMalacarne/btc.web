package com.demobtc.springbootbtc.service;

import com.demobtc.springbootbtc.model.Ingredient;
import com.demobtc.springbootbtc.model.Notification;
import com.demobtc.springbootbtc.repository.IngredientRepository;
import com.demobtc.springbootbtc.repository.NotificationRepository;
import com.demobtc.springbootbtc.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    StockRepository stockRepository;


    // Solução pode ter sido feita de forma mais simples, mas a ideia é que a cada vez que o estoque é atualizado, o sistema
    // verifica se algum ingrediente está fora dos limites de estoque e cria uma notificação para cada ingrediente que estiver
    // fora dos limites de estoque. Pode ser pouco perfomático caso haja muitas notificações, mas acredito que seja uma
    // solução simples e eficaz para o momento kk.
    private void checkStockLimits() {
        notificationRepository.deleteAll();
        List<Ingredient> ingredientsOutsideLimits = ingredientRepository.findIngredientsOutsideLimits();
        for (Ingredient ingredient : ingredientsOutsideLimits) {
            Notification notification = new Notification().builder()
                    .title("Conferir Estoque de " + ingredient.getName())
                    .message(
                            "O ingrediente " + ingredient.getName() + " está fora dos limites de estoque. \n\n" +
                            "O limite mínimo é: " + ingredient.getMin() + "\nO limite máximo é: " + ingredient.getMax() +
                            "\nO estoque atual é: " + stockRepository.findByIngredientId(ingredient.getId()).getAmount() + ". \n\n" +
                            "Resolva o problema o quanto antes!"
                    )
                    .date(new Timestamp(System.currentTimeMillis()))
                    .build();

            notificationRepository.save(notification);
        }
    }

    public List<Notification> getAllNotifications() {
        checkStockLimits();
        return notificationRepository.findAll();
    }


}
