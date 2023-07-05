-- write your queries here
SELECT * FROM owners LEFT JOIN vehicles ON owners.id = vehicles.owner_id;

--Count the number of cars for each owner. Display the owners first_name , last_name and count of 
--vehicles. The first_name should be ordered in ascending order.
SELECT first_name, last_name, count 
FROM owners 
JOIN 
    (SELECT owner_id, COUNT(id) AS count 
    FROM vehicles 
    GROUP BY owner_id) 
    AS vehicle_count 
ON owners.id = vehicle_count.owner_id
ORDER BY first_name;


--Count the number of cars for each owner and display the average price for each of the cars as integers. 
--Display the owners first_name , last_name, average price and count of vehicles. The first_name should be 
--ordered in descending order. Only display results with more than one vehicle and an average price greater 
--than 10000.
SELECT first_name, last_name, average_price, count 
FROM owners 
JOIN 
    (SELECT owner_id, COUNT(id) AS count, AVG(price) AS average_price 
    FROM vehicles 
    GROUP BY owner_id) 
    AS vehicle_count 
ON owners.id = vehicle_count.owner_id
WHERE average_price > 10000
ORDER BY first_name desc;