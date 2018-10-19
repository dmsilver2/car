package com.packt.cardatabase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.packt.cardatabase.domain.Car;
import com.packt.cardatabase.domain.CarRepository;
import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;
import com.packt.cardatabase.domain.User;
import com.packt.cardatabase.domain.UserRepository; 
 
@SpringBootApplication
public class Cardatabase2Application {

	@Autowired 
    private CarRepository repository;

	@Autowired 
    private OwnerRepository orepository;
	
	@Autowired 
	private UserRepository urepository;

	public static void main(String[] args) {
		SpringApplication.run(Cardatabase2Application.class, args);
	}
	
	@Bean
    CommandLineRunner runner(){
      return args -> {
    	  	// Add owner objects and save these to db
          Owner owner1 = new Owner("John" , "Johnson");
          Owner owner2 = new Owner("Mary" , "Robinson");
          orepository.save(owner1);
          orepository.save(owner2);

    	  // Save demo data to database
          repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2017, 59000, owner1));
          repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2014, 29000, owner2));
          repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2018, 39000, owner2));
          
          // username: user password: user
          urepository.save(new User("user",
          "$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi",
          "USER"));
          // username: admin password: admin
          urepository.save(new User("admin",
          "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", 
          "ADMIN"));
        };

      };
 
}
